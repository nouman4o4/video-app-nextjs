"use client"

import { useState } from "react"
import {
  Heart,
  Share2,
  MessageCircle,
  Download,
  MoreHorizontal,
  Bookmark,
  ExternalLink,
} from "lucide-react"
import { IMediaClient } from "@/types/interfaces"
import Image from "next/image"
import { Video } from "@imagekit/next"
import CommentsSection from "./CommentsSection"

export default function MediaComponent({
  mediaData,
}: {
  mediaData: IMediaClient
}) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [likes, setLikes] = useState(234)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  if (!mediaData) {
    return (
      <div className="text-center mt-20 text-gray-500">Media not found</div>
    )
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-12">
      {/* Container with glassmorphism effect */}
      <div className="w-full max-w-7xl">
        <div className="w-full p-4 md:p-6 grid md:grid-cols-2 gap-8 items-start bg-white rounded-3xl shadow-lg">
          {/* Media Section - Left Side */}
          <div className="relative group ">
            <div className="relative w-full pr-3 rounded-2xl overflow-hidden mx-auto">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

              {mediaData.fileType === "image" ? (
                <Image
                  src={mediaData.mediaUrl}
                  alt={mediaData.title}
                  className="w-full rounded md:rounded-xl "
                  width={mediaData.transformation?.width}
                  height={mediaData.transformation?.height}
                />
              ) : (
                <Video
                  src={mediaData.mediaUrl}
                  controls
                  className="w-full h-auto object-cover rounded-3xl"
                />
              )}

              {/* Floating action button */}
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md p-3 rounded-full border-1 border-gray-300 shadow-lg hover:scale-110 transition-transform duration-200"
              >
                <Bookmark
                  className={`w-5 h-5 transition-colors ${
                    isSaved ? "fill-red-500 stroke-red-500" : "stroke-gray-700"
                  }`}
                />
              </button>
            </div>{" "}
          </div>

          {/* Content Section - Right Side */}
          <div className="flex flex-col gap-6">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
              <div>Buttons</div>

              <button className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">
                Follow
              </button>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {mediaData.title}
              </h1>

              {/* Description */}
              <p className="text-gray-800 leading-relaxed">
                {mediaData.description}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  {mediaData.title.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Creator Name</p>
                  <p className="text-xs text-gray-500">2.3K followers</p>
                </div>
              </div>
            </div>
            {/* Comments section */}
            <CommentsSection />
          </div>
        </div>
      </div>
    </div>
  )
}
