"use client"

import Image from "next/image"
import { useState } from "react"
import { Heart, Share2, MessageCircle } from "lucide-react"
import { IMediaClient } from "@/types/interfaces"

export default function MediaComponent({
  mediaData,
}: {
  mediaData: IMediaClient
}) {
  if (!mediaData) {
    return (
      <div className="text-center mt-20 text-gray-500">Media not found</div>
    )
  }
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center px-4 py-8">
      {/* Container */}
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
        {/*Header */}
        <div className="flex items-center gap-3 p-5 border-b border-gray-100">
          <Image
            src={mediaData.mediaUrl}
            alt="media data owner"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">Jhon doe</h3>
            <p className="text-sm text-gray-500">2 days ago</p>
          </div>
        </div>

        {/* Media Preview */}
        <div className="relative bg-black flex justify-center items-center">
          {mediaData.fileType === "image" ? (
            <Image
              src={mediaData.mediaUrl}
              alt={mediaData.title}
              width={1000}
              height={600}
              className="w-full h-auto object-contain max-h-[70vh]"
              priority
            />
          ) : (
            <video
              src={mediaData.mediaUrl}
              controls
              className="w-full max-h-[70vh] object-contain bg-black"
            />
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {mediaData.title}
          </h1>
          <p className="text-gray-600 text-base leading-relaxed mb-5">
            {mediaData.description}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-6">
              {/* Like */}
              <button className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition">
                <Heart
                  className={
                    'w-6 h-6 "fill-red-500 stroke-red-500" : "stroke-gray-600'
                  }
                />
                <span className="text-sm font-medium">{0}</span>
              </button>

              {/* Comment */}
              <button className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition">
                <MessageCircle className="w-6 h-6 stroke-gray-600" />
                <span className="text-sm font-medium"></span>
              </button>

              {/* Share */}
              <button className="flex items-center gap-2 text-gray-700 hover:text-green-500 transition">
                <Share2 className="w-6 h-6 stroke-gray-600" />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="w-full max-w-3xl mt-6 bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Comments</h3>
        <div className="space-y-4">
          {/* Dummy comments */}
          {[1, 2, 3].map((id) => (
            <div key={id} className="flex gap-3">
              {/* <Image
                src={`https://randomuser.me/api/portraits/women/${id + 10}.jpg`}
                alt="avatar"
                width={36}
                height={36}
                className="rounded-full object-cover"
              /> */}
              <div className="bg-gray-50 rounded-lg px-3 py-2 flex-1">
                <p className="text-sm font-medium text-gray-800">User {id}</p>
                <p className="text-sm text-gray-600">
                  This is such a beautiful shot!
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Comment input */}
        <div className="flex items-center gap-3 mt-5">
          {/* <Image
            src="https://randomuser.me/api/portraits/men/50.jpg"
            alt="you"
            width={36}
            height={36}
            className="rounded-full object-cover"
          /> */}
          <input
            type="text"
            placeholder="Write a comment..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-300 outline-none text-sm"
          />
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition text-sm font-medium">
            Post
          </button>
        </div>
      </div>
    </div>
  )
}
