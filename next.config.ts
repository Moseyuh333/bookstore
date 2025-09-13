import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Node.js runtime on Heroku (not edge)
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' }
    ],
  },
};

export default nextConfig;
