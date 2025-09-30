/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['<your-ref>.supabase.co'], // ✅ tambahkan ini
    unoptimized: true,
  },
};

export default nextConfig;
