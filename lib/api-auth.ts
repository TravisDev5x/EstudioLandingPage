import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

type RequireAdminResult =
  | { ok: true }
  | { ok: false; response: NextResponse }

/**
 * Verifica que la petición provenga de una sesión autenticada con rol "Admin".
 * Devuelve { ok: true } si pasa, o { ok: false, response } con un 401/403 listo
 * para retornar directamente desde el route handler.
 */
export async function requireAdmin(): Promise<RequireAdminResult> {
  const session = await auth()

  if (!session?.user) {
    return {
      ok: false,
      response: NextResponse.json({ error: "No autenticado" }, { status: 401 }),
    }
  }

  if (session.user.role !== "Admin") {
    return {
      ok: false,
      response: NextResponse.json({ error: "No tienes permisos para esta acción" }, { status: 403 }),
    }
  }

  return { ok: true }
}
