import type { NextAuthConfig } from "next-auth"
import prisma from "./prisma"

export const authConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt" as const },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          include: { role: true },
        })
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
