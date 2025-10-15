"use client"

import React, { useEffect, useState } from "react"
import VideoContainer from "./components/VideoContainer"
import { apiClient } from "@/lib/api-client"

export default function page() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        const response: any = await apiClient.getVideos()
        if (response.status! === "500") {
          console.error("Could not fetch videos due to server error.")
          return
        }
        setVideos(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchAllVideos()
  }, [])

  return (
    <div className="w-full min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 uppercase my-5">
        Explore all the videos
      </h1>
      <div className="h-full ">
        <VideoContainer videos={videos} />
      </div>
    </div>
  )
}
