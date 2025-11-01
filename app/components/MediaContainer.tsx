import { IMediaClient } from "@/types/interfaces"
import { Image, Video } from "@imagekit/next"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function MediaContainer({
  media,
  isLoading,
}: {
  media: IMediaClient[]
  isLoading: boolean
}) {
  const pathName = usePathname()
  if (isLoading) {
    return (
      <div className="w-full min-h-[70vh] bg-gray-100 rounded-xl p-8 flex justify-center items-center">
        <h1 className="text-xl font-medium text-gray-600">
          Loading, please wait...
        </h1>
      </div>
    )
  }

  if (!isLoading && media.length === 0) {
    return (
      <div className="w-full min-h-[70vh] bg-gray-100 rounded-xl p-8 flex flex-col justify-center items-center text-center">
        <p className="text-gray-600 mb-3">No media found yet.</p>
        {pathName === "/" && (
          <Link
            href="/upload"
            className="px-4 py-2 rounded bg-gray-300 font-semibold"
          >
            Upload one?
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="w-full min-h-[70vh] bg-gray-100 rounded-xl p-4 md:p-8">
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4">
        {media.map((item) => (
          <div
            key={item._id}
            className="break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <Link href={`/media/${item._id}`}>
              {item.fileType === "image" ? (
                <Image
                  src={item.mediaUrl}
                  width={500}
                  height={500}
                  alt={item.title || "media"}
                  className="w-full h-auto object-cover"
                />
              ) : (
                <Video
                  urlEndpoint={item.mediaUrl}
                  src={item.mediaUrl}
                  controls
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover rounded-t-2xl"
                />
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
