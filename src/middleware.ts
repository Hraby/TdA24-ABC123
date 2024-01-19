import { NextResponse } from "next/server";

export function middleware(request: Request){
    const response = NextResponse.next()
    response.headers.set("Content-Type", "application/json")
    return response;
}

export const config = {
    matcher: "/api/:path*"
}