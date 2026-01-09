import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Referendum from "@/models/Referendum";
import Vote from "@/models/Vote";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    // ✅ ONLY CHANGE: Vercel-safe ID extraction
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { message: "Missing referendum id" },
        { status: 400 }
      );
    }

    const referendum = await Referendum.findById(id);
    if (!referendum) {
      return NextResponse.json(
        { message: "Referendum not found" },
        { status: 404 }
      );
    }

    const votes = await Vote.find({ referendumId: id });

    const options = referendum.options.map((opt, index) => {
      const count = votes.filter(v => v.optionIndex === index).length;
      return {
        [String(index + 1)]: `option ${index + 1} - ${opt.text}`,
        votes: String(count),
      };
    });

    const response = {
      referendum_id: String(referendum._id),
      status: referendum.status,
      referendum_title: referendum.title,
      referendum_desc: referendum.description,
      referendum_options: {
        options,
      },
    };

    // ✅ LEFT EXACTLY AS YOU WROTE IT
    return new Response(
      JSON.stringify(response, null, 2),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("MSLR referendum by id error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
