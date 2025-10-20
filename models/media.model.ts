import mongoose, { Document, ObjectId, Schema } from "mongoose"

// ---------------------
// Types / Interfaces
// ---------------------

export const VIDEO_DIMENSIONS = {
  widht: 1080,
  heihgt: 1920,
} as const

export interface IMedia extends Document {
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
  uploadedBy: ObjectId
}

// ---------------------
// Schema
// ---------------------
const MediaSchema: Schema<IMedia> = new Schema<IMedia>(
  {
    title: { type: String, required: true, trim: true },
    fileType: { type: String, required: true },
    description: { type: String },
    mediaUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    controles: { type: Boolean, default: true },
    transformation: {
      height: { type: Number, default: VIDEO_DIMENSIONS.heihgt },
      width: { type: Number, default: VIDEO_DIMENSIONS.widht },
      quality: { type: Number, min: 1, max: 100 },
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
)

// ---------------------
// Model
// ---------------------
export const Media =
  mongoose.models.Media || mongoose.model<IMedia>("Media", MediaSchema)
