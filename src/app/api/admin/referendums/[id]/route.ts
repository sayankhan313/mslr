import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Referendum from "@/models/Referendum";
import Vote from "@/models/Vote";

/* ===================== GET ===================== */
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const referendum = await Referendum.findById(id);
    if (!referendum) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const votes = await Vote.find({ referendumId: id });

    const results = referendum.options.map(
      (opt: { text: string }, index: number) => {
        const count = votes.filter(v => v.optionIndex === index).length;
        return {
          option: opt.text,
          count,
        };
      }
    );

    const totalVotes = votes.length;
    const turnout =
      referendum.eligibleVoters > 0
        ? Math.round((totalVotes / referendum.eligibleVoters) * 100)
        : 0;

    return NextResponse.json({
      _id: referendum._id,
      title: referendum.title,
      description: referendum.description,
      status: referendum.status,
      eligibleVoters: referendum.eligibleVoters,
      endDate: referendum.endDate,
      totalVotes,
      turnout,
      results,
      createdAt: referendum.createdAt,
      updatedAt: referendum.updatedAt,
    });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

/* ===================== PUT ===================== */
export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const {
      title,
      description,
      options,
      eligibleVoters,
      endDate,
    } = await req.json();

    const referendum = await Referendum.findById(id);
    if (!referendum) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    if (referendum.status !== "draft") {
      return NextResponse.json(
        { message: "Only draft referendums can be edited" },
        { status: 403 }
      );
    }

    if (
      !title ||
      !description ||
      !Array.isArray(options) ||
      options.length < 2 ||
      eligibleVoters <= 0
    ) {
      return NextResponse.json(
        { message: "Invalid referendum data" },
        { status: 400 }
      );
    }

    referendum.title = title;
    referendum.description = description;
    referendum.options = options.map((text: string) => ({ text }));
    referendum.eligibleVoters = eligibleVoters;
    referendum.endDate = endDate;

    await referendum.save();

    return NextResponse.json({
      message: "Referendum updated successfully",
      referendum,
    });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

/* ===================== DELETE ===================== */
export async function DELETE(req: NextRequest) {
  await connectToDatabase();

  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "Referendum not found" },
      { status: 404 }
    );
  }

  const ref = await Referendum.findById(id);
  if (!ref) {
    return NextResponse.json(
      { error: "Referendum not found" },
      { status: 404 }
    );
  }

  if (ref.status === "open") {
    return NextResponse.json(
      { error: "Cannot delete an open referendum" },
      { status: 400 }
    );
  }

  await Referendum.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
