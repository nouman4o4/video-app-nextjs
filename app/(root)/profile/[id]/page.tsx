"use client"
import React, { useEffect, useState } from "react"
import { LinkIcon, Edit2, Share2 } from "lucide-react"
import Link from "next/link"
import MediaContainer from "@/app/components/MediaContainer"
import { IMediaClient, IUserClient } from "@/types/interfaces"
import {
  getCreatedMedia,
  getSavedMedia,
  getUserData,
} from "@/actions/userActions"
import { useParams } from "next/navigation"
import { useUserStore } from "@/store/useUserStore"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"created" | "saved">("created")
  const [userData, setUserData] = useState<IUserClient>()
  const [media, setMedia] = useState<IMediaClient[]>([])
  const [savedMedia, setSavedMedia] = useState<IMediaClient[]>([])
  const [createdLoading, setCreatedLoading] = useState(true)
  const [savedLoading, setSavedLoading] = useState(false)

  const params = useParams()
  const userId = Array.isArray(params.id) ? params.id[0] : params.id
  const { user, setUser } = useUserStore()
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return
      const [userDetails, created] = await Promise.all([
        getUserData(userId as string),
        getCreatedMedia(userId as string),
      ])
      setUser(userDetails!)
      setUserData(userDetails)
      setMedia(created)
      setCreatedLoading(false)
    }
    fetchData()
  }, [userId])

  const handleTabChange = async (tab: "created" | "saved") => {
    setActiveTab(tab)
    if (tab === "saved" && savedMedia.length === 0) {
      setSavedLoading(true)
      const saved = await getSavedMedia(userId as string)
      setSavedMedia(saved)
      setSavedLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className=" mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {userData?.firstname?.[0]} {userData?.lastname?.[0]}
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2 capitalize">
            {userData?.firstname} {userData?.lastname}
          </h1>

          <p className="text-gray-700 max-w-2xl mx-auto mb-4">
            {userData?.about}
          </p>

          <a
            href={`mailto:${userData?.email}`}
            className="inline-flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium mb-6"
          >
            <LinkIcon className="w-4 h-4" />
            <span>{userData?.email}</span>
          </a>

          {/* Stats */}
          <div className="flex items-center justify-center space-x-8 mb-6">
            {/* <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{media.length}</p>
              <p className="text-sm text-gray-600">Pins</p>
            </div> */}
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {userData?.followers?.length || 0}
              </p>
              <p className="text-sm text-gray-600">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {userData?.totalLikes}
              </p>
              <p className="text-sm text-gray-600">Likes</p>
            </div>
          </div>

          {/* Buttons */}
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
            {["created", "saved"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab as "created" | "saved")}
                className={`pb-4 px-2 font-semibold transition relative cursor-pointer ${
                  activeTab === tab
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 rounded-t"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Media Section */}
        <div>
          {activeTab === "created" ? (
            <MediaContainer media={media} isLoading={createdLoading} />
          ) : (
            <MediaContainer media={savedMedia} isLoading={savedLoading} />
          )}
        </div>
      </div>
    </div>
  )
}
