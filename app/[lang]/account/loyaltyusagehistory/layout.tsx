import type { Metadata, ResolvingMetadata } from 'next'
import { get } from "../../api/ApiCalls"
import { headers } from 'next/headers'

type Props = {
    params: { slug: string, lang: string, data: any }
}

const fetcher = async (params: any) => {
    const slug = "orderdetails";
    var data;
    // await get(`footer_pages/${slug}`).then((responseJson: any) => {
    //     data = responseJson
    // })
    return data
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    // userScalable: false,
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const orderDetails: any = await fetcher(params);
    params.data = orderDetails
    return {
        title: `Loyalty History | Tamkeen Stores`,
        description: '',
        keywords: ['Next.js', 'React', 'JavaScript'],
        referrer: 'origin-when-cross-origin',
        robots: {
            index: false,
            follow: false,
            nocache: false,
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
            address: false,
            telephone: false,
        },
        openGraph: {
            siteName: `Order Listing | Tamkeen Stores`,
            title: `Order Listing | Tamkeen Stores`,
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
            url: `https://tamkeenstores.com.sa/${params.lang}/loyaltyusagehistory`,
        },
        alternates: {
            canonical: `https://tamkeenstores.com.sa/${params.lang}/loyaltyusagehistory`, //This will be current link will come
            languages: {
                'en': 'https://tamkeenstores.com.sa/en/loyaltyusagehistory',
                'ar': 'https://tamkeenstores.com.sa/ar/loyaltyusagehistory',
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
            title: `Order Listing | Tamkeen Stores`,
            description: '',
            siteId: '@TamkeenStores',
            creator: 'Muhammad Usman Siddiqui | usman@tamkeen-ksa.com',
            images: ['/images/metaLogo.jpg'], // Must be an absolute URL
        },
    }
}

export default async function AddressDetailsLayout({ children, params }: { children: React.ReactNode, params: { slug: string, data: any, lang: string, devicetype: any } }) {
    const headersList = headers()
    const deviceType: string | null = headersList.get('device-type')
    params.devicetype = deviceType;
    const orderDetails = await fetcher(params);
    params.data = orderDetails;
    return (
        <>
            {children}
        </>
    )
}
