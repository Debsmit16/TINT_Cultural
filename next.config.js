/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Enable static file serving for uploads
  images: {
    remotePatterns: [],
  },
  // Ensure API routes work correctly
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb',
    },
  },
};

export default nextConfig;
