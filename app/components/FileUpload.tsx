"use client" // This component must be a client component

import { upload } from "@imagekit/next"

import { apiClient } from "@/lib/api-client"
import { useSession } from "next-auth/react"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Upload, X } from "lucide-react"
import toast from "react-hot-toast"
import { fileuPloadShcema } from "@/schemas/fileuploadSchema"

export default function FileUpload() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileType, setFileType] = useState<"image" | "video" | null>(null)
  const [upLoading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const { data: session, status } = useSession()
  const [errors, setErrors] = useState<{
    file?: string[]
    title?: string[]
    descirption?: string[]
  } | null>()
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)
    const url = URL.createObjectURL(selectedFile)
    setPreviewUrl(url)
    setErrors({ ...errors, file: undefined })
    if (selectedFile.type.startsWith("image/")) setFileType("image")
    else if (selectedFile.type.startsWith("video/")) setFileType("video")
    else {
      setFileType(null)
      toast("Please select an image or video file.")
    }
  }

  // post a video in db
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

    try {
      const body = {
        title: "Video title",
        description:
          description ??
          "This is a dummy description in case the real one is not available",
        mediaUrl: url,
        thumbnailUrl,
        fileType,
        uploadedBy: session?.user.id!,
        transformation: {
          height,
          width,
        },
      }
      const response: any = await apiClient.createMedia(body)
      return response.success ? true : false
    } catch (error) {
      console.error("Failed to post video, error: ", error)
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const inputsValdatonResult = fileuPloadShcema.safeParse({
      title,
      description,
      file,
    })
    if (!file || !inputsValdatonResult.success) {
      !file && toast.error("Please a file image/video")
      const errors = inputsValdatonResult?.error?.flatten().fieldErrors
      setErrors(errors)
      return
    }
    //try-catch block

    setUploading(true)

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

            setProgress(percent)
            console.log("OnProgress: ", percent)
          }
        },

        // Abort signal to allow cancellation of the upload if needed.
        // abortSignal: abortController.signal,
      })
      if (uploadResponse) {
        const isDbResponseOk = await saveVideoInDb(uploadResponse)
        if (isDbResponseOk) {
          toast.success("File uploaded sucessfully")
          router.back()
        }
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed uploading the file")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="h-auto min-h-[calc(100vh-55px)] w-full flex items-center justify-center bg-gray-50 overflow-hidden py-0 md:py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white shadow-md md:rounded-2xl p-4 md:p-8 border border-gray-100"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Upload Your Media
        </h2>

        <div className="mb-6 relative">
          <label className="block text-gray-700 font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setErrors({ ...errors, title: undefined })
            }}
            placeholder="Enter a catchy title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <div className="error absolute left-1 -bottom-5 text-sm text-red-300">
            {errors?.title ? errors.title[0] : ""}
          </div>
        </div>

        <div className="mb-6 relative">
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
          <div className="error absolute left-1 -bottom-4 text-sm text-red-300">
            {errors?.descirption ? errors.descirption[0] : ""}
          </div>
        </div>

        <div className="mb-7">
          <label className="block text-gray-700 font-medium mb-2">
            Upload File (Image or Video)
          </label>
          {!previewUrl && (
            <div
              className={`w-full relative border-dashed border-2  rounded-lg px-4 flex items-center justify-center py-4 ${
                errors?.file ? "border-red-300" : "border-gray-300"
              }`}
            >
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
                />
              </label>
              <div className="error absolute left-1 -bottom-6 text-sm text-red-300">
                {errors?.file ? errors.file[0] : ""}
              </div>
            </div>
          )}
        </div>

        {previewUrl && (
          <div className="relative mb-5 rounded-lg md:rounded-xl overflow-hidden border border-gray-200 shadow-sm flex justify-center p-4 pt-8 md:p-8">
            <div className="absolute top-1 right-1 md:top-5 md:right-5 size-6 md:size-8 rounded p-[1px] bg-gray-400 hover:scale-110 transition-transform duration-100">
              <X
                className="text-white cursor-pointer w-full h-full"
                onClick={() => {
                  setFile(null)
                  setFileType(null)
                  setPreviewUrl("")
                  setErrors({ ...errors, file: undefined })
                }}
              />
            </div>
            {fileType === "image" ? (
              <Image
                src={previewUrl}
                alt="preview"
                className="w-auto h-auto max-h-[400px] object-contain rounded md:rounded-lg"
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

            {upLoading && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-center items-center z-50">
                <div className="flex flex-col items-center space-y-6 p-6 rounded-2xl bg-white/10 shadow-xl border border-white/20 backdrop-blur-md">
                  {/* Loading spinner */}
                  {/* <div className="relative bg-red-300">
                  <div className="absolute inset-0 animate-spin-slow rounded-full border-t-4 border-blue-400 border-solid size-16 opacity-60"></div>
                  <div className="absolute inset-0 animate-spin rounded-full border-t-4 border-blue-500 border-solid size-16"></div>
                   <LoaderPinwheel className="text-white size-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" /> 
                </div> */}

                  {/* Uploading text */}
                  <p className="text-white font-medium text-lg tracking-wide animate-pulse">
                    Uploading your file...
                  </p>

                  {/* Progress bar */}
                  <div className="w-64 bg-white/20 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 h-full rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }} // dynamically update width with progress %
                    ></div>
                  </div>

                  <p className="text-sm text-gray-200 font-light">
                    {progress}% complete
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={upLoading}
          className={`w-full py-3 rounded-lg font-semibold transition duration-75 cursor-pointer ${
            upLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-800 text-white hover:shadow-xl hover:bg-gray-900"
          }`}
        >
          {upLoading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  )
}
