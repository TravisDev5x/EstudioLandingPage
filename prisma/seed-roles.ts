import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"

const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string)
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.role.upsert({
    where: { nombre: "Admin" },
    update: {},
    create: { nombre: "Admin", descripcion: "Acceso completo al sistema" },
  })

  await prisma.role.upsert({
    where: { nombre: "Cliente" },
    update: {},
    create: { nombre: "Cliente", descripcion: "Usuario cliente del estudio" },
  })

  console.log("✓ Roles base creados: Admin, Cliente")
}

main().catch(console.error).finally(() => prisma.$disconnect())
