"use server"

import { connectDB } from "@/lib/db"
import { Media } from "@/models/media.model"
import { User } from "@/models/user.model"
import { IMediaClient, IUserClient } from "@/types/interfaces"
import mongoose from "mongoose"

export const getUserData = async (id: string) => {
  if (!id) return
  try {
    if (!mongoose.isValidObjectId(id)) {
      console.log("Invalid userId for getting user deta")
      return
    }
    const user = await User.findById(id).select("-password").lean()
    if (!user) {
      console.log("User not found with given id")
      return
    }
    const parseData: IUserClient = JSON.parse(JSON.stringify(user))
    return parseData
  } catch (error) {
    console.error(error)
  }
}

// Update a user
export const updateUser = async (userId: string, userData: any) => {
  try {
    await connectDB()
    if (!mongoose.isValidObjectId(userId)) {
      throw new Error("User_id is invalid")
    }
    const user: IUserClient | null = await User.findByIdAndUpdate(
      userId,
      { userData },
      { new: true }
    ).lean<IUserClient>()

    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    throw error
  }
}

// get user created media

export const getCreatedMedia = async (id: string) => {
  if (!id) return
  try {
    if (!mongoose.isValidObjectId(id)) {
      console.log("The provided user_id is not valid")
      return
    }
    await connectDB()

    const media = await Media.find({ uploadedBy: id }).lean<
      IMediaClient | any[]
    >()

    return JSON.parse(JSON.stringify(media)) || []
  } catch (error) {
    console.log("Error fetching user media: ", error)
  }
}

export const getSavedMedia = async (userId: string) => {
  if (!userId || !mongoose.isValidObjectId(userId)) return null

  try {
    await connectDB()

    const user = await User.findById(userId)
      .select("savedMedia")
      .populate({
        path: "savedMedia",
        model: "Media",
        options: { sort: { createdAt: -1 } },
      })
      .lean<{ savedMedia: any[] }>()

    return (
      (user?.savedMedia && JSON.parse(JSON.stringify(user?.savedMedia))) || []
    )
  } catch (err) {
    console.error("Error fetching saved media:", err)
    return null
  }
}
