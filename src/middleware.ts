import { NextResponse } from "next/server";

export function middleware(request: Request){
    const response = NextResponse.next()
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, application/json")
}

export const config = {
    matcher: "/api/:path"
}