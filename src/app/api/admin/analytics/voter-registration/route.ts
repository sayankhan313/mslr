import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();

    const data = await User.aggregate([
      { $match: { role: "VOTER" } },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formatted = data.map(d => ({
      date: d._id,
      voters: d.count,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Voter registration analytics error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
