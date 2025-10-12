import { TypeOf, z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  email: z.string().email("Invalid email adress."),
  password: z.string().min(6, "Password should be more than 6 chars"),
})

export type registerFormData = z.infer<typeof registerSchema>
