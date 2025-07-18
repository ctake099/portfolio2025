/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio-test' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio-test' : '',
}

module.exports = nextConfig