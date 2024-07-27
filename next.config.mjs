/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '127.0.0.1',
                port: '8000',
            },
        ],
        unoptimized: true,
    },
};

export default nextConfig;
