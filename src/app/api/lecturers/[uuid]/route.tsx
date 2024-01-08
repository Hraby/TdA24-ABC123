import { getLecturer, delLecturer } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { uuid: string } }) {
    const lecturer = await getLecturer(params.uuid)
    if(lecturer == undefined)
        return NextResponse.json({message: "User not found"}, {status: 404} )
    return NextResponse.json(lecturer)
}

export async function DELETE(request: Request, {params}: {params: {uuid: string}}){
    const lecturerValidate = await getLecturer(params.uuid)
    if(lecturerValidate == null)
        return NextResponse.json({message: "User not found"}, {status: 404} )

    await delLecturer(lecturerValidate.uuid, lecturerValidate.contact_infoId != null ? lecturerValidate.contact_infoId : undefined)
    return new Response(null, {status: 204})
}