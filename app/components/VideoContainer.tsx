import { IVideo } from "@/types/interfaces"
import Link from "next/link"
import React from "react"

export default function VideoContainer({ videos }: { videos: IVideo[] }) {
  return (
    <div className="w-full min-h-[70vh] bg-gray-100 rounded-xl p-8">
      <div>
        {true ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <div className="p-3 rounded-2xl bg-gray-50 h-[320px] shadow-lg">
                  <div className="thumbnail w-full h-3/5 bg-red-200 rounded-xl"></div>
                  <div className="details py-3">
                    <div className="title">
                      <p className="font-semibold">Video title</p>
                    </div>
                    <div className="desc">
                      <p className="text-sm text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </p>
                    </div>
                    <div className="author flex gap-2 mt-3 items-center">
                      <div className="profile rounded-full size-8 bg-black"></div>
                      <div className="name text-sm font-bold text-gray-600">
                        User jhon doe
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="">Seems no video is uploaded yet</p>
            <button className="p-3 px-4 my-3 rounded bg-gray-300 font-semibold ">
              <Link href={"/upload"}>Upload one?</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
