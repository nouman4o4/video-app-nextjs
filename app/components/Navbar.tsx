import Link from "next/link"
import React from "react"

export default function Navbar() {
  const myPages = [
    {
      slug: "Upload",
      path: "/upload",
    },
    {
      slug: "Logout",
      path: "/logout",
    },
  ]
  return (
    <div className="w-full bg-black text-white flex items-center justify-between px-5">
      <div className="logo px-3 py-4 text-2xl font-bold">
        {" "}
        <Link href={"/"}> Upload With AI.</Link>
      </div>
      <div className="menu  flex gap-5 justify-center">
        {myPages.map((link, i) => (
          <Link
            href={link.path}
            key={i}
            className="font-bold border-1 boder-white rounded-lg p-2"
          >
            {link.slug}
          </Link>
        ))}
      </div>
    </div>
  )
}
