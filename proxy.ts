import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"

const { auth } = NextAuth(authConfig)

const PUBLIC_PATHS = ["/login", "/reset-password", "/verify-email", "/blog"]

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth
  const { pathname } = req.nextUrl
  const isPublic =
    pathname === "/" ||
    PUBLIC_PATHS.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith("/api/auth")

  if (!isLoggedIn && !isPublic) {
    return Response.redirect(new URL("/login", req.nextUrl.origin))
  }

  if (isLoggedIn && pathname === "/login") {
    return Response.redirect(new URL("/dashboard", req.nextUrl.origin))
  }
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
