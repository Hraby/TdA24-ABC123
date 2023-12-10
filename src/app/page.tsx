import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default function Home() {
  return (
      <div>
        <span>Hello TdA</span>
      </div>
  )
}
