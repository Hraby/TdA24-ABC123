import { prisma } from "@/db";
import config from "@/config";
import * as jose from "jose";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest){
    const data = await request.json();
    console.log(data)
    if(!data.username || !data.password){
        return NextResponse.json(
            {
                error: "Špatný jméno nebo heslo"
            }, {status: 400}
        );
    }

    const lecturer = await prisma.lecturer.findUnique({
        where:{
            username: data.username.toString(),
            password: data.password.toString(),
        },
    });

    if (!lecturer){
        return NextResponse.json(
            {
                error: "Špatný jméno nebo heslo"
            }, {status: 400}
        );
    }

    const secret = new TextEncoder().encode(config.JWT_SECRET);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({})
    .setProtectedHeader({ alg })
    .setExpirationTime("1d")
    .setSubject(lecturer.uuid.toString())
    .setIssuer(lecturer.uuid.toString())
    .sign(secret);
    console.log(jwt)

    return NextResponse.json({token: jwt}, {status: 200});
}

export async function GET(request: NextRequest){
    const data = await request.json();
    console.log(data)
    if(!data.username || !data.password){
        return NextResponse.json(
            {
                error: "Špatný jméno nebo heslo"
            }, {status: 400}
        );
    }

    const lecturer = await prisma.lecturer.findUnique({
        where:{
            username: data.username.toString(),
            password: data.password.toString(),
        },
    });

    if (!lecturer){
        return NextResponse.json(
            {
                error: "Špatný jméno nebo heslo"
            }, {status: 400}
        );
    }

    const secret = new TextEncoder().encode(config.JWT_SECRET);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({})
    .setProtectedHeader({ alg })
    .setExpirationTime("1d")
    .setSubject(lecturer.uuid.toString())
    .setIssuer(lecturer.uuid.toString())
    .sign(secret);
    console.log(jwt)

    return NextResponse.json({token: jwt}, {status: 200});
}