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
    <div className="min-h-screen w-full bg-neutral-50 flex flex-col items-center px-4 py-12">
      {/* Container with glassmorphism effect */}
      <div className="w-full max-w-7xl">
        <div className="w-full grid md:grid-cols-2 gap-8 items-start">
          {/* Media Section - Left Side */}
          <div className="relative group">
            <div className="bg-white w-full mx-auto rounded-none md:rounded-3xl p-4 md:p-8 overflow-hidden md:shadow-xl md:hover:shadow-2xl transition-all duration-500">
              <div className="relative w-fit h-fit rounded-xl overflow-hidden mx-auto">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

                {mediaData.fileType === "image" ? (
                  <img
                    src={mediaData.mediaUrl}
                    alt={mediaData.title}
                    className="w-full h-auto max-h-[70vh] md:max-h-[80vh] object-contain rounded md:rounded-xl "
                  />
                ) : (
                  <video
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
                      isSaved
                        ? "fill-red-500 stroke-red-500"
                        : "stroke-gray-700"
                    }`}
                  />
                </button>
              </div>{" "}
            </div>
          </div>

          {/* Content Section - Right Side */}
          <div className="flex flex-col gap-6">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  {mediaData.title.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Creator Name</p>
                  <p className="text-xs text-gray-500">2.3K followers</p>
                </div>
              </div>
              <button className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">
                Follow
              </button>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 leading-tight">
                {mediaData.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Posted 2 days ago</span>
                <span>•</span>
                <span>1.2K views</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {mediaData.description}
            </p>

            {/* Engagement Stats */}
            <div className="flex items-center gap-8 py-4 border-y border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 fill-red-500 stroke-red-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{likes}</p>
                  <p className="text-xs text-gray-500">Likes</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 stroke-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">48</p>
                  <p className="text-xs text-gray-500">Comments</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <Share2 className="w-5 h-5 stroke-green-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">92</p>
                  <p className="text-xs text-gray-500">Shares</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-medium transition-all duration-200 ${
                  isLiked
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-white" : ""}`} />
                <span>{isLiked ? "Liked" : "Like"}</span>
              </button>

              <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-all duration-200">
                <Download className="w-5 h-5" />
                <span>Save</span>
              </button>

              <button className="flex items-center justify-center p-3.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all duration-200">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Link Preview */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <ExternalLink className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Source
                  </p>
                  <p className="text-sm text-gray-900 truncate font-medium">
                    example.com/media
                  </p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors cursor-pointer">
                #design
              </span>
              <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium hover:bg-pink-200 transition-colors cursor-pointer">
                #inspiration
              </span>
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors cursor-pointer">
                #creative
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
