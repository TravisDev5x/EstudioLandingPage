import { type NextRequest, NextResponse } from "next/server"
import { verifyEmailToken } from "@/lib/tokens"
import { sendWelcomeEmail } from "@/lib/email"

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token")

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=invalid-token", request.nextUrl.origin))
  }

  const result = await verifyEmailToken(token)

  if (result) {
    try {
      await sendWelcomeEmail(result.email, result.name)
    } catch {
      // silent — la verificación ya se completó, el email de bienvenida no es crítico
    }
    return NextResponse.redirect(new URL("/login?verified=true", request.nextUrl.origin))
  }

  return NextResponse.redirect(new URL("/login?error=invalid-token", request.nextUrl.origin))
}
