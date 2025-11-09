"use client"

import { useState } from "react"
import { Upload, LogOut, Menu, X, Sparkles, User } from "lucide-react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { useUserStore } from "@/store/useUserStore"
import Image from "next/image"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const { user } = useUserStore()
  const myPages = [
    {
      slug: "Upload",
      path: "/upload",
      icon: Upload,
    },
    {
      slug: "Logout",
      path: "/",
      icon: LogOut,
    },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              Upload With AI
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {myPages.map((link, i) => {
              const Icon = link.icon
              return (
                <Link
                  onClick={async () =>
                    link.slug === "Logout" && (await signOut())
                  }
                  href={link.path}
                  key={i}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 group"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>{link.slug}</span>
                </Link>
              )
            })}

            {/* Profile Icon */}
            <Link href={`/profile/${session?.user._id}`}>
              <div className="ml-2 w-10 h-10 rounded-full overflow-hidden">
                {user?.profileImage?.imageUrl ? (
                  <Image
                    className="w-full object-cover"
                    src={user.profileImage.imageUrl}
                    alt="UserProfileImage"
                    width={60}
                    height={60}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center text-white hover:scale-105 transition-all duration-200">
                    {user?.firstname?.[0]} {user?.lastname?.[0]}
                  </div>
                )}
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 space-y-2 bg-white/95 backdrop-blur-xl border-t border-gray-200/50">
          {myPages.map((link, i) => {
            const Icon = link.icon
            return (
              <Link
                href={link.path}
                key={i}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span>{link.slug}</span>
              </Link>
            )
          })}

          {/* Mobile Profile Link */}
          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-xl font-medium shadow-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
