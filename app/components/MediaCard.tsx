import { IMediaClient } from "@/types/interfaces"
import { Video, Image } from "@imagekit/next"
import { Bookmark, Download, Heart } from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"

export default function MediaCard({ item }: { item: IMediaClient }) {
  const [IsLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleLike = () => {
    setIsLiked(!IsLiked)
  }
  const handleSave = () => {
    setIsSaved(!isSaved)
  }
  const handleDownload = () => {}
  return (
    <div
      key={item._id}
      className="break-inside-avoid relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 group"
    >
      <Link href={`/media/${item._id}`} className="z-20">
        {item.fileType === "image" ? (
          <Image
            src={item.mediaUrl}
            width={500}
            height={500}
            alt={item.title || "media"}
            className="w-full h-auto object-cover"
          />
        ) : (
          <Video
            urlEndpoint={item.mediaUrl}
            src={item.mediaUrl}
            width={500}
            height={500}
            className="w-full h-auto object-cover rounded-t-2xl"
          />
        )}
      </Link>

      {item.fileType === "video" ? (
        <div className="video-duration absolute top-2 left-2 group-hover:opacity-0 opacity-100  ">
          <p className="p-1 rounded-lg bg-gray-200/70 text-gray-600 text-[10px]">
            0:08
          </p>
        </div>
      ) : (
        ""
      )}

      <div className="buttons-overlay-div absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-100 bg-black/10 cursor-pointer pointer-events-none">
        <div className="w-full h-full flex flex-col justify-between items-end p-2 pointer-events-none z-20">
          <div className="w-fit pointer-events-auto">
            <button className="p-2 rounded-full bg-gray-100 text-gray-700 hover:scale-105 scale-95 transition-all duration-100 cursor-pointer">
              <Download className="size-5" />
            </button>
          </div>
          <div className="w-full flex items-center justify-between pointer-events-auto">
            <button
              onClick={handleSave}
              className={`p-3 rounded-full hover:scale-105 scale-95 transition-all duration-100 cursor-pointer ${
                isSaved
                  ? "text-gray-100  bg-yellow-700"
                  : "bg-gray-100  text-gray-700"
              }`}
            >
              <Bookmark className="size-5" />
            </button>
            <button
              onClick={handleLike}
              className={`p-2 rounded-full hover:scale-105 scale-95 transition-all duration-100 cursor-pointer ${
                IsLiked
                  ? "text-gray-100 bg-red-600"
                  : "bg-gray-100 text-red-600"
              }`}
            >
              <Heart className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
