import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Referendum from "@/models/Referendum";

export async function GET() {
  try {
    await connectToDatabase();

    const majority = await Referendum.countDocuments({
      status: "closed",
      closureReason: "MAJORITY",
    });

    const manual = await Referendum.countDocuments({
      status: "closed",
      closureReason: "MANUAL",
    });


    return NextResponse.json({
      majority,
      manual,
      
    });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
