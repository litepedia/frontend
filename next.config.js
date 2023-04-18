/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  assetPrefix: true ? 'https://us-central1-stunning-choir-314214.cloudfunctions.net/nextjs' : '',
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig
