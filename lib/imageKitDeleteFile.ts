// /lib/imagekit.ts
export async function deleteImageKitFile(fileId: string) {
  try {
    if (!fileId) throw new Error("File ID is required")

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
    if (!privateKey) throw new Error("Missing ImageKit private key")

    const res = await fetch(`https://api.imagekit.io/v1/files/${fileId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${Buffer.from(privateKey + ":").toString(
          "base64"
        )}`,
      },
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error("ImageKit delete failed:", errText)
      return { success: false, message: "Failed to delete image" }
    }

    return { success: true, message: "Image deleted successfully" }
  } catch (error) {
    console.error("ImageKit deletion error:", error)
    return { success: false, message: (error as Error).message }
  }
}
