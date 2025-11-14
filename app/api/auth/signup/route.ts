import { connectDB } from "@/lib/db"
import { User } from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { registerSchema } from "@/schemas/register.schema"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const result = registerSchema.safeParse(body)
    if (!result.success) {
      const errors = result.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }))

      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors,
        },
        { status: 400 }
      )
    }

    const { firstname, lastname, email, password } = result.data
    await connectDB()
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password,
    })

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        data: { email: newUser.email },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}
