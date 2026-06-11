import { NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"

export const runtime = 'nodejs'
import { generateVerifyToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/email"
import { rateLimiters, checkRateLimit, getClientIp, RATE_LIMIT_MESSAGE } from "@/lib/rate-limit"

const schema = z.object({ email: z.string().email() })

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const { success } = await checkRateLimit(rateLimiters.resendVerify, ip)
  if (!success) {
    return NextResponse.json({ error: RATE_LIMIT_MESSAGE }, { status: 429 })
  }

  const parsed = schema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 })
  }

  const { email } = parsed.data

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (user && !user.emailVerified) {
      const token = await generateVerifyToken(email)
      await sendVerificationEmail(email, token, user.name)
    }
  } catch {
    // silent
  }

  return NextResponse.json({ message: "Si el email existe, recibirás el correo de verificación" })
}
