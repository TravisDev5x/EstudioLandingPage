import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  const hashed = await bcrypt.hash("admin123", 10)

  await prisma.user.upsert({
    where: { email: "admin@estudio.com" },
    update: {},
    create: {
      email: "admin@estudio.com",
      name: "Admin",
      password: hashed,
      emailVerified: true,
    },
  })

  console.log("✓ Seed completado: admin@estudio.com / admin123")
}

main().catch(console.error).finally(() => prisma.$disconnect())
