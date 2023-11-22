import { NextResponse } from "next/server"
export async function GET() {
    return NextResponse.json({secret: "The cake is a lie"})
}