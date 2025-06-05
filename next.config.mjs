/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  images: {
    domains: ['images.pexels.com'],
  },
};

export default nextConfig;