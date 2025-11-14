"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Home, ImagePlusIcon, Plus, User, User2 } from "lucide-react"
import { useUserStore } from "@/store/useUserStore"
import { useSession } from "next-auth/react"

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("home")
  const { user } = useUserStore()
  const { data: session } = useSession()

  const menuItems = [
    {
      id: "logo",
      icon: (
        <>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-all duration-300">
            N
          </div>
        </>
      ),
      href: "/",
      label: "Pinterest",
      isLogo: true,
    },
    {
      id: "home",
      icon: <Home />,
      href: "/",
      label: "Home",
    },
    // {
    //   id: "explore",
    //   icon: (
    //     <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    //       <path d="M10 16.5c-3.584 0-6.5-2.916-6.5-6.5S6.416 3.5 10 3.5s6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5zm10.856 3.944l-4.806-4.806A8.456 8.456 0 0018.5 10c0-4.687-3.813-8.5-8.5-8.5S1.5 5.313 1.5 10s3.813 8.5 8.5 8.5a8.456 8.456 0 005.638-2.45l4.806 4.806a1.5 1.5 0 102.122-2.122z" />
    //     </svg>
    //   ),
    //   href: "/explore",
    //   label: "Explore",
    // },
    {
      id: "create",
      icon: <ImagePlusIcon />,
      href: "/upload",
      label: "Create",
    },
    {
      id: "notifications",
      icon: <Bell />,
      href: "#",
      label: "Notifications",
    },
    {
      id: "profile",
      icon: <User2 />,
      href: user ? "/profile/" + user?._id! : "#",
      label: "Profile",
    },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-[80px] bg-white border-r border-gray-200 flex flex-col gap-6 items-center py-2 z-50">
      {menuItems.map((item) => (
        <Link
          key={item.id}
          href={
            !user && (item.id === "profile" || item.id === "create")
              ? "/login"
              : item.href
          }
          onClick={() => setActiveItem(item.id)}
          className={`
            w-12 h-12 flex items-center justify-center rounded-full
            transition-all duration-200 my-1
            ${item.isLogo ? "text-red-600 hover:bg-red-50 mb-2" : ""}
            ${
              activeItem === item.id && !item.isLogo
                ? "bg-black text-white"
                : !item.isLogo
                ? "text-gray-700 hover:bg-gray-100"
                : ""
            }
          `}
          title={item.label}
        >
          {item.icon}
        </Link>
      ))}
    </aside>
  )
}
