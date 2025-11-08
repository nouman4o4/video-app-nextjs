import { IMediaClient } from "@/types/interfaces"
import { Video } from "@imagekit/next"
import { Link } from "lucide-react"
import Image from "next/image"
import React from "react"

export default function MediaCard({
  mediaDetails: item,
}: {
  mediaDetails: IMediaClient
}) {
  return (
    <div
      key={item._id}
      className="break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <Link href={`/media/${item._id}`}>
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
            controls
            width={500}
            height={500}
            className="w-full h-auto object-cover rounded-t-2xl"
          />
        )}
      </Link>
    </div>
  )
}
