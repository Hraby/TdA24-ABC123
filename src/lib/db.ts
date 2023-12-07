import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function getLecturers() {
    return await prisma.lecturer.findMany({
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
    });
}

export async function addLecturer(lecturerData: LecturerCreateInput) {
    return await prisma.lecturer.create({
        data: {
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
                connectOrCreate: lecturerData.tags?.map((tag) => ({
                    create: { name: tag.name },
                    where: { name: tag.name },
                })),
            },
            contact: {
                create: {
                    telephone_numbers: {
                        set: lecturerData.contact?.telephone_numbers || [],
                    },
                    emails: {
                        set: lecturerData.contact?.emails || [],
                    },
                },
            },
        },
        include: {
            tags: {
                select: {
                    uuid: true,
                    name: true,
                },
            },
            contact: {
                select: {
                    emails: true,
                    telephone_numbers: true
                }
            },
        },
    });
}

export async function getLecturer(uuid: string){
    return await prisma.lecturer.findUnique({
        where: {
          uuid: uuid,
        },
        include: {
            tags: {
                select: {
                    uuid: true,
                    name: true,
                },
            },
            contact: {
                select: {
                    emails: true,
                    telephone_numbers: true
                }
            },
        },
      })
}