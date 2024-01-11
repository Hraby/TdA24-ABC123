import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()

export async function getLecturers() {
  const lecturers = await prisma.lecturer.findMany({
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

export async function addLecturer(lecturerData: any) {
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
      connectOrCreate: lecturerData.tags?.map((tag: Tag) => ({
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
  return await lecturer
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

  return await lecturer
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

  return await lecturer
}

export async function updateLecturer(data: any, uuid: string){
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
    }
  })
  return await getLecturer(uuid)
}