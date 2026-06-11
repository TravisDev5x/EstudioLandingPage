import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null

if (!redis && process.env.NODE_ENV === "production") {
  console.warn(
    "[rate-limit] UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN no configurados — rate limiting deshabilitado."
  )
}

function buildLimiter(prefix: string, limit: number, window: `${number} ${"s" | "m" | "h" | "d"}`) {
  if (!redis) return null
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, window),
    prefix: `ratelimit:${prefix}`,
    analytics: false,
  })
}

export const rateLimiters = {
  register: buildLimiter("register", 5, "15 m"),
  forgotPassword: buildLimiter("forgot-password", 3, "15 m"),
  resetPassword: buildLimiter("reset-password", 5, "15 m"),
  resendVerify: buildLimiter("resend-verify", 3, "15 m"),
  login: buildLimiter("login", 10, "15 m"),
}

export type RateLimitResult = { success: boolean }

/**
 * Aplica el rate limit. Si Upstash no está configurado (p.ej. en desarrollo
 * local sin las env vars), no bloquea ninguna petición (fail-open).
 */
export async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<RateLimitResult> {
  if (!limiter) return { success: true }
  const { success } = await limiter.limit(identifier)
  return { success }
}

/** Extrae la IP del cliente a partir de los headers de la petición. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return request.headers.get("x-real-ip") ?? "unknown"
}

export const RATE_LIMIT_MESSAGE = "Demasiados intentos, intenta más tarde."
