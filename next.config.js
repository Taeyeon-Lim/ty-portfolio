/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  env: {
    domainURL: 'https://tyeon-portfolio.vercel.app',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // remotePatterns: [
    //   {
    //     protocol: 'http',
    //     hostname: 'via.placeholder.com',
    //     port: '',
    //     pathname: '/**',
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'via.placeholder.com',
    //     port: '',
    //     pathname: '/**',
    //   },
    // ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = nextConfig;
