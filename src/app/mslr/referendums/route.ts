import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Vote from "@/models/Vote";
import Referendum from "@/models/Referendum";

interface MSLROptionResult {
    [key: string]: string;
    votes: string;
  }
  
  interface MSLRReferendumResponse {
    referendum_id: string;
    status: string;
    referendum_title: string;
    referendum_desc: string;
    referendum_options: {
      options: MSLROptionResult[];
    };
  }
export async function GET(req:NextRequest) {
    try {
        await connectToDatabase();
        const {searchParams}= new URL(req.url)
        const status=searchParams.get("status");
        let referendums;
        if (status){
            if (status!== "open" && status!=="closed"){
                return NextResponse.json(
                    {
                        message:"Invalid status parameter"
                    },
                 {status:400}
                )
            }
            referendums=await Referendum.find({status})
        }else{
            referendums=await Referendum.find()
        }
       
        const Referendums:MSLRReferendumResponse[]=await Promise.all(
            referendums.map(async(ref)=>{
                const votes=await Vote.find({referendumId:ref._id});
                const options=ref.options.map((opt,index)=>{
                    const count=votes.filter((v)=>v.optionIndex==index).length;
                    return {
                        [String(index+1)]:`option ${index + 1} - ${opt.text}`,
                        votes:String(count),
                    }

                })

                return {
                    referendum_id:String(ref._id),
                    status:ref.status,
                    referendum_title:ref.title,
                    referendum_desc:ref.description,
                    referendum_options:{
                        options,
                    }
                
                }
            })
        )
        return new Response(
            JSON.stringify({ Referendums }, null, 2),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
           

    } catch (error) {
        console.error("MSLR referendums error:", error);
        return NextResponse.json(
          { message: "Server error" },
          { status: 500 }
        );  
    }
    
}