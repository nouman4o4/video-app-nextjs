import { User } from "@/models/user.model";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "./db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Required feilds are empty");
        }

        try {
          await connectDB();
          const user = await User.findOne({
            email: credentials.email,
          });
          // continue
          const isPasswordCorrect = bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) {
            throw new Error("Password is incorrect");
          }
          return {
            id: user._id,
            email: user.email,
          };
        } catch (error) {
          throw new Error("Password is incorrect");
        }
      },
    }),
  ],
};
