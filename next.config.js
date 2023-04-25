/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  distDir: 'build',
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  assetPrefix: process.env.NODE_ENV == 'production' ? 'https://us-central1-stunning-choir-314214.cloudfunctions.net/nextjs' : '',
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
};

module.exports = nextConfig
