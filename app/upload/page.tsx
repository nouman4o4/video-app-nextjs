"use client"

import { useState } from "react"

import { toast } from "react-hot-toast"
import FileUpload from "../components/FileUpload"
import { apiClient } from "@/lib/api-client"
import { useSession } from "next-auth/react"

export default function UploadPage() {
  const [progress, setProgress] = useState(0)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const { data: session, status } = useSession()
  console.log({ session })

  const saveVideoInDb = async (videoDetails: any) => {
    const {
      name,
      thumbnailUrl,
      height,
      url,
      versionInfo,
      width,
      fileId,
      description,
      fileType,
    } = videoDetails
    console.log({ videoDetails })

    try {
      const response = await apiClient.createMedia({
        title: name,
        description:
          description ??
          "This is a dummy description in case the real one is not available",
        mediaUrl: url,
        thumbnailUrl,
        fileType,
        uploadedBy: "userId"!,
        transformation: {
          height,
          width,
        },
      })
      console.log(`"Save ${fileType} in db, response: ", ${response}`)
    } catch (error) {
      console.error("Failed to post video, error: ", error)
    }
  }

  // When upload is successful
  const handleSuccess = (res: any) => {
    console.log("✅ Upload success:", res)
    setUploadedUrl(res.url) // ImageKit returns a URL field
    toast.success("File uploaded successfully!")
    saveVideoInDb(res)
  }

  // When upload progress updates
  const handleProgress = (percent: number) => {
    setProgress(percent)
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Upload your image</h1>

      {/* ✅ FileUpload component */}
      <FileUpload onSuccess={handleSuccess} onProgress={handleProgress} />

      <div className="mt-4">
        <p>Progress: {progress}%</p>
        <progress value={progress} max={100} className="w-full"></progress>
      </div>

      {uploadedUrl && (
        <div className="mt-4">
          <p className="text-green-400">Uploaded Image:</p>
          <img
            src={uploadedUrl}
            alt="Uploaded file"
            className="rounded-lg mt-2 border border-gray-700"
          />
        </div>
      )}
    </div>
  )
}
