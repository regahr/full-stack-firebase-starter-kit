/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: [], // Add any image domains you need to whitelist
    },
    async rewrites() {
      return [
        {
            source: '/api/:path*',
            destination: 'http://localhost:5005/api/:path*', 
          },
      ];
    }
}

module.exports = nextConfig 