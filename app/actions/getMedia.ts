"use server"

import { connectDB } from "@/lib/db"
import { Media } from "@/models/media.model"

export async function getMedia(id: string) {
  try {
    await connectDB()
    const media = await Media.findById(id).lean()
    if (!media) return null
    return JSON.parse(JSON.stringify(media))
  } catch (error) {
    console.error("Media Fetch Error: ", error)
    throw new Error("Failed to load media")
  }
}
