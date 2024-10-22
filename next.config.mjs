/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard",
        missing: [
          {
            type: "cookie",
            key: "is_authenticated",
            value: "true",
          },
        ],
        destination: "/auth",
        permanent: false,
      },
      {
        source: "/",
        has: [
          {
            type: "cookie",
            key: "is_authenticated",
            value: "true",
          },
        ],
        destination: "/dashboard",
        permanent: false,
      },
      {
        source: "/auth/:path*",
        has: [
          {
            type: "cookie",
            key: "is_authenticated",
            value: "true",
          },
        ],
        destination: "/dashboard",
        permanent: false,
      },
      {
        source: "/competitions/:id",
        destination: "/competitions/:id/home",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "127.0.0.1",
        port: "8000",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
