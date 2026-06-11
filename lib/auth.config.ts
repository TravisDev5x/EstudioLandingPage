import type { NextAuthConfig } from "next-auth"
import prisma from "./prisma"

export const authConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt" as const },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google") return true

      const email = user.email
      if (!email) return false

      const existingUser = await prisma.user.findUnique({ where: { email } })

      if (!existingUser) {
        const clienteRole = await prisma.role.findUnique({ where: { nombre: "Cliente" } })
        await prisma.user.create({
          data: {
            name: user.name ?? profile?.name ?? email,
            email,
            password: null,
            emailVerified: true,
            roleId: clienteRole?.id ?? null,
          },
        })
      } else if (!existingUser.emailVerified) {
        await prisma.user.update({
          where: { id: existingUser.id },
          data: { emailVerified: true },
        })
      }

      return true
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id
      if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          include: { role: true },
        })
        if (dbUser) token.id = String(dbUser.id)
        token.role = dbUser?.role?.nombre ?? null
      }
      return token
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role
      }
      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig
