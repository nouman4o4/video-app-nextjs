import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User.model";

// ---------------------
// Types / Interfaces
// ---------------------

export const VIDEO_DIMENSIONS = {
  widht: 1080,
  heihgt: 1920,
} as const;

export interface IVideo extends Document {
  title: string;
  description?: string;
  videoUrl: string; // could be local path or remote URL
  thumbnailUrl: string;
  controles?: boolean;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
}

// ---------------------
// Schema
// ---------------------
const VideoSchema: Schema<IVideo> = new Schema<IVideo>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    controles: { type: Boolean, default: true },
    transformation: {
      height: { type: Number, default: VIDEO_DIMENSIONS.heihgt },
      width: { type: Number, default: VIDEO_DIMENSIONS.widht },
      quality: { type: Number, min: 1, max: 100 },
    },
  },
  { timestamps: true }
);

// ---------------------
// Model
// ---------------------
export const Video =
  mongoose.models.Video ||
  mongoose.model<IVideo>("Video", VideoSchema);
