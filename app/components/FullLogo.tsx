import React from "react"
import NLogo from "./NLogo"
import Link from "next/link"

export default function FullLogo() {
  return (
    <Link href={"/"}>
      <div className="flex items-center text-xl font-bold capitalize p-1 px-3 rounded-lg bg-gray-100 shadow-lg">
        <p className="">Pi</p> <NLogo /> <p className="">terest</p>
      </div>
    </Link>
  )
}
