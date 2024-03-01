import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = cookies().getAll();

  return NextResponse.json({
    authenticated: !!session,
    session,
  });
}