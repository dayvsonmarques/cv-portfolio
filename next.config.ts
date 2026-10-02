import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  output: 'standalone'
};

export default nextConfig;
