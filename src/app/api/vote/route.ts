import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import Referendum from "@/models/Referendum";
import Vote from "@/models/Vote";
import { verifyToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      await session.abortTransaction();
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (payload.role !== "VOTER") {
      await session.abortTransaction();
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { referendumId, optionIndex } = await req.json();

    if (!referendumId || optionIndex === undefined) {
      await session.abortTransaction();
      return NextResponse.json(
        { message: "Invalid request data" },
        { status: 400 }
      );
    }

    const referendum = await Referendum.findById(referendumId).session(session);

    if (!referendum) {
      await session.abortTransaction();
      return NextResponse.json(
        { message: "Referendum not found" },
        { status: 404 }
      );
    }

    if (referendum.status !== "open") {
      await session.abortTransaction();
      return NextResponse.json(
        { message: "Voting is not allowed for this referendum" },
        { status: 403 }
      );
    }

    if (optionIndex < 0 || optionIndex >= referendum.options.length) {
      await session.abortTransaction();
      return NextResponse.json(
        { message: "Invalid option selected" },
        { status: 400 }
      );
    }

    const existingVote = await Vote.findOne({
      userId: payload.userId,
      referendumId,
    }).session(session);

    if (existingVote) {
      await session.abortTransaction();
      return NextResponse.json(
        { message: "You have already voted" },
        { status: 409 }
      );
    }

   
    await Vote.create(
      [
        {
          userId: payload.userId,
          referendumId,
          optionIndex,
        },
      ],
      { session }
    );

   
    const optionVotes = await Vote.countDocuments({
      referendumId,
      optionIndex,
    }).session(session);

    
    if (optionVotes >= Math.ceil(referendum.eligibleVoters * 0.5)) {
      referendum.status = "closed";
      referendum.closureReason = "MAJORITY";
      await referendum.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(
      { message: "Vote recorded successfully" },
      { status: 201 }
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Vote API error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
} 