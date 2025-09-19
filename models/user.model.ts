import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// ---------------------
// Types / Interfaces
// ---------------------
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// ---------------------
// Schema
// ---------------------
const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true }
);

// ---------------------
// Middleware: Hash password before save
// ---------------------
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err: any) {
    return next(err);
  }
});

// ---------------------
// Methods
// ---------------------
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// ---------------------
// Model
// ---------------------
export const User = mongoose.model<IUser>("User", UserSchema);
