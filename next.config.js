const withPWA = require('next-pwa')({
    dest: 'public'
})


/** @type {import('next').NextConfig} */
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const nextConfig = {
    reactStrictMode: false,
    transpilePackages: ['crypto-js'],
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                ],
            },
        ]
    },
    images: {
        unoptimized: true,
        deviceSizes: [
            680,
            780,
            1040,
            1280,
            1540,
            1650,
            1920
        ],
        imageSizes: [
            16,
            32,
            48,
            64,
            96,
            128,
            256,
            384
        ],
        minimumCacheTTL: 60,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tamkeenstores.com.sa',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'partners.tamkeenstores.com.sa',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'images.tamkeenstores.com.sa',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'media.tamkeenstores.com.sa',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'cdn-media.tamkeenstores.com.sa',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'react.tamkeenstores.com.sa',
                port: '',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    // pages: {
    //     '*': {
    //       maxChunkSize: 30000
    //     },
    // },
    experimental: {
        nextScriptWorkers: true,
    },
}

module.exports = withPWA(nextConfig)
