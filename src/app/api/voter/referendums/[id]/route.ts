import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Referendum from "@/models/Referendum";
import Vote from "@/models/Vote";

export async function  GET(
    req:NextRequest,
    context:{params:Promise<{id:string}>}
) {
  try {
    await connectToDatabase()
    const {id}= await context.params
    const referendum= await Referendum.findById(id);
    if(!referendum){
        return NextResponse.json(
            {message:"Referendum not found"},
            {status:404}
        )
    }
    const votes=await Vote.find({referendumId:id});
    const options=referendum.options.map((opt,index)=>{
        const count=votes.filter(
            (v)=>v.optionIndex===index
        ).length
        return {
          optionIndex: index,
          text: opt.text,
          votes: count,
        };
      })
        return NextResponse.json(
            {
              referendum_id: String(referendum._id),
              title: referendum.title,
              description: referendum.description,
              status: referendum.status,
              start_date:referendum.createdAt,
              end_date:referendum.endDate,
              eligible_voters:referendum.eligibleVoters,
              options,
            },
            { status: 200 }
          );
    
  } catch (error) {
    console.error("Voter referendum detail error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );

  }
}