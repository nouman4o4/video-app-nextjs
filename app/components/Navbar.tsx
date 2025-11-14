"use client"

import { useState } from "react"
import {
  Upload,
  LogOut,
  Menu,
  X,
  Sparkles,
  User,
  Search,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { useUserStore } from "@/store/useUserStore"
import Image from "next/image"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const { data: session } = useSession()
  const { user } = useUserStore()

  const navLinks = [
    { name: "Upload", path: "/upload", icon: Upload },
    { name: "Logout", path: "/", icon: LogOut },
  ]

  return (
    <nav className="fixed w-full top-0 left-0 right-0 pl-20 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="w-full h-full p-4 flex gap-5 items-center">
        {/* Serach */}
        <div className="grow group h-full group-focus-within:ring-3 ring-blue-300  bg-gray-200 relative pl-5 py-3 rounded-lg overflow-hidden">
          <Search className="absolute left-3 size-5 top-1/2 -translate-y-1/2 text-gray-700" />
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            type="search"
            name=""
            id=""
            className="w-full outline-none pl-5 text-gray-600"
            placeholder="Search"
          />
          <div className="absolute top-0 right-0 h-full flex items-center">
            {searchValue ? (
              <X
                className="mr-2 size-7 cursor-pointer text-gray-700"
                onClick={() => setSearchValue("")}
              />
            ) : (
              ""
            )}
            <div className="flex px-3 bg-black h-full text-white items-center justify-center cursor-pointer">
              <Search />
              {/* <span>Search</span> */}
            </div>
          </div>
        </div>
        {/* Right User  */}
        <div className="flex items-center gap-1">
          <div className="size-14 rounded-full overflow-hidden">
            {user?.profileImage?.imageUrl ? (
              <Image
                className="w-full object-cover"
                src={user.profileImage.imageUrl}
                alt="UserProfileImage"
                width={100}
                height={100}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {user?.firstname?.[0]} {user?.lastname?.[0]}
              </div>
            )}
          </div>
          <button className="cursor-pointer">
            <ChevronDown className="size-5 text-gray-700" />
          </button>
        </div>
      </div>
    </nav>
  )
}
