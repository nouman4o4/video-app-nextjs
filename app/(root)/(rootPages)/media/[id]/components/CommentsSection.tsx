import React from "react"

export default function CommentsSection() {
  return (
    <div className="mb-8 py-4  border-gray-300">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Comments</h2>

      {/* Add Comment Input */}
      <div className="flex items-center mb-6 space-x-2">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition">
          Add
        </button>
      </div>

      {/* Dummy Comments */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
            A
          </div>
          <div>
            <p className="text-gray-900 font-medium">Alice</p>
            <p className="text-gray-700">This is amazing! 😍</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
            B
          </div>
          <div>
            <p className="text-gray-900 font-medium">Bob</p>
            <p className="text-gray-700">I love the design of this profile.</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
            C
          </div>
          <div>
            <p className="text-gray-900 font-medium">Charlie</p>
            <p className="text-gray-700">Great content! Keep it up 👍</p>
          </div>
        </div>
      </div>
    </div>
  )
}
