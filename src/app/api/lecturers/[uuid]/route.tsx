import { getLecturer } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { uuid: string } }) {
    const lecturer = await getLecturer(params.uuid)
    if(lecturer == null)
        return NextResponse.json({message: "User not found"}, {status: 404} )
    return NextResponse.json(lecturer)
}