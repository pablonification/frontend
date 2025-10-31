/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  // Ensure CSS is processed correctly
  webpack: (config) => {
    return config
  },
  // Image configuration for Vercel deployment
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // Allow all image domains if needed (for external images from API)
    remotePatterns: [],
  }
}

module.exports = nextConfig