import { NextResponse, NextRequest } from "next/server";

type Admin = {username: string, password: string}
const admin: Admin[] = [{ username: "TdA", password: "d8Ef6!dGG_pv" }];

const findUserByUsername = (username: string): Admin | undefined => {
    return admin.find((admin) => admin.username === username);
};

export function middleware(request: NextRequest){
    const response = NextResponse.next()
    response.headers.set("Content-Type", "application/json")

    const basicAuth = request.headers.get("authorization");
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

export const config = {
    matcher: "/api/:path*"
}