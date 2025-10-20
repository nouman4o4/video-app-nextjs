"use client"

import React, { useEffect, useState } from "react"
import VideoContainer from "./components/VideoContainer"
import { apiClient } from "@/lib/api-client"
import { IMediaClient } from "@/types/interfaces"

export default function page() {
  const [media, setMedia] = useState<IMediaClient[]>([])

  useEffect(() => {
    const fetchAllMedia = async () => {
      try {
        const response: any = await apiClient.getMedia()
        if (response.status! === "500") {
          console.error("Could not fetch the media due to server error.")
          return
        }
        console.log("Fetch all media response: ", response)

        setMedia(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchAllMedia()
  }, [])

  return (
    <div className="w-full min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 uppercase my-5">
        Explore all the videos
      </h1>
      <div className="h-full ">
        <VideoContainer videos={media ?? []} />
      </div>
    </div>
  )
}
