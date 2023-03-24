/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["image.tmdb.org"],
  },
};

module.exports = nextConfig;
