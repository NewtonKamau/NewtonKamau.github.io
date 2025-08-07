/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Required for static export
  images: {
    unoptimized: true, // GitHub Pages doesn't support image optimization
  },
  basePath: "/NewtonKamau.github.io", // if your repo is not a user/organization page
  assetPrefix: "/NewtonKamau.github.io/", // same as basePath
};

export default nextConfig;
