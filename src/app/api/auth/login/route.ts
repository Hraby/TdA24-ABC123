import { prisma } from "@/db";
import bcrypt from "bcryptjs";
import config from "@/config";
import * as jose from "jose";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    const body = await request.json();
    const {username, password} = body;

    const lecturer: any = prisma.lecturer.findFirst({
        where: {
            username,
        },
    });

    // const isCorrectPassword = bcrypt.compareSync(password, username.password);

    const secret = new TextEncoder().encode(config.JWT_SECRET);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({})
    .setProtectedHeader({ alg })
    .setExpirationTime("72h")
    .setSubject(lecturer.uuid)
    .sign(secret);

    return NextResponse.json({ token: jwt });
}