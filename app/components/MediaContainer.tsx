import { IMediaClient } from "@/types/interfaces"
import { Image, Video } from "@imagekit/next"
import Link from "next/link"
import React from "react"

export default function MediaGallery({ media }: { media: IMediaClient[] }) {
  return (
    <div className="w-full min-h-[70vh] bg-gray-100 rounded-xl p-8">
      {media.length > 0 ? (
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-6">
          {media.map((item, i) => (
            <div
              key={i}
              className="break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative group">
                {item.fileType === "image" ? (
                  <Image
                    src={item.mediaUrl}
                    alt={item.title}
                    width={250}
                    height={250}
                    className="w-full h-auto  object-cover "
                  />
                ) : (
                  <video
                    src={item.mediaUrl}
                    controls
                    className="w-full h-auto object-cover rounded-t-2xl"
                  />
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 truncate">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                  {item.description ??
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <div className="size-8 rounded-full bg-gray-300"></div>
                  <span className="text-sm font-medium text-gray-700">
                    {item.uploadedBy ?? "Anonymous"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-700">Seems no media is uploaded yet</p>
          <Link href="/upload">
            <button className="p-3 px-5 mt-4 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-700 transition">
              Upload one?
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
