const withPWA = require('next-pwa')({
    dest: 'public',
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
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'tamkeenstores.com.sa',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'tamkeenstores.com.sa',
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'partners.tamkeenstores.com.sa',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'adminpanelapis.tamkeenstores.com.sa',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.tamkeenstores.com.sa',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'media.tamkeenstores.com.sa',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn-media.tamkeenstores.com.sa',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cyberadmin.tamkeenstores.com.sa',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'onelink.to',
                pathname: '/**',
            },
        ],
        unoptimized: false, // Enable optimization
        deviceSizes: [680, 780, 1040, 1280, 1540, 1650, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.tamkeenstores.com.sa',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'onelink.to',
                port: '',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'X-DNS-Prefetch-Control', value: 'off' },
                ],
            },
            // {
            //     source: '/_next/static/(.*)',
            //     headers: [
            //         {
            //             key: 'Cache-Control',
            //             value: 'public, max-age=31536000, immutable',
            //         },
            //     ],
            // },
            // {
            //     source: '/:path*\\.(svg|jpg|jpeg|png|gif|webp|avif)',
            //     headers: [
            //         {
            //             key: 'Cache-Control',
            //             value: 'public, max-age=31536000, immutable',
            //         },
            //     ],
            // },
            // {
            //     source: '/:path*\\.(js|css|html)',
            //     headers: [
            //         {
            //             key: 'Cache-Control',
            //             value: 'public, max-age=3600, stale-while-revalidate=86400',
            //         },
            //     ],
            // },
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