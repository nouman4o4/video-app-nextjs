"use client"

import { useActionState, useEffect } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { loginSchema } from "@/schemas/login.shcema"
import { signIn } from "next-auth/react"

type FormState = {
  email: string
  password: string
  success?: boolean
  errors?: Record<string, string[]>
  message?: string
} | null

export default function Login() {
  const router = useRouter()

  // submit action

  const submitRegister = async (prevState: FormState, form_data: FormData) => {
    const data = {
      email: form_data.get("email") as string,
      password: form_data.get("password") as string,
    }
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
    console.log(result)
    if (result?.error) {
      toast.error("Invalid email or password")
      return {
        ...data,
        message: "Invalid email or password",
        success: false,
      }
    }
    toast.success("Login successfully")
    router.push("/")
    return {
      ...data,
      message: "Login successfully",
      success: true,
    }
  }

  const [state, formAction, ispending] = useActionState<FormState, FormData>(
    submitRegister,
    {
      email: "",
      password: "",
      errors: undefined,
      success: undefined,
      message: "",
    }
  )

  // useEffect(() => {
  //   if (state?.success) {
  //     toast.success("User registered successfully.")
  //     setTimeout(() => router.push("/login"), 500)
  //   } else if (!state?.success && state?.message) {
  //     toast.error(state?.message || "Couldn't register the user")
  //   }
  // }, [state, router])

  return (
    <div className="max-w-md  mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form action={formAction} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            defaultValue={state?.email}
            type="email"
            name="email"
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700"
            placeholder="john@example.com"
          />
          {state?.errors?.email && (
            <p className="text-red-400 text-sm">{state?.errors?.email[0]}</p>
          )}
        </div>
        {/* password */}
        <div>
          <label className="block mb-1">Password</label>
          <input
            defaultValue={state?.password}
            name="password"
            type="password"
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700"
            placeholder="********"
          />
          {state?.errors?.password && (
            <p className="text-red-400 text-sm">{state?.errors?.password[0]}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-md transition-all"
        >
          {ispending ? "Submitting..." : "Submit"}
        </button>
      </form>

      {state?.message && (
        <p
          className={`h-6 mt-4 text-sm font-semibold ${
            state?.success ? "text-green-400" : "text-red-400"
          }`}
        >
          {state.message}
        </p>
      )}
    </div>
  )
}
