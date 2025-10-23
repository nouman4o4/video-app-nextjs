import { IMediaClient } from "@/types/interfaces"
import { Image, Video } from "@imagekit/next"
import Link from "next/link"
import React from "react"
export default function VideoContainer({ media }: { media: IMediaClient[] }) {
  return (
    <div className="w-full min-h-[70vh] bg-gray-100 rounded-xl md:p-8 p-4 md:">
      {" "}
      <div>
        {" "}
        {media.length > 0 ? (
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-4 xl:columns-5 gap-4  md:gap-6 space-y-4 md:space-y-6">
            {" "}
            {media.map((item, i) => (
              <div
                key={i}
                className="break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {" "}
                {item.fileType === "image" ? (
                  <Image
                    src={item.mediaUrl}
                    width={500}
                    height={500}
                    alt="Picture of the author"
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
                {/* <div className="details p-3">
                  <div className="title">
                    <p className="font-semibold">{item.title}</p>{" "}
                  </div>
                  <div className="desc">
                    <p className="text-sm text-gray-700">
                      {item.description ??
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit."}{" "}
                    </p>
                  </div>
                  <div className="author flex gap-2 mt-3 items-center">
                    <div className="profile rounded-full size-8 bg-black"></div>{" "}
                    <div className="name text-sm font-bold text-gray-600">
                      User jhon doe
                    </div>
                  </div>
                </div> */}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            {" "}
            <p className="">Seems no video is uploaded yet</p>{" "}
            <button className="p-3 px-4 my-3 rounded bg-gray-300 font-semibold ">
              {" "}
              <Link href={"/upload"}>Upload one?</Link>{" "}
            </button>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  )
}
