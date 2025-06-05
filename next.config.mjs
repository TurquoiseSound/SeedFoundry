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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.collaborative.tech',
        port: '',
        pathname: '/images/**',
      }
    ],
  },
  // Add experimental configuration for improved WebSocket handling
  experimental: {
    esmExternals: true,
    serverComponents: true,
  },
};

export default nextConfig;