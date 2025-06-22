/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Temporarily disable static export to enable API routes
  // output: 'export',
  trailingSlash: true,
  // Optimize for deployment
  // Add environment variables for build
  env: {
    CUSTOM_KEY: 'portfolio',
  },
}

export default nextConfig
