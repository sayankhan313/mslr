import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Referendum from "@/models/Referendum";
import Vote from "@/models/Vote";

export async function GET() {
  try {
    await connectToDatabase();

    const referendums = await Referendum.find({ status: "closed" });

    const result = await Promise.all(
      referendums.map(async (ref) => {
        const votes = await Vote.find({ referendumId: ref._id });

        const optionCounts = ref.options.map((opt, index) => ({
          label: opt.text,
          votes: votes.filter(v => v.optionIndex === index).length,
        }));

        return {
          referendumId: ref._id,
          title: ref.title,
          options: optionCounts,
        };
      })
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
