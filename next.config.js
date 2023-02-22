/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePath: [path.join(__dirname, 'styles')]
  },
  reactStrictMode: false,
}

module.exports = nextConfig
