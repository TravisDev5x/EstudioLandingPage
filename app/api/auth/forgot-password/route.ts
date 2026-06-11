import { NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"

export const runtime = 'nodejs'
import { generateResetToken } from "@/lib/tokens"
import { sendPasswordResetEmail } from "@/lib/email"

const schema = z.object({ email: z.string().email() })

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 })
  }

  const { email } = parsed.data

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (user && user.emailVerified) {
      const token = await generateResetToken(email)
      await sendPasswordResetEmail(email, token, user.name)
    }
  } catch {
    // silent — don't reveal errors to client
  }

  return NextResponse.json({ message: "Si el email existe, recibirás instrucciones en breve" })
}
