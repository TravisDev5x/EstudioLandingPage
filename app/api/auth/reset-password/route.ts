import { NextResponse } from "next/server"
import { z } from "zod"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export const runtime = 'nodejs'
import { verifyResetToken } from "@/lib/tokens"

const schema = z.object({
  token: z.string().min(1),
  password: z.string().min(6),
})

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 })
  }

  const { token, password } = parsed.data

  const user = await verifyResetToken(token)
  if (!user) {
    return NextResponse.json({ error: "Token inválido o expirado" }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 10)
  await prisma.adminUser.update({
    where: { id: user.id },
    data: { password: hashed, resetToken: null, resetTokenExp: null },
  })

  return NextResponse.json({ message: "Contraseña actualizada correctamente" })
}
