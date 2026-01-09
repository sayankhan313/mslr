import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Referendum from "@/models/Referendum";

export async function GET() {
  try {
    await connectToDatabase();

    const [draft, open, closed] = await Promise.all([
      Referendum.countDocuments({ status: "draft" }),
      Referendum.countDocuments({ status: "open" }),
      Referendum.countDocuments({ status: "closed" }),
    ]);

    return NextResponse.json({
      draft,
      open,
      closed,
    });
  } catch (error) {
    console.error("Status analytics error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
