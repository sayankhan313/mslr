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
      return NextResponse.json({ message: "Referendum not found" }, { status: 404 });
    }

    if (referendum.status === "closed") {
      return NextResponse.json({ message: "Referendum already closed" }, { status: 400 });
    }

    await Referendum.findByIdAndUpdate(id, {
      status: "closed",
      closureReason: "MANUAL",
    });

    return NextResponse.json({
      message: "Referendum closed successfully",
      status: "closed",
    });
  } catch (error) {
    console.error("Close referendum error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
