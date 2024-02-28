import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import prisma from "./prisma"
import { format, getTime } from "date-fns";

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

export async function getReservations(params: any){
  const filter: any = {};
  if (params.uuid) filter.lecturer_uuid = { contains: params.uuid };
  if (params.date) filter.date = { equals: params.date };

  const reservations = await prisma.reservation.findMany({
    where: filter,
    include: {
      lecturer: {
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
          price_per_hour: true,
          contact_infoId: true,
          password: false,
          username: false
        }
      },
      tags: true
    },
  })

  return reservations;
}

export async function addReservation(data: any){
  const reservation = await prisma.reservation.create({
    data: {
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      email: data.email,
      date: data.date,
      timeSlot: data.timeSlot,
      form: data.form,
      message: data.message,
      lecturer: {
        connect: { uuid: data.lecturer_uuid }
      }
    }
  });
  return reservation;
}

export async function getTimeSlot(date: any, uuid: string){
  const existingTimeslots = await prisma.reservation.findMany({
    where: {lecturer_uuid: uuid, date: date}
  })
  return existingTimeslots;
}

export async function generateTimeSlot(date: any, uuid: string){
  const reservations = await fetch(`/api/reservations?uuid=${uuid}&date=${date}`, {
    method: 'GET',
    headers: {
      'Authorization': "Basic " + btoa("TdA"+":"+"d8Ef6!dGG_pv"),
      'Content-Type': 'application/json',
    },
  })
  const data = await reservations.json();

  function generateTimeslots() {
    const timeslots = [];
    const startTime = new Date();
    startTime.setHours(8, 0, 0, 0);
  
    while (startTime.getHours() < 20) {
      const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
  
      const timeslot = {
        value: `${format(startTime, "HH:mm")} - ${format(endTime, "HH:mm")}`,
        label: `${format(startTime, "HH:mm")} - ${format(endTime, "HH:mm")}`
      };
      timeslots.push(timeslot);
  
      startTime.setHours(startTime.getHours() + 1);
    }
    return timeslots;
  }

  const existingTimeslots = data.map((reservation: any) => reservation.timeSlot);

  const generatedTimeslots = generateTimeslots().filter(timeslot => {
    return !existingTimeslots.includes(timeslot.value);
  });

  return generatedTimeslots;
}