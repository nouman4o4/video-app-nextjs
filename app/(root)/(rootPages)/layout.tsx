import Sidebar from "@/app/components/Sidebar"
import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="ml-20">{children}</div>
    </div>
  )
}
