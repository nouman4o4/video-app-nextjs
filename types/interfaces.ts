export interface IMediaClient {
  title: string
  fileType: string
  description?: string
  mediaUrl: string // could be local path or remote URL
  thumbnailUrl: string
  controles?: boolean
  transformation?: {
    height: number
    width: number
    quality?: number
  }
  uploadedBy: string
  _id: string
}
