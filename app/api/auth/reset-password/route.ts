import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export const runtime = 'nodejs'
import { verifyResetToken } from "@/lib/tokens"
import { rateLimiters, checkRateLimit, getClientIp, RATE_LIMIT_MESSAGE } from "@/lib/rate-limit"
import { resetPasswordSchema } from "@/lib/validations"

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const { success } = await checkRateLimit(rateLimiters.resetPassword, ip)
  if (!success) {
    return NextResponse.json({ error: RATE_LIMIT_MESSAGE }, { status: 429 })
  }

  const parsed = resetPasswordSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
      { status: 400 }
    )
  }

  const { token, password } = parsed.data

  const user = await verifyResetToken(token)
  if (!user) {
    return NextResponse.json({ error: "Token inválido o expirado" }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 12)
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashed, resetToken: null, resetTokenExp: null },
  })

  return NextResponse.json({ message: "Contraseña actualizada correctamente" })
}
