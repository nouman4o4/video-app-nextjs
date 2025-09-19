import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User.model";

// ---------------------
// Types / Interfaces
// ---------------------
export interface IVideo extends Document {
  title: string;
  description?: string;
  url: string; // could be local path or remote URL
  uploadedBy: IUser["_id"]; // relation to User
  likes: number;
  createdAt: Date;
}

// ---------------------
// Schema
// ---------------------
const VideoSchema: Schema<IVideo> = new Schema<IVideo>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    url: { type: String, required: true },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ---------------------
// Model
// ---------------------
export const Video = mongoose.model<IVideo>("Video", VideoSchema);
