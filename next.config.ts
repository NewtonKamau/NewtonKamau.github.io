/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Required for static export
  images: {
    unoptimized: true, // GitHub Pages doesn't support image optimization
  },
  // No basePath or assetPrefix needed for user/organization pages (username.github.io)
};

export default nextConfig;
