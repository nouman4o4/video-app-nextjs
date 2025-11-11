"use client"

import { useState } from "react"
import Link from "next/link"

export default function PinterestSidebar() {
  const [activeItem, setActiveItem] = useState("home")

  const menuItems = [
    {
      id: "logo",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M0 12c0 5.123 3.211 9.497 7.73 11.218-.11-.937-.227-2.482.025-3.566.217-.932 1.401-5.938 1.401-5.938s-.357-.715-.357-1.774c0-1.66.962-2.9 2.161-2.9 1.02 0 1.512.765 1.512 1.682 0 1.025-.653 2.557-.99 3.978-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.726a.36.36 0 0 1 .083.343c-.091.378-.293 1.189-.332 1.355-.053.218-.173.265-.4.159-1.492-.694-2.424-2.875-2.424-4.627 0-3.769 2.737-7.229 7.892-7.229 4.144 0 7.365 2.953 7.365 6.899 0 4.117-2.595 7.431-6.199 7.431-1.211 0-2.348-.63-2.738-1.373 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12" />
        </svg>
      ),
      href: "/",
      label: "Pinterest",
      isLogo: true,
    },
    {
      id: "home",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 9.25c-2.347 0-4.25 1.903-4.25 4.25s1.903 4.25 4.25 4.25 4.25-1.903 4.25-4.25S14.347 9.25 12 9.25zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.478 22 2 17.522 2 12S6.478 2 12 2s10 4.478 10 10-4.478 10-10 10z" />
        </svg>
      ),
      href: "/",
      label: "Home",
    },
    {
      id: "explore",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M10 16.5c-3.584 0-6.5-2.916-6.5-6.5S6.416 3.5 10 3.5s6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5zm10.856 3.944l-4.806-4.806A8.456 8.456 0 0018.5 10c0-4.687-3.813-8.5-8.5-8.5S1.5 5.313 1.5 10s3.813 8.5 8.5 8.5a8.456 8.456 0 005.638-2.45l4.806 4.806a1.5 1.5 0 102.122-2.122z" />
        </svg>
      ),
      href: "/explore",
      label: "Explore",
    },
    {
      id: "create",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M22 10h-8V2a2 2 0 00-4 0v8H2a2 2 0 000 4h8v8a2 2 0 004 0v-8h8a2 2 0 000-4" />
        </svg>
      ),
      href: "/create",
      label: "Create",
    },
    {
      id: "notifications",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 24c1.66 0 3-1.34 3-3H9c0 1.66 1.34 3 3 3zm7-10.83c1.58 1.52 2.67 3.55 3 5.83H2c.33-2.28 1.42-4.31 3-5.83V7c0-3.87 3.13-7 7-7s7 3.13 7 7v6.17z" />
        </svg>
      ),
      href: "/notifications",
      label: "Notifications",
    },
    {
      id: "messages",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M18 12.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      ),
      href: "/messages",
      label: "Messages",
    },
    {
      id: "profile",
      icon: (
        <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-12a3 3 0 110-6 3 3 0 010 6zm0 2c-3 0-9 1.5-9 4.5V19h18v-2.5c0-3-6-4.5-9-4.5z" />
          </svg>
        </div>
      ),
      href: "/profile",
      label: "Profile",
    },
    {
      id: "settings",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm3-13a1 1 0 01-1 1h-1v1a1 1 0 01-2 0v-1h-1a1 1 0 010-2h1V7a1 1 0 012 0v1h1a1 1 0 011 1zm-3 4a3 3 0 100 6 3 3 0 000-6z" />
        </svg>
      ),
      href: "/settings",
      label: "Settings",
    },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-[80px] bg-white border-r border-gray-200 flex flex-col items-center py-2 z-50">
      {menuItems.map((item) => (
        <Link
          key={item.id}
          href={item.href}
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
