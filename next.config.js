/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive-thrueats.online',
        port: '',
        pathname: '/admin/oimg/**',
      },
    ],
  },
}

module.exports = nextConfig
