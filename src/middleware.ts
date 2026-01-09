import { NextRequest,NextResponse } from "next/server";
import {verifyEdgeToken} from "@/lib/edgeAuth"
import {JwtPayload} from "@/lib/auth"

export async function middleware(req:NextRequest){
const {pathname}=req.nextUrl;

if (pathname.match(/\.(jpg|jpeg|png|webp|svg|ico)$/)) {
    return NextResponse.next();
  }

if (pathname.startsWith("/api/auth")||
pathname.startsWith("/auth") || 
pathname.startsWith("/api/scc")||
pathname.startsWith("/api/mslr")||
pathname.startsWith("/mslr") || 
pathname==="/" ||
pathname.startsWith("/_next")

){
    return NextResponse.next()
}


const token = req.cookies.get("token")?.value;

if(!token){
    return NextResponse.json(
        {
            message:"Unauthorised"
        },
        {
            status:401
        }
    )
}
let payload:JwtPayload
try {
   payload=await verifyEdgeToken(token) 
} catch (error) {
    return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    
}


if(pathname.startsWith("/ec")||pathname.startsWith("/api/admin")){
    if(payload.role!== "EC"){
    return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
        );
    }
}
if (pathname.startsWith("/voter") || pathname.startsWith("/api/vote")){
    if (payload.role !== "VOTER") {
        return NextResponse.json(
          { message: "Forbidden" },
          { status: 403 }
        );
    
 }


}
return NextResponse.next()
}
