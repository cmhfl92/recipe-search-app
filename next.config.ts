import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['images.pexels.com', 'source.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/photos/**',
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
