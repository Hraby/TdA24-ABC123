import {NextResponse} from "next/server"

export async function GET(request: Request) {
    return NextResponse.json({"secret": "The cake is a lie"})
}