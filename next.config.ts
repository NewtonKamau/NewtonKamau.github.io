/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // GitHub Pages doesn't support image optimization
  },
  reactStrictMode: true,
  // No basePath or assetPrefix needed for user/organization pages (username.github.io)

  // This will help with static export compatibility
  trailingSlash: true,
};

export default nextConfig;