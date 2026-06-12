import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { CredentialsSignin } from "next-auth"
import bcrypt from "bcryptjs"
import prisma from "./prisma"
import { loginSchema } from "./validations"
import { authConfig } from "./auth.config"
import { rateLimiters, checkRateLimit, getClientIp } from "./rate-limit"

class EmailNotVerifiedError extends CredentialsSignin {
  code = "EMAIL_NOT_VERIFIED" as const
}

class RateLimitedError extends CredentialsSignin {
  code = "RATE_LIMITED" as const
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials, request) {
        const ip = getClientIp(request)
        const { success } = await checkRateLimit(rateLimiters.login, ip)
        if (!success) throw new RateLimitedError()

        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        })
        if (!user || !user.password) return null

        const valid = await bcrypt.compare(parsed.data.password, user.password)
        if (!valid) return null

        if (!user.emailVerified) throw new EmailNotVerifiedError()

        return { id: user.id, email: user.email, name: user.name }
      },
    }),
    Google,
  ],
})
