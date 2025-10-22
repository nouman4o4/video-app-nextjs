"use client"
import { useState } from "react"

export default function MediaUploadForm() {
  const [fileType, setFileType] = useState<"image" | "video" | "">("")
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fileType || !file) return alert("Select file type and file first!")
    console.log({ fileType, file })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-md mx-auto bg-gray-900 text-white rounded-xl"
    >
      <h2 className="text-xl font-semibold mb-4">Upload Media</h2>

      {/* Choose file type */}
      <select
        value={fileType}
        onChange={(e) => setFileType(e.target.value as "image" | "video")}
        className="w-full mb-3 p-2 bg-gray-800 border border-gray-700 rounded"
      >
        <option value="">Select Type</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>

      {/* Upload file */}
      {fileType && (
        <input
          type="file"
          accept={fileType === "image" ? "image/*" : "video/*"}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full mb-4"
        />
      )}

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 rounded w-full py-2"
      >
        Upload
      </button>
    </form>
  )
}
