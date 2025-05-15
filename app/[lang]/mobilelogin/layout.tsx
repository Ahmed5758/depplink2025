
import type { Metadata, ResolvingMetadata } from 'next'
import { get } from "../api/ApiCalls";
import { headers } from 'next/headers'

// import Loading from './loading'
type Props = {
    params: { slug: string, lang: string, data: any }
}

const fetcher = async (params: any) => {
    const slug = "brandslisting";
    var data;
    await get('footer_pages/' + slug).then((responseJson: any) => {
        data = responseJson
    })
    return data
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 0,
    // Also supported by less commonly used
    // interactiveWidget: 'resizes-visual',
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const brandData = await fetcher(params);
    const slug = params.slug
    params.data = brandData;
    return {
        title: params.lang == 'ar' ? params?.data?.data?.meta_title_ar : params?.data?.data?.meta_title_en,
        description: params.lang == 'ar' ? params?.data?.data?.meta_description_ar : params?.data?.data?.meta_description_en,
        keywords: [params.lang == 'ar' ? params?.data?.data?.meta_tag_ar : params?.data?.data?.meta_tag_en],
        referrer: 'origin-when-cross-origin',
        robots: {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true,
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
            siteName: params.lang == 'ar' ? params?.data?.data?.meta_title_ar : params?.data?.data?.meta_title_en,
            title: params.lang == 'ar' ? params?.data?.data?.meta_title_ar : params?.data?.data?.meta_title_en,
            description: params.lang == 'ar' ? params?.data?.data?.meta_description_ar : params?.data?.data?.meta_description_en,
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
            url: `https://tamkeenstores.com.sa/${params.lang}/brandslisting`,
        },
        alternates: {
            canonical: `https://tamkeenstores.com.sa/${params.lang}/brandslisting`, //This will be current link will come
            languages: {
                'en': `https://tamkeenstores.com.sa/en/brandslisting`,
                'ar': `https://tamkeenstores.com.sa/ar/brandslisting`,
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
                url: `https://tamkeenstores.com.sa/${params.lang}/brandslisting`,
                should_fallback: true,
            },
        },
        twitter: {
            card: 'summary_large_image',
            title: params.lang == 'ar' ? params?.data?.data?.meta_title_ar : params?.data?.data?.meta_title_en,
            description: params.lang == 'ar' ? params?.data?.data?.meta_description_ar : params?.data?.data?.meta_description_en,
            siteId: '@TamkeenStores',
            creator: 'Muhammad Usman Siddiqui | usman@tamkeen-ksa.com',
            images: ['/images/metaLogo.jpg'], // Must be an absolute URL
        },
    }
}

export default async function LoginLayout({ children, params }: { children: React.ReactNode, params: {slug: string, data: any, lang: string } }) {
    const jsonLd = [
        {
            "@id": "#breadcrumb",
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: params.lang == 'ar' ? 'الصفحة الرئيسي' : 'Home Page',
                    item: "https://tamkeenstores.com.sa/" + params.lang,
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: params.lang == 'ar' ? 'تسوق حسب العلامة التجارية' : `Shop By Brand's`,
                    item: "https://tamkeenstores.com.sa/" + params.lang + "/" + params?.data?.data?.page_link,
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
