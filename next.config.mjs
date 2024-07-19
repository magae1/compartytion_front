/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/dashboard',
                missing: [
                    {
                        type: 'cookie',
                        key: 'is_authenticated',
                        value: 'true',
                    },
                ],
                destination: '/auth',
                permanent: false,
            },
            {
                source: '/',
                has: [
                    {
                        type: 'cookie',
                        key: 'is_authenticated',
                        value: 'true',
                    }
                ],
                destination: '/dashboard',
                permanent: false,
            },
            {
                source: '/auth/:path*',
                has: [
                    {
                        type: 'cookie',
                        key: 'is_authenticated',
                        value: 'true',
                    }
                ],
                destination: '/dashboard',
                permanent: false,
            },
        ]
    },
};

export default nextConfig;
