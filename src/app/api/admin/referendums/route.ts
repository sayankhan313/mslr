import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Referendum from "@/models/Referendum"
import Vote from "@/models/Vote";


export async function  POST(req:Request) {
try {
    await connectToDatabase()
    const {title,description,options,eligibleVoters,endDate}=await req.json();
    if (!title || !description || !options || options.length < 2||  eligibleVoters === undefined ||
        eligibleVoters <= 0) {
        return NextResponse.json(
          { message: "Invalid referendum data" },
          { status: 400 }
        );
      }
    const referendum=await Referendum.create({
        title,
        description,
        options: options.map((text: string) => ({ text })),
        eligibleVoters,
        endDate,
        status:"draft",

    })
    return NextResponse.json(referendum,{status:201});
    
} catch (error) {
    return NextResponse.json(
        { message: "Server error" },
        { status: 500 }
      );
}    
}

export async function GET(req:Request) {
    try {
        await connectToDatabase();
        const referendum=await Referendum.find().sort({
            createdAt:-1,
        });
    const data=await Promise.all(
        referendum.map(async(ref)=>{
            const totalVotes = await Vote.countDocuments({
                referendumId: ref._id,
              });
              const turnout=ref.eligibleVoters>0? Math.round((totalVotes / ref.eligibleVoters) * 100):0;

              return{
                _id:ref._id,
                title:ref.title,
                description:ref.description,
                eligibleVoters:ref.eligibleVoters,
                options:ref.options,
                endDate:ref.endDate,
                createdAt:ref.createdAt,
                status:ref.status,
                totalVotes,
                turnout,
                
                
              }
        })
    )
    return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
          );
       
    }
    
}

