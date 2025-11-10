import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "", // Leave empty if no specific port is used
        pathname: "/**", // Allows any path on the hostname
      },
    ],
  },
}

export default nextConfig
