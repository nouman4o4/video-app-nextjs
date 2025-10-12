"use client"

import { submitRegister } from "@/actions/registerAction"
import { useActionState, useEffect } from "react"

import { FormState } from "@/actions/registerAction"

import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function Register() {
  const router = useRouter()
  const [state, formAction, ispending] = useActionState<FormState, FormData>(
    submitRegister,
    {
      name: "",
      email: "",
      password: "",
      errors: undefined,
      success: undefined,
      message: "",
    }
  )

  useEffect(() => {
    if (state?.success) {
      toast.success("User registered successfully.")
      setTimeout(() => router.push("/login"), 500)
    } else if (!state?.success && state?.message) {
      toast.error(state?.message || "Couldn't register the user")
    }
  }, [state, router])

  return (
    <div className="max-w-md  mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form action={formAction} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1">Name</label>
          <input
            defaultValue={state?.name}
            type="text"
            name="name"
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700"
            placeholder="John Doe"
          />
          {state?.errors?.name && (
            <p className="text-red-400 text-sm">{state.errors.name[0]}</p>
          )}
        </div>

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
