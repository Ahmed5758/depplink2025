
import type { Metadata, ResolvingMetadata } from 'next'
import { headers } from 'next/headers'

// import Loading from './loading'
type Props = {
    params: { slug: string, lang: string }
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    // userScalable: 0,
    // Also supported by less commonly used
    // interactiveWidget: 'resizes-visual',
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    return {
        title: 'Signup | Tamkeen Stores',
        description: 'qaiser',
        keywords: ['Next.js', 'React', 'JavaScript'],
        referrer: 'origin-when-cross-origin',
        robots: {
            index: false,
            follow: false,
            nocache: true,
            googleBot: {
                index: false,
                follow: false,
                noimageindex: false,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        formatDetection: {
            email: false,
            address: true,
            telephone: true,
        },
        openGraph: {
            siteName: `Login | Tamkeen Stores`,
            title: `Login | Tamkeen Stores`,
            description: '',
            locale: params.lang,
            type: 'website',
            images: [
                {
                    url: '/images/metaLogo.jpg', // Must be an absolute URL
                    width: 800,
                    height: 800,
                    alt: 'logo',
                },
            ],
            url: `https://tamkeenstores.com.sa/${params.lang}/contact-us`,
        },
        alternates: {
            canonical: `https://tamkeenstores.com.sa/${params.lang}/contact-us`, //This will be current link will come
            languages: {
                'en': 'https://tamkeenstores.com.sa/en/contact-us',
                'ar': 'https://tamkeenstores.com.sa/ar/contact-us',
            },
        },
        appLinks: {
            ios: {
                url: 'https://apps.apple.com/sa/app/tamkeen-stores-%D9%85%D8%B9%D8%A7%D8%B1%D8%B6-%D8%AA%D9%85%D9%83%D9%8A%D9%86/id1546482321',
                app_store_id: 'com.tamkeen.tamkeenstore',
            },
            android: {
                package: 'https://play.google.com/store/apps/details?id=com.tamkeen.tamkeenstores&hl=en&gl=US&pli=1',
                app_name: 'com.tamkeen.tamkeenstores',
            },
            web: {
                url: `https://tamkeenstores.com.sa/${params.lang}/contact-us`,
                should_fallback: true,
            },
        },
        twitter: {
            card: 'summary_large_image',
            title: `Login | Tamkeen Stores`,
            description: '',
            siteId: '@TamkeenStores',
            creator: 'Muhammad Usman Siddiqui | usman@tamkeen-ksa.com',
            images: ['/images/metaLogo.jpg'], // Must be an absolute URL
        },
    }
}

const fetcher = async (params: any) => {
    const slug = params.slug
    const res = await fetch(`https://partners.tamkeenstores.com.sa/api/productData-next/${slug}`).then((res) => res.json())
    return res
}

export default async function RegisterLayout({ children, params }: { children: React.ReactNode, params: {slug: string, data: any, lang: string } }) {
    // const footerdata = await fetcher(params);
    // params.data = footerdata;
    const jsonLd = [
        {
            "@id": "#breadcrumb",
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Homepage",
                    item: "https://tamkeenstores.com.sa/" + params.lang,
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Login",
                    item: "https://tamkeenstores.com.sa/" + params.lang + "/login",
                },
            ],
        },
    ]

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    )
}
