import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Matikan kompresi di sisi Next.js/Vercel
  compress: false, 
  
  // Jika kamu menggunakan rewrites untuk proxy, tambahkan ini:
  async rewrites() {
    return [
      {
        source: '/api-proxy/:path*',
        destination: 'https://backendmobilewebs3-production.up.railway.app/api/:path*',
      },
    ];
  },
  
  // Paksa matikan kompresi untuk semua request proxy
  async headers() {
    return [
      {
        source: '/api-proxy/:path*',
        headers: [
          { key: 'Accept-Encoding', value: 'identity' }, // Minta server kirim tanpa kompresi
        ],
      },
    ];
  },
};

export default nextConfig;