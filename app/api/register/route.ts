import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

interface typeRequest {
  email : string,
  name :string,
  password : string
}
export async function POST(
  request: Request, 
) {
  const body : typeRequest = await request.json();

   const password = await bcrypt.hash(body.password, 12);

   const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      hashedPassword : password,
    }
  });
  const {hashedPassword, ...result} = user
  return NextResponse.json(result)
}
