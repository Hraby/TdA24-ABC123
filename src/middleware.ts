import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import config from "@/config"
import * as jose from "jose";

type Admin = {username: string, password: string}
const admin: Admin[] = [{ username: "TdA", password: "d8Ef6!dGG_pv" }];

const findUserByUsername = (username: string): Admin | undefined => {
    return admin.find((admin) => admin.username === username);
};

export async function middleware(request: NextRequest){

    if(request.nextUrl.pathname.startsWith('/api')){
        const response = NextResponse.next()
        response.headers.set("Content-Type", "application/json")

        const basicAuth = request.headers.get("Authorization");
        const url = request.nextUrl;

        if (basicAuth) {
            const authValue = basicAuth.split(" ")[1];
        
            const [username, pwd] = atob(authValue).split(":");
        
            const user = findUserByUsername(username);
        
            if (user && pwd === user.password) {
            return response;
            }
        }

        url.pathname = "/api/auth";
        return NextResponse.rewrite(url);
    }

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        const response = NextResponse.next()
        response.headers.set("Content-Type", "application/json")
        const cookie = cookies().get("Authorization");
        if (!cookie) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        const secret = new TextEncoder().encode(config.JWT_SECRET);
        const jwt = cookie.value;

        try {
            const { payload } = await jose.jwtVerify(jwt, secret, {});
        } catch (err) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

}