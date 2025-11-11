"use client"

import { useState } from "react"

export default function Label() {
  const [hide, setHide] = useState(false)
  if (hide) return
  return (
    <div
      onClick={() => setHide(true)}
      className="p-8 cursor-pointer fixed bottom-5 left-5 border-2 border-yellow-500 h-20 bg-white rounded-xl flex items-center justify-center shadow-xl  "
    >
      <p className="text-center text-xl font-bold text-yellow-400">
        This project is in progress
      </p>
    </div>
  )
}
