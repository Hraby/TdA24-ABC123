import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()

export async function getLecturers({ tag, location, price_per_hour }: { tag?: string, location?: string, price_per_hour?: number }) {
  const filter: any = {};
  if (tag) filter.tags = { some: { name: { contains: tag } } };
  if (location) filter.location = { contains: location };
  if (price_per_hour) filter.price_per_hour = {  lte: price_per_hour };


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

  const lecturersFormated = lecturers.map((lecturer) => ({
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