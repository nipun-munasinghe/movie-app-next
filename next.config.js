/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [{
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '**'
      },
    ],
  }
};

module.exports = nextConfig;