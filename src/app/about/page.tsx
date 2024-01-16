import {PrismaClient} from "@prisma/client"
import AboutUs from "@/pages/about-us/about-us"
const prisma = new PrismaClient()

export default function AboutUs() {
    return (
        <div>
            <AboutUs></AboutUs>
        </div>
    )
}
