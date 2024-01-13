import {PrismaClient} from "@prisma/client"
import Homepage from "@/pages/homepage/homepage";
import Lektori from "@/pages/lektori/lektori";

const prisma = new PrismaClient()

export default function Home() {
    return (
        <div>
            <Homepage></Homepage>
        </div>
    )
}
