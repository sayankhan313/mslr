import { NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/db";
import User from "@/models/User";
import SCC from "@/models/SCC";
import {hashPassword} from "@/lib/hash"

export async function POST(req:Request) {
    try {
       await connectToDatabase();
      const {name,email,dob,password,sccCode}= await req.json();
      if(!name||!email||!dob||!password||!sccCode){
        return NextResponse.json(
        {
            message:"All feilds are required"
        },
       {
            status:400
       }
)
      }

      const dobDate = new Date(dob);
      const today = new Date();
      
      let age = today.getFullYear() - dobDate.getFullYear();
      const monthDiff = today.getMonth() - dobDate.getMonth();
      
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dobDate.getDate())
      ) {
        age--;
      }
      
      if (age < 18) {
        return NextResponse.json(
          { message: "Voter must be at least 18 years old" },
          { status: 403 }
        );
      }
      const existingUser= await User.findOne({email});
      if (existingUser){
        return NextResponse.json(
            {
                message:"Email already registered"
            },
            {
                status:409
            }
        );
      }

    const scc= await SCC.findOne({code:sccCode})
    if(!scc){
        return NextResponse.json(
            {
                message:"Invalid SCC code"
            },
            {
                status:404
            }
        )
    }
    if (scc.used){
        return NextResponse.json(
            {
                message:"SCC already used"
            },
            {
                status:409
            }
        );
    }
     const passwordHash= await hashPassword(password);

     await User.create({
        name,
        email,
        dob,
        passwordHash,
        role:"VOTER",
     });

     scc.used=true;
     await scc.save();

     return NextResponse.json(
        {
            message:"User registered sucessfully"
        },
        {
            status:201
        }
     )

    } catch (error) {
       return NextResponse.json(
        {
            message:"Server Error"
        },
        {
            status:500
        }
       ) 
    }
    
}