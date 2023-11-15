/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  env: {
    domainURL: 'https://tyeon-portfolio.vercel.app',
    channerTalkPluginKey: 'f91dc301-1a56-4326-aa88-43aab9a9025a',
    channerSecretKey: '148dbd1586a778b5e443935c27a16505',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = nextConfig;
