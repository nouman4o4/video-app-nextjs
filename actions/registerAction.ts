"use server"

import { registerSchema } from "@/schemas/register.schema"

export type FormState = {
  name: string
  email: string
  password: string
  success?: boolean
  errors?: Record<string, string[]>
  message?: string
} | null

export const submitRegister = async (
  pevState: FormState,
  form_data: FormData
) => {
  //   const data = Object.fromEntries(form_data.entries())
  const data = {
    name: form_data.get("name") as string,
    email: form_data.get("email") as string,
    password: form_data.get("password") as string,
  }

  const parsed = registerSchema.safeParse(data)

  if (!parsed.success) {
    return {
      ...data,
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    const uri = "http://localhost:3000/api/auth/signup"
    const response = await fetch(uri, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify(parsed.data),
    })

    // if (!response.ok) {
    //   console.error(response)
    //   return {
    //     ...data,
    //     success: false,
    //     message: `Request failed with ${response.status}`,
    //   }
    // }

    const jsonData = await response.json()
    if (!jsonData.success) {
      return {
        ...data,
        message: jsonData.message,
        success: false,
      }
    }
    return {
      ...data,
      message: "User registered successfully",

      success: true,
    }
  } catch (error) {
    console.log(error)
    return {
      ...data,
      message: "An unexpected error occured",
      errors: undefined,
      success: false,
    }
  }
}
