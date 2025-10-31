"use client"
import React, { useEffect, useState } from "react"
import { LinkIcon, Edit2, Share2 } from "lucide-react"
import Link from "next/link"
import MediaContainer from "@/app/components/MediaContainer"
import { IMediaClient, IUserClient } from "@/types/interfaces"
import { apiClient } from "@/lib/api-client"
import { getUserData } from "@/actions/getUserData"

export default function PinterestProfile({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [activeTab, setActiveTab] = useState("created")
  const [userData, setUserData] = useState<IUserClient>()

  const tabs = [
    { id: "created", label: "Created", count: 127 },
    { id: "saved", label: "Saved", count: 1543 },
  ]

  const [media, setMedia] = useState<IMediaClient[]>([])
  const [loading, setLoading] = useState(true)

  const getUserDetails = async () => {
    const { id } = await params
    const userDetails = await getUserData(id)
    setUserData(userDetails)

    console.log("user Data : ", userDetails)
  }

  useEffect(() => {
    const fetchAllMedia = async () => {
      try {
        setLoading(true)
        const response: any = await apiClient.getMedia()
        if (response.status! === "500") {
          console.error("Could not fetch the media due to server error.")
          return
        }
        console.log("Fetch all media response: ", response)

        setMedia(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchAllMedia()
    getUserDetails()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Profile Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {userData?.firstname?.[0]} {userData?.lastname?.[0]}
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {userData?.firstname} {userData?.lastname}
          </h1>
          {/* <p className="text-gray-600 mb-1">@janedoe</p> */}

          <p className="text-gray-700 max-w-2xl mx-auto mb-4">
            {userData?.about}
          </p>

          <a
            href="#"
            className="inline-flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium mb-6"
          >
            <LinkIcon className="w-4 h-4" />
            <span>{userData?.email}</span>
          </a>

          {/* Stats */}
          <div className="flex items-center justify-center space-x-8 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">1,670</p>
              <p className="text-sm text-gray-600">Pins</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {userData?.followers}
              </p>
              <p className="text-sm text-gray-600">Followers</p>
            </div>
            {/* <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">892</p>
              <p className="text-sm text-gray-600">Following</p>
            </div> */}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-3">
            <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-full transition flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <Link
              href={"/profile/edit"}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition flex items-center space-x-2"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit profile</span>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex justify-center space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 font-semibold transition relative ${
                  activeTab === tab.id
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 rounded-t"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Boards Grid */}
        <div>
          {activeTab === "created" ? (
            <div className="created_content">
              <h3 className="text-2xl text-gray-700 font-medium">
                Created Content
              </h3>
              <MediaContainer media={media} isLoading={loading} />
            </div>
          ) : (
            <div className="saved_content ">
              <h3 className="text-2xl text-gray-700 font-medium">
                Saved Content
              </h3>
              <MediaContainer media={media} isLoading={loading} />
            </div>
          )}{" "}
        </div>

        {/* Create New Board */}
        <div className="mt-6 text-center">
          <button className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-full transition">
            + Create new board
          </button>
        </div>
      </div>
    </div>
  )
}
