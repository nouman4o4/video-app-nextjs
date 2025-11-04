import { z } from "zod"

export const userUpdateSchema = z.object({
  firstname: z
    .string()
    .min(3, "First name must be at least 3 characters.")
    .max(20, "First name shoud be less than 10 chars."),
  lastname: z
    .string()
    .min(3, "Last name must be at least 3 characters.")
    .max(20, "Last name shoud be less than 10 chars."),
  about: z
    .string()
    .max(100, "About details should not be more than 100 chars")
    .optional(),
})

export type registerFormData = z.infer<typeof userUpdateSchema>
