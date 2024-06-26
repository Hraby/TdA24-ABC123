import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function main() {
    await prisma.lecturer.upsert({
        where: {
            uuid: "67fda282-2bca-41ef-9caf-039cc5c8dd69"
        },
        update: {},
        create: {
            uuid: "67fda282-2bca-41ef-9caf-039cc5c8dd69",
            title_before: "Mgr.",
            first_name: "Petra",
            middle_name: "Swil",
            last_name: "Plachá",
            title_after: "MBA",
            picture_url: "https://picsum.photos/200",
            location: "Brno",
            claim: "Bez dobré prezentace je i nejlepší myšlenka k ničemu.",
            bio: "<b>Formátovaný text</b> s <i>bezpečnými</i> tagy.",
            tags: {
                connectOrCreate: {
                    create: {
                        uuid: "c20b98dd-f37e-4fa7-aac1-73300abf086e",
                        name: "Marketing",
                    },
                    where: {
                        uuid: "c20b98dd-f37e-4fa7-aac1-73300abf086e",
                        name: "Marketing",
                    },
                },
            },
            price_per_hour: 720,
            contact: {
                create: {
                  telephone_numbers: "+123 777 338 111",
                  emails: "user@example.com"
                },
            },              
        },
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
