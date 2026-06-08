import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
})

export const createUserSchema = z.object({
  nombre: z.string().min(2, "Mínimo 2 caracteres").max(100),
  email: z.string().email("Email inválido"),
})

export const updateUserSchema = createUserSchema.partial()

export type LoginInput = z.infer<typeof loginSchema>
export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
