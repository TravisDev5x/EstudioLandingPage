import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { CredentialsSignin } from "next-auth"
import bcrypt from "bcryptjs"
import prisma from "./prisma"
import { loginSchema } from "./validations"
import { authConfig } from "./auth.config"

class EmailNotVerifiedError extends CredentialsSignin {
  code = "EMAIL_NOT_VERIFIED" as const
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const user = await prisma.adminUser.findUnique({
          where: { email: parsed.data.email },
        })
        if (!user) return null

        const valid = await bcrypt.compare(parsed.data.password, user.password)
        if (!valid) return null

        if (!user.emailVerified) throw new EmailNotVerifiedError()

        return { id: String(user.id), email: user.email, name: user.name }
      },
    }),
  ],
})
