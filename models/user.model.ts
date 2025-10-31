import mongoose, { Document, Types, Schema } from "mongoose"
import bcrypt from "bcryptjs"

// ---------------------
// Types / Interfaces
// ---------------------
export interface IUser {
  firstname: string
  lastname: string
  email: string
  password: string
  profileImage?: string
  media?: Types.ObjectId[]
  totalLikes?: Types.ObjectId[]
  followers?: Types.ObjectId[]
  savedMedia?: Types.ObjectId[]

  comparePassword(candidatePassword: string): Promise<boolean>
}
export type IUserDocument = IUser & Document

// ---------------------
// Schema
// ---------------------
const UserSchema: Schema<IUserDocument> = new Schema<IUserDocument>(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    profileImage: { type: String },
    media: [{ type: Schema.Types.ObjectId, ref: "Media" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    savedMedia: [{ type: Schema.Types.ObjectId, ref: "Media" }],
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true }
)

// ---------------------
// Middleware: Hash password before save, But will not work for findOneByIdAndUpdate();
// ---------------------
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    return next()
  } catch (err: any) {
    return next(err)
  }
})

// ---------------------
// Methods
// ---------------------
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// ---------------------
// Model
// ---------------------
export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
