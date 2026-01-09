import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Vote from "@/models/Vote";
import Referendum from "@/models/Referendum";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);

    const votes = await Vote.find({ userId: payload.userId })
      .sort({ createdAt: -1 });

    const referendums = await Promise.all(
      votes.map(async (vote) => {
        const referendum = await Referendum.findById(vote.referendumId);
        if (!referendum) return null;

        return {
          referendum_id: referendum._id.toString(),
          title: referendum.title,
          description: referendum.description,
          status: referendum.status,
          voted_option: referendum.options[vote.optionIndex]?.text,
          voted_at: vote.createdAt,
        };
      })
    );

    return NextResponse.json(
      { referendums: referendums.filter(Boolean) },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
