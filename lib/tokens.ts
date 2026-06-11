import crypto from "crypto"
import prisma from "./prisma"
import type { AdminUser } from "@prisma/client"

export async function generateVerifyToken(email: string): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex")
  const exp = new Date(Date.now() + 24 * 60 * 60 * 1000)
  await prisma.adminUser.update({
    where: { email },
    data: { verifyToken: token, verifyTokenExp: exp },
  })
  return token
}

export async function generateResetToken(email: string): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex")
  const exp = new Date(Date.now() + 60 * 60 * 1000)
  await prisma.adminUser.update({
    where: { email },
    data: { resetToken: token, resetTokenExp: exp },
  })
  return token
}

export async function verifyEmailToken(token: string): Promise<{ email: string; name: string } | null> {
  const user = await prisma.adminUser.findUnique({ where: { verifyToken: token } })
  if (!user || !user.verifyTokenExp || user.verifyTokenExp < new Date()) return null
  await prisma.adminUser.update({
    where: { id: user.id },
    data: { emailVerified: true, verifyToken: null, verifyTokenExp: null },
  })
  return { email: user.email, name: user.name }
}

export async function verifyResetToken(token: string): Promise<AdminUser | null> {
  const user = await prisma.adminUser.findUnique({ where: { resetToken: token } })
  if (!user || !user.resetTokenExp || user.resetTokenExp < new Date()) return null
  return user
}
