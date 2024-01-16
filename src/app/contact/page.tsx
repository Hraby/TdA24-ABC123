import {PrismaClient} from "@prisma/client"
import Contact from "@/pages/contact/contact"

const prisma = new PrismaClient()

export default function Contact() {
    return (
        <div>
            <Contact></Contact>
        </div>
    )
}
