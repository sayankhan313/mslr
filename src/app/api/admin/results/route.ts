import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Referendum from "@/models/Referendum";
import Vote from "@/models/Vote";

export async function GET() {
  try {
    await connectToDatabase();

    const closedRefs = await Referendum.find({ status: "closed" });

    const data = await Promise.all(
      closedRefs.map(async (ref) => {
        const votes = await Vote.find({ referendumId: ref._id });

        const results = ref.options.map((opt, index) => {
          const count = votes.filter(
            (v) => v.optionIndex === index
          ).length;

          return {
            option: opt.text,
            count,
            percentage:
              ref.eligibleVoters > 0
                ? Math.round((count / ref.eligibleVoters) * 100)
                : 0,
          };
        });

        return {
          _id: ref._id.toString(),
          title: ref.title,
          description: ref.description,
          closureReason: ref.closureReason,
          eligibleVoters: ref.eligibleVoters,
          totalVotes: votes.length,
          results,
        };
      })
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error("Results API error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
