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

      const uploadResponse = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
        onProgress: (event) => {
          if (event.lengthComputable && onprogress) {
            const percent = (event.loaded / event.total) * 100
            onProgress(Math.round(percent))
          }
        },

        // Abort signal to allow cancellation of the upload if needed.
        // abortSignal: abortController.signal,
      })
      onSuccess(upload)
    } catch (error) {
      console.error("Upload failed")
      toast.error("Failed uploading the file")
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <button type="button" onClick={submitUpload}>
        Upload file
      </button>
      <br />
      Upload progress: <progress value={50} max={100}></progress>
    </>
  )
}

export default FileUpload
