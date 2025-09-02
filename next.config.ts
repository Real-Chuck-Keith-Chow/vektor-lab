import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Disable blocking builds on ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
