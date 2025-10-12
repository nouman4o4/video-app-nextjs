import { connectDB } from "@/lib/db"
import { User } from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  console.log("Signup api hit")
  try {
    const { email, password, name } = await request.json()
    console.log("data:", { email, password, name })
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      )
    }

    await connectDB()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      )
    }

    const newUser = await User.create({
      username: name,
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
