import { prisma } from "@/db";
import bcrypt from "bcryptjs";
import config from "@/configjs";
import * as jose from "jose";

export async function POST(request: Request){
    const body = await request.json();
    const {username, password} = body;

    const user = prisma.lecturer.findFirst({
        where: {
            username: username
        },
    });

    const isCorrectPassword = bcrypt.compareSync(password, username.password);

    const secret = new TextEncoder().encode(config.JWT_SECRET);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({})
    .setProtectedHeader({ alg })
    .setExpirationTime("72h")
    .setSubject(user.id.toString())
    .sign(secret);

    return Response.json({ token: jwt });
}