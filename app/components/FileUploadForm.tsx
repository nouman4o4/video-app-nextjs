"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Upload } from "lucide-react"

export default function UploadPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileType, setFileType] = useState<"image" | "video" | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)
    const url = URL.createObjectURL(selectedFile)
    setPreviewUrl(url)

    if (selectedFile.type.startsWith("image/")) setFileType("image")
    else if (selectedFile.type.startsWith("video/")) setFileType("video")
    else {
      setFileType(null)
      alert("Please select an image or video file.")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !file) {
      alert("Please fill all required fields.")
      return
    }

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("file", file)

    try {
      setLoading(true)
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Upload failed")

      alert("Uploaded successfully!")
      router.push("/") // redirect after success
    } catch (err) {
      console.error(err)
      alert("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-auto min-h-[calc(100vh-55px)] w-full flex items-center justify-center bg-gray-300 overflow-hidden py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-8 border border-gray-100"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Upload Your Media
        </h2>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a catchy title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write something about your post..."
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
          ></textarea>
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Upload File (Image or Video)
          </label>
          {!previewUrl && (
            <div className="w-full border-dashed border-2 border-gray-300 rounded-lg px-4 flex items-center justify-center py-4">
              <label
                htmlFor="file"
                className="text-center w-fit p-3 cursor-pointer"
              >
                <Upload className="size-12 text-gray-400 w-full text-center mb-2" />
                <span className="font-medium text-gray-600">
                  Choose a photo
                </span>

                <input
                  type="file"
                  name="file"
                  id="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="sr-only"
                  // className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                  // file:rounded-lg file:border-0 file:text-sm
                  // file:font-medium file:bg-gray-800 file:text-white
                  // hover:file:bg-gray-700 cursor-pointer"
                />
              </label>
            </div>
          )}
        </div>

        {previewUrl && (
          <div className="mb-5 rounded-xl overflow-hidden border border-gray-200 shadow-sm flex justify-center p-8">
            {fileType === "image" ? (
              <Image
                src={previewUrl}
                alt="preview"
                className="w-auto h-auto max-h-[400px] object-contain rounded-lg"
                width={400}
                height={400}
              />
            ) : (
              <video
                src={previewUrl}
                controls
                className="w-auto h-auto max-h-[400px] object-contain rounded-lg"
              />
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  )
}
