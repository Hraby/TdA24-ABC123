import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function getLecturers() {
  const lecturers = prisma.$transaction(await prisma.lecturer.findMany({
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
    }
  }))

  return lecturers.map((lecturer) => ({
    ...lecturer,
    contact: {
      ...lecturer.contact,
      telephone_numbers: lecturer?.contact?.telephone_numbers
        ? lecturer.contact.telephone_numbers.split(',').map(phone => phone.trim())
        : [],
      emails: lecturer?.contact?.emails
        ? lecturer.contact.emails.split(',').map(email => email.trim())
        : []
    },
  }))
}

export async function addLecturer(lecturerData: AddLecturer) {
  const data: any = {
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
      connectOrCreate: lecturerData.tags?.map((tag) => ({
        create: { name: tag.name },
        where: { name: tag.name },
      })) || [],
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

  return await prisma.$transaction(prisma.lecturer.create({
    data,
    include: {
      tags: {
        select: {
          name: true,
        },
      },
      contact: {
        select: {
          emails: true,
          telephone_numbers: true,
        },
      },
    },
  }))
}


export async function getLecturer(uuid: string){
  return await prisma.$transaction(prisma.lecturer.findUnique({
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
                emails: true,
                telephone_numbers: true
            },
        },
    },
  }))
}

export async function delLecturer(uuid: string, contact?: number){
  if (contact != undefined){
    await prisma.$transaction(prisma.contact_info.delete({
      where: {
        id: contact,
      },
    }))
  }

  return await prisma.$transaction(prisma.lecturer.delete({
    where: {
      uuid: uuid,
    }
  }))

}

export async function updateLecturer(data: any, uuid: string){
  await prisma.$transaction(prisma.lecturer.update({
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
    }
  }))
  return getLecturer(uuid)
}