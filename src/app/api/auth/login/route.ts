import { NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/db"
import User from "@/models/User";
import { comparePassword } from "@/lib/hash";
import {signInSchema} from "@/schemas/signInSchema"
import { signToken } from "@/lib/auth";

export async function POST(req:Request){
    try {
       await connectToDatabase();
       const body= await req.json();
       const parsed=signInSchema.safeParse(body);
       if (!parsed.success){
        return NextResponse.json({
            message:"Invalid Input"
        },
    {
        status:400
    })
       }
    const {email,password}=parsed.data;
    const user=await User.findOne({email});
    if(!user){
        return NextResponse.json(
            {
                message:"Invalid credentials"
                
            },
            {
                status:401
            }
        )
    }
   const passwordValid=await comparePassword(
    password,
    user.passwordHash
   );
   if (!passwordValid){
    return NextResponse.json({
        message:"Invalid credentials"
    },
    {
        status:401
    }
)
   }
   const token = signToken({
    userId: user._id.toString(),
    role: user.role,
  });

  const response = NextResponse.json({
    message: "Login successful",
    role: user.role,
  });

response.cookies.set("token",token,{
    httpOnly:true,
    sameSite:"strict",
    secure:process.env.NODE_ENV === "production",
    path:"/",
    maxAge:60 * 60 * 24 * 7,

});
return response;

    } catch (error) {
      return NextResponse.json({
        message:"Server error"
      },
      {
        status:500
      }
    )  
    }
}