import { PrismaClient } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "./prisma"

export async function getLecturers(params: any) {
  const filter: any = {};
  if (params.tags) filter.tags = { some: { name: { contains: params.tags } } };
  if (params.location) filter.location = { contains: params.location };
  if (params.price_per_hour) filter.price_per_hour = {  lte: parseInt(params.price_per_hour) };


  const lecturers = await prisma.lecturer.findMany({
    where: filter,
    select: {
      uuid: true,
      title_before: true,
      first_name: true,
      middle_name: true,
      last_name: true,
      title_after: true,
      picture_url: true,
      location: true,
      claim: true,
      bio: true,
      contact_infoId: false,
      tags: {
        select: {
          uuid: true,
          name: true,
        },
      },
      price_per_hour: true,
      contact: {
        select: {
          telephone_numbers: true,
          emails: true,
        },
      },
    },
  })

  const lecturersFormated = lecturers.map((lecturer: any) => ({
    ...lecturer,
    contact: {
      ...lecturer.contact,
      telephone_numbers: lecturer?.contact?.telephone_numbers
        ? lecturer.contact.telephone_numbers.split(',').map((phone: any) => phone.trim())
        : [],
      emails: lecturer?.contact?.emails
        ? lecturer.contact.emails.split(',').map((email: any) => email.trim())
        : []
    },
  }))

  return lecturersFormated
}

export async function addLecturer(lecturerData: any) {
  const data: any = {
    uuid: lecturerData.uuid,
    title_before: lecturerData.title_before,
    first_name: lecturerData.first_name,
    middle_name: lecturerData.middle_name,
    last_name: lecturerData.last_name,
    title_after: lecturerData.title_after,
    picture_url: lecturerData.picture_url,
    location: lecturerData.location,
    claim: lecturerData.claim,
    bio: lecturerData.bio,
    price_per_hour: lecturerData.price_per_hour,
    tags: {
      connectOrCreate: lecturerData.tags?.map((tag: Tag) => ({
        create: { name: tag.name },
        where: { name: tag.name },
      })),
    },
  }

  if (lecturerData.contact) {
    data.contact = {
      create: {
        telephone_numbers: lecturerData.contact.telephone_numbers || [],
        emails: lecturerData.contact.emails || [],
      },
    }
  }

  const lecturer = await prisma.lecturer.create({
    data,
    include: {
      tags: {
        select: {
          uuid: true,
          name: true,
        },
      },
      contact: {
        select: {
          telephone_numbers: true,
          emails: true,
        },
      },
    },
  })

  return lecturer
}


export async function getLecturer(uuid: string){
  const lecturer = await prisma.lecturer.findUnique({
    where: {
      uuid: uuid,
    },
    include: {
      tags: {
          select: {
              uuid: true,
              name: true
          },
      },
      contact: {
          select: {
              telephone_numbers: true,
              emails: true,
          },
      },
    },
  })

  return lecturer
}

export async function delLecturer(uuid: string, contact?: number){
  if (contact != undefined){
    await prisma.contact_info.delete({
      where: {
        id: contact,
      },
    })
  }

  const lecturer = await prisma.lecturer.delete({
    where: {
      uuid: uuid,
    }
  })

  return lecturer
}

export async function updateLecturer(data: any, uuid: string){
  const lecturer =  await getLecturer(uuid)
  data.contact = {
    create: {
      telephone_numbers: data.contact?.telephone_numbers || lecturer?.contact?.telephone_numbers,
      emails: data.contact?.emails || lecturer?.contact?.emails,
    },
  }

  if(lecturer?.tags && data.tags){
    await prisma.lecturer.update({
      where: {
        uuid: uuid,
      },
      data: {
        tags: {
          set: []
        },
      },
      include: {
        tags: true,
      }
    })
  }

  await prisma.lecturer.update({
    where: {
      uuid: uuid,
    },
    data: {
      ...data,
      tags: {
        connectOrCreate: data.tags?.map((tag: Tag) => ({
          create: { name: tag.name },
          where: { name: tag.name }
        }))
      },
    },
    include: {
      tags: true,
      contact: true,
    }
  })
  const updatedLecturer =  await getLecturer(uuid)
  return updatedLecturer
}

export async function getTimeSlot(date: any, uuid: string){
  const timeSlot = await prisma.reservation.findMany({
    where: {lecturer_uuid: uuid, date: date}
  })
  return timeSlot
}

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login({ username, password}: {username: string, password: string}) {
  const lecturer = { username, password};
  console.log(lecturer)
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ lecturer, expires });

  cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}