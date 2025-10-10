/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  // Ensure CSS is processed correctly
  webpack: (config) => {
    return config
  }
}

module.exports = nextConfig