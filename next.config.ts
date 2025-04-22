import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['images.pexels.com', 'source.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https', // Ensure the protocol is https
        hostname: 'images.pexels.com', // Add the domain here
        pathname: '/photos/**', // The pattern for image paths
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
