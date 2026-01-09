import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Referendum from "@/models/Referendum";
import Vote from "@/models/Vote";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);

    const referendums = await Referendum.find({ status: "open" });

    const data = await Promise.all(
      referendums.map(async (ref) => {
        const totalVotes = await Vote.countDocuments({
          referendumId: ref._id,
        });

        const turnout =
          ref.eligibleVoters > 0
            ? Math.round((totalVotes / ref.eligibleVoters) * 100)
            : 0;

        const userVote = await Vote.findOne({
          referendumId: ref._id,
          userId: payload.userId,
        });

        return {
          referendum_id: String(ref._id),
          title: ref.title,
          description: ref.description,
          status: ref.status,
          total_votes: totalVotes,
          eligible_voters: ref.eligibleVoters,
          turnout_percentage: turnout,
          start_date: ref.createdAt,
          end_date: ref.endDate,
          has_voted: !!userVote, 
        };
      })
    );

    return NextResponse.json({ referendums: data }, { status: 200 });
  } catch (error) {
    console.error("Voter referendums error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
