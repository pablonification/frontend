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
    // Allow images from backend server (if API returns full URLs)
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '128.199.70.237',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '128.199.70.237',
        pathname: '/**',
      },
    ],
    // Disable optimization temporarily to ensure images load on Vercel
    // Can be re-enabled once images are confirmed working
    unoptimized: true,
    // Add domain configuration for static images
    domains: [],
  }
}

module.exports = nextConfig