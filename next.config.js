/** @type {import('next').NextConfig} */
module.exports = {
  appDir: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media-1.api-sports.io',
        port: '',
        pathname: '/formula-1/**/**',
      },
      {
        protocol: 'https',
        hostname: 'media-2.api-sports.io',
        port: '',
        pathname: '/formula-1/**/**',
      },
      {
        protocol: 'https',
        hostname: 'media-3.api-sports.io',
        port: '',
        pathname: '/formula-1/**/**',
      },
    ],
  },
};
