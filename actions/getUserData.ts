"use server"

import { User } from "@/models/user.model"
import { IUserClient } from "@/types/interfaces"
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
