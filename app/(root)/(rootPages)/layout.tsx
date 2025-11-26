"use client"
import Sidebar from "@/app/components/Sidebar"
import { useUserStore } from "@/store/useUserStore"
import { useSession } from "next-auth/react"
import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore()
  const { data: session } = useSession()
  console.log({ user })

  return (
    <div>
      {user ? (
        <div>
          <Sidebar />
        </div>
      ) : (
        ""
      )}
      <div className={`${user ? "ml-20" : ""}`}>{children}</div>
    </div>
  )
}
