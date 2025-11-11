"use client"

import { useState } from "react"
import { Upload, LogOut, Menu, X, Sparkles, User, Search } from "lucide-react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { useUserStore } from "@/store/useUserStore"
import Image from "next/image"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()
  const { user } = useUserStore()

  const navLinks = [
    { name: "Upload", path: "/upload", icon: Upload },
    { name: "Logout", path: "/", icon: LogOut },
  ]

  return (
    <nav className="fixed max-w-7xl top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-all duration-300">
              N
            </div>
            <span className="text-xl font-semibold text-gray-800">
              Nomio<span className="text-pink-500">Pin</span>
            </span>
          </Link>

          {/* Center: Search Bar */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Search ideas, users, or collections..."
                className="w-full bg-gray-100 border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-400 focus:bg-white shadow-sm transition-all duration-200"
              />
              <Search className="absolute left-2 top-1/2 bottom-1/2 -translate-y-1/2 size-5 text-gray-500" />
            </div>
          </div>

          {/* Right: Links & Profile */}
          <div className="hidden md:flex items-center gap-3">
            {/* Profile */}
            {user && (
              <Link href={`/profile/${user._id}`}>
                <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
                  {user.profileImage?.imageUrl ? (
                    <Image
                      src={user.profileImage.imageUrl}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center text-white font-bold">
                      {user.firstname?.[0]}
                      {user.lastname?.[0]}
                    </div>
                  )}
                </div>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
          <div className="px-4 py-3 flex flex-col gap-2">
            {session &&
              navLinks.map((link, i) => {
                const Icon = link.icon
                return (
                  <Link
                    href={link.path}
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                )
              })}
            {user && (
              <Link
                href={`/profile/${user._id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                Profile
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
