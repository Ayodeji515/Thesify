/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Explicitly disable production browser source maps to protect code and reduce build size
  productionBrowserSourceMaps: false,
  // Enable SWC minification for faster builds and smaller output
  swcMinify: true,
  // Remove console logs in production builds while keeping errors
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  // Optimize package imports to tree-shake heavy libraries like lucide-react
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
