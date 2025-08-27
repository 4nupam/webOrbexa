// next.config.ts
import withPWAInit from "next-pwa";
import type { NextConfig } from "next";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
    ],
  },
  turbopack: {},
};

// 🚀 ignore type mismatch here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default withPWA(nextConfig as any)