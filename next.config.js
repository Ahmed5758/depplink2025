const withPWA = require('next-pwa')({
    dest: 'public',
    // Don’t even consider .map files for the precache manifest
    buildExcludes: [/\.map$/],
    // Optional: if you still see the warning for other large assets, bump the limit:
    // maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
    disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { webpack }) => {
        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.CUSTOM_VARIABLE': JSON.stringify('value'),
            })
        );
        return config;
    },
    reactStrictMode: false,
    transpilePackages: ['crypto-js'],
    async redirects() {
        return [
            {
                source: '/',
                destination: '/ar',
                permanent: true,
            },
            {
                source: '/ar(//+|/)$',
                destination: '/ar',
                permanent: true,
            },
        ];
    },
    // next.config.js
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                pathname: '/',
            },
            {
                protocol: 'https',
                hostname: 'tamkeenstores.com.sa',
                pathname: '/images/',
            },
            {
                protocol: 'https',
                hostname: 'partners.tamkeenstores.com.sa',
                pathname: '/',
            },
            {
                protocol: 'https',
                hostname: 'adminpanelapis.tamkeenstores.com.sa',
                pathname: '/',
            },
            {
                protocol: 'https',
                hostname: 'images.tamkeenstores.com.sa',
                pathname: '/',
            },
            {
                protocol: 'https',
                hostname: 'media.tamkeenstores.com.sa',
                pathname: '/',
            },
            {
                protocol: 'https',
                hostname: 'cdn-media.tamkeenstores.com.sa',
                pathname: '/',
            },
            {
                protocol: 'https',
                hostname: 'cyberadmin.tamkeenstores.com.sa',
                pathname: '/',
            },
            {
                protocol: 'https',
                hostname: 'onelink.to',
                pathname: '/',
            },
            {
                protocol: 'https',
                hostname: '.tamkeenstores.com.sa',
                pathname: '/',
            },
            {
                protocol: 'https',
                hostname: 'tamkeenstores.lon1.digitaloceanspaces.com'
            },
            {
                protocol: 'https',
                hostname: 'tamkeenstores.lon1.cdn.digitaloceanspaces.com'
            },
            {
                protocol: 'https',
                hostname: 'cdn-images.tamkeenstores.com.sa'
            }
        ],
        unoptimized: false,
        deviceSizes: [680, 780, 1040, 1280, 1540, 1650, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    async headers() {
        return [
            {
                source: '/.well-known/apple-app-site-association',
                headers: [
                    { key: 'Content-Type', value: 'application/json' }, // (optional, but fine)
                    { key: 'Cache-Control', value: 'public, max-age=3600' }
                ],
            },
            {
                // if you added the root copy too
                source: '/apple-app-site-association',
                headers: [
                    { key: 'Content-Type', value: 'application/json' },
                    { key: 'Cache-Control', value: 'public, max-age=3600' }
                ],
            },
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'off',
                    },
                ],
            },
            {
                source: '/_next/static/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/:path*\\.(svg|jpg|jpeg|png|gif|webp|avif)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/:path*\\.(js|css|html)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=3600, stale-while-revalidate=86400',
                    },
                ],
            },
        ];
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        nextScriptWorkers: true,
    },
};

module.exports = withPWA(nextConfig);