import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  basePath: isProd ? '/portfolio2025' : '',
  assetPrefix: isProd ? '/portfolio2025/' : '',
  trailingSlash: true,
  // 他に必要なオプションをここに追加
};

export default nextConfig;