import { jwtVerify } from "jose";
import type { JwtPayload } from "@/lib/auth";

const JWT_SECRET = process.env.JWT_SECRET as string;
const secret = new TextEncoder().encode(JWT_SECRET);

export async function verifyEdgeToken(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, secret);

  
  return payload as JwtPayload;
}