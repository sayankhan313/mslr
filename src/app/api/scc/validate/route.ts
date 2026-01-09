import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import SCC from "@/models/SCC";

export async function POST(req:Request) {
try {
    await connectToDatabase();
    const {code}= await req.json();
    if(!code){
        return NextResponse.json(
            {
                valid:false, message:"SCC code is required"

            },
            {
                status:400
            }
        )
    }
    const scc= await SCC.findOne({code})
    if(!scc){
        return NextResponse.json(
        {
            valid:false, message:"SCC code is invalid"
     
        },
        {
            status:404
        }
    )
    }
    if (scc.used){
        return NextResponse.json(
            {
                valid:false, message:"SCC already used"
            },
            {
                status:409
            }
        )
    }
    return NextResponse.json({
        valid:true, message:"SCC is valid"
    },
    {
        status:200
    }
)
} catch (error) {
    return NextResponse.json(
        { 
            valid: false, message: "Server error"
         },
        { 
            status: 500
         }
    )  
}
    
}