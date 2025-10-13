"use client" // This component must be a client component

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next"
import { useRef, useState } from "react"
import toast from "react-hot-toast"

interface FileUploadProps {
  onSuccess: (res: any) => void
  onProgress: (progress: number) => void
  fileType?: "image" | "video"
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | undefined>("")
  const [file, setFile] = useState<File | undefined>()

  //validation
  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please a valid video file")
      }
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("Video size must be less than 100 MB")
    }
    return true
  }

  const submitUpload = async () => {
    if (!file || !validateFile(file)) return
    setUploading(true)
    setError("")
    try {
      const authRes = await fetch("/api/auth/imagekit-auth")
      const auth = await authRes.json()
      const { signature, expire, token } = auth.authenticationParameters
      const uploadResponse = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
        signature,
        expire,
        token,
        onProgress: (event) => {
          if (event.lengthComputable && onprogress) {
            const percent = (event.loaded / event.total) * 100
            onProgress(Math.round(percent))
          }
        },

        // Abort signal to allow cancellation of the upload if needed.
        // abortSignal: abortController.signal,
      })
      console.log(uploadResponse)
      onSuccess(upload)
    } catch (error) {
      console.error("Upload failed")
      console.error(error)
      toast.error("Failed uploading the file")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg text-center">
      <h2 className="text-lg font-semibold mb-4 text-white">
        {fileType === "video" ? "Upload Video" : "Upload Image"}
      </h2>

      {/* File Input */}
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-400 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-blue-400 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0l-3.5 3.5M12 4l3.5 3.5"
          />
        </svg>
        <span className="text-sm text-blue-300">
          {file ? file.name : "Click or drag to upload"}
        </span>
        <input
          id="file-upload"
          type="file"
          accept={fileType === "video" ? "video/*" : "image/*"}
          onChange={(e) => setFile(e.target.files?.[0])}
          className="hidden"
        />
      </label>

      {/* Upload Button */}
      <button
        type="button"
        onClick={submitUpload}
        disabled={uploading || !file}
        className={`mt-5 w-full py-2 rounded-xl font-medium text-white transition ${
          uploading || !file
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>

      {/* Progress Bar */}
      {uploading && (
        <div className="mt-4">
          <progress
            className="w-full h-2 rounded-full overflow-hidden"
            value={50} // replace this with your progress state
            max={100}
          />
          <p className="text-xs text-gray-300 mt-1">Uploading...</p>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}
    </div>
  )
}

export default FileUpload
