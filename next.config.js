/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio2025' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio2025' : '',
}

module.exports = nextConfig