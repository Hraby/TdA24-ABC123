import { getLecturer, delLecturer, updateLecturer } from "@/lib/db";
import { contactTransform, dataTransform } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { uuid: string } }) {
    const lecturer = await getLecturer(params.uuid)
    if(lecturer == undefined)
        return NextResponse.json({message: "User not found"}, {status: 404} )

    const validatedLecturer = await dataTransform(lecturer)
    return NextResponse.json(validatedLecturer, {status: 200})
}

export async function DELETE(request: Request, {params}: {params: {uuid: string}}){
    const lecturerValidate = await getLecturer(params.uuid)
    if(!lecturerValidate)
        return NextResponse.json({message: "User not found"}, {status: 404} )

    await delLecturer(lecturerValidate.uuid, lecturerValidate.contact_infoId != null ? lecturerValidate.contact_infoId : undefined)
    return NextResponse.json({message: "User has been successfully deleted"}, {status: 200})
}

export async function PUT(request: Request, {params}: {params: {uuid: string}}){
    const data = await request.json()
    
    const transformedData = await contactTransform(data)
    const lecturerValidate = await getLecturer(params.uuid)

    if(lecturerValidate == null)
        return NextResponse.json({message: "User not found"}, {status: 404} )

    const lecturer = await updateLecturer(transformedData, params.uuid)
    const formatedLecturer = await dataTransform(lecturer)

    return NextResponse.json(formatedLecturer, {status: 200})
}