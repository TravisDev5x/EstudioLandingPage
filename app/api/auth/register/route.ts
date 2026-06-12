import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { registerSchema } from "@/lib/validations"
import { generateVerifyToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/email"
import { rateLimiters, checkRateLimit, getClientIp, RATE_LIMIT_MESSAGE } from "@/lib/rate-limit"

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const { success } = await checkRateLimit(rateLimiters.register, ip)
  if (!success) {
    return NextResponse.json({ error: RATE_LIMIT_MESSAGE }, { status: 429 })
  }

  const parsed = registerSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
      { status: 400 }
    )
  }

  const { name, email, password } = parsed.data

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json(
      { error: "No se pudo completar el registro con estos datos" },
      { status: 409 }
    )
  }

  const clienteRole = await prisma.role.findUnique({ where: { name: "Cliente" } })

  const hashed = await bcrypt.hash(password, 12)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      emailVerified: false,
      roleId: clienteRole?.id,
    },
  })

  const token = await generateVerifyToken(email)
  await sendVerificationEmail(email, token, name)

  return NextResponse.json(
    { message: "Cuenta creada. Revisa tu correo para verificar tu cuenta" },
    { status: 201 }
  )
}
