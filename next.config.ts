import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains:['images.pexels.com','res.cloudinary.com'],
  },
};

export default nextConfig;
