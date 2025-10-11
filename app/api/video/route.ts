import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import { IVideo, Video } from "@/models/video.model"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const videos = await Video.find().sort({ createdAt: -1 }).lean()
    if (!videos || videos.length === 0) {
      return NextResponse.json([], { status: 200 })
    }

    return NextResponse.json(videos)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        error: "Failed to fetch videos",
      },
      { status: 5000 }
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
    await connectDB()

    const body: IVideo = await request.json()
    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }
    const videoData = {
      ...body,
      controls: body?.controles ?? true,
      transformation: {
        height: 1930,
        width: 1080,
        qualitry: body.transformation ?? 100,
      },
    }
    const newVideo = await Video.create(videoData)
    return NextResponse.json(newVideo)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create a video" },
      { status: 500 }
    )
  }
}
