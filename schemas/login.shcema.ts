import { TypeOf, z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email adress."),
  password: z.string().min(6, "Password should be more than 6 chars"),
})

export type registerFormData = z.infer<typeof loginSchema>
