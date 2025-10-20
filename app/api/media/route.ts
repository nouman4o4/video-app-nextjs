import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import { IMedia, Media } from "@/models/media.model"
import { mediaSchema } from "@/schemas/media.schema"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const media = await Media.find().sort({ createdAt: -1 }).lean()
    if (!media || media.length === 0) {
      return NextResponse.json(
        { message: "Seemse like no media is available", data: media },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { data: media, success: true, message: "opration successfull" },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        error: "Failed to fetch videos",
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized request" },
        { status: 403 }
      )
    }
    const body: IMedia = await request.json()

    const zodValidationResult = mediaSchema.safeParse(body)

    if (!zodValidationResult.success) {
      console.log({ body })
      return NextResponse.json(
        {
          success: false,
          error: zodValidationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }
    await connectDB()
    const data = {
      ...body,
      controls: body?.controles ?? true,
      transformation: {
        height: 1930,
        width: 1080,
        qualitry: body.transformation ?? 100,
      },
    }
    const newMedia = await Media.create(data)
    return NextResponse.json(
      { success: true, message: "Media saved successfully", newMedia },
      { status: 202 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create a video" },
      { status: 500 }
    )
  }
}
