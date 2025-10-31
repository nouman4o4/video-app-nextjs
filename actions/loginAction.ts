import { loginSchema } from "@/schemas/login.shcema"
import { signIn } from "next-auth/react"

export type FormState = {
  email: string
  password: string
  success?: boolean
  errors?: Record<string, string[]>
  message?: string
} | null

export async function loginAction(pevState: FormState, formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  try {
    const parsed = loginSchema.safeParse(data)
    if (!parsed.success) {
      return {
        ...data,
        success: false,
        errors: parsed.error.flatten().fieldErrors,
      }
    }

    const result = await signIn("credentials", {
      redirect: false,
      email: parsed.data.email,
      password: parsed.data.password,
    })

    if (result?.error) {
      return {
        ...data,
        message: "Invalid email or password",
        success: false,
      }
    }

    return {
      ...data,
      message: "Login successfully",
      success: true,
    }
  } catch (error) {
    console.log(error)
    return {
      ...data,
      errors: undefined,
      success: false,
    }
  }
}
