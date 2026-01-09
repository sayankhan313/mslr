import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Referendum from "@/models/Referendum";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await context.params;

    const referendum = await Referendum.findById(id);
    if (!referendum) {
      return NextResponse.json(
        { message: "Referendum not found" },
        { status: 404 }
      );
    }

    if (referendum.status === "open") {
      return NextResponse.json(
        { message: "Referendum already open" },
        { status: 400 }
      );
    }

   
    const now = new Date();
    if (referendum.endDate && referendum.endDate <= now) {
      return NextResponse.json(
        { message: "Cannot open referendum. End date has already passed." },
        { status: 400 }
      );
    }

    referendum.status = "open";
    referendum.closureReason = null;
    await referendum.save();

    return NextResponse.json({
      message: "Referendum opened successfully",
      status: "open",
    });
  } catch (error) {
    console.error("Open referendum error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
