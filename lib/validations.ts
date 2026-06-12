import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
})

export const passwordSchema = z
  .string()
  .min(8, "Mínimo 8 caracteres")
  .regex(/[A-Z]/, "Debe incluir al menos una letra mayúscula")
  .regex(/[0-9]/, "Debe incluir al menos un número")

export const registerSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: passwordSchema,
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: passwordSchema,
})

/** Valida params dinámicos [id] de Role: deben ser enteros positivos. */
export const idParamSchema = z.coerce.number().int().positive()

/** Valida params dinámicos [id] de User: deben ser UUID. */
export const userIdParamSchema = z.uuid()

export const createUserSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres").max(100),
  email: z.string().email("Email inválido"),
})

export const updateUserSchema = createUserSchema.partial()

export const createRoleSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres").max(100),
  description: z.string().max(255).optional(),
})

export const updateRoleSchema = createRoleSchema.partial()

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type CreateRoleInput = z.infer<typeof createRoleSchema>
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>
