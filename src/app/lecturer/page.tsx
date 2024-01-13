import {PrismaClient} from "@prisma/client"
import Lektori from "@/pages/lektori/lektori";

const prisma = new PrismaClient()

export default function Lecturer() {
    return (
        <div>
            <Lektori></Lektori>
        </div>
    )
}
