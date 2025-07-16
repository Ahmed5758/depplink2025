import type { Metadata, ResolvingMetadata } from 'next';
import { headers } from 'next/headers';
import { Api } from '../../api/Api';

// Type definition for props
type Props = {
    params: { slug: string, lang: string, data: any };
};

const fetcher = async (params: any) => {
    const slug = params.slug
    const res = await fetch(`${Api}shipment-tracking/${slug}`);
    return res.json();
};

// Viewport settings
export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

// Function to generate metadata for the page
// export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
//     const data = params.data?.data || {};
//     return {
//         title: params.lang === 'ar' ? data.meta_title_ar : data.meta_title_en,
//         description: params.lang === 'ar' ? data.meta_description_ar : data.meta_description_en,
//         keywords: [params.lang === 'ar' ? data.meta_tag_ar : data.meta_tag_en],
//         referrer: 'origin-when-cross-origin',
//         robots: {
//             index: false,
//             follow: false,
//             nocache: false,
//             googleBot: {
//                 index: false,
//                 follow: false,
//                 noimageindex: false,
//                 'max-video-preview': -1,
//                 'max-image-preview': 'large',
//                 'max-snippet': -1,
//             },
//         },
//         formatDetection: {
//             email: false,
//             address: true,
//             telephone: true,
//         },
//         openGraph: {
//             siteName: params.lang === 'ar' ? data.meta_title_ar : data.meta_title_en,
//             title: params.lang === 'ar' ? data.meta_title_ar : data.meta_title_en,
//             description: params.lang === 'ar' ? data.meta_description_ar : data.meta_description_en,
//             locale: params.lang,
//             type: 'website',
//             images: [
//                 {
//                     url: '/images/metaLogo.jpg', // Must be an absolute URL
//                     width: 800,
//                     height: 800,
//                     alt: 'logo',
//                 },
//             ],
//             url: `https://tamkeenstores.com.sa/${params.lang}/shipmenttracking/${data.page_link}`,
//         },
//         alternates: {
//             canonical: `https://tamkeenstores.com.sa/${params.lang}/shipmenttracking/${data.page_link}`, //This will be current link will come
//             languages: {
//                 'en': `https://tamkeenstores.com.sa/en/shipmenttracking/${data.page_link}`,
//                 'ar': `https://tamkeenstores.com.sa/ar/shipmenttracking/${data.page_link}`,
//             },
//         },
//         appLinks: {
//             ios: {
//                 url: 'https://apps.apple.com/sa/app/tamkeen-stores-%D9%85%D8%B9%D8%A7%D8%B1%D8%B6-%D8%AA%D9%85%D9%83%D9%8A%D9%86/id1546482321',
//                 app_store_id: 'com.tamkeen.tamkeenstore',
//             },
//             android: {
//                 package: 'https://play.google.com/store/apps/details?id=com.tamkeen.tamkeenstores&hl=en&gl=US&pli=1',
//                 app_name: 'com.tamkeen.tamkeenstores',
//             },
//             web: {
//                 url: `https://tamkeenstores.com.sa/${params.lang}/shipmenttracking/${data.page_link}`,
//                 should_fallback: true,
//             },
//         },
//         twitter: {
//             card: 'summary_large_image',
//             title: params.lang === 'ar' ? data.meta_title_ar : data.meta_title_en,
//             description: params.lang === 'ar' ? data.meta_description_ar : data.meta_description_en,
//             siteId: '@TamkeenStores',
//             creator: 'Muhammad Usman Siddiqui | usman@tamkeen-ksa.com',
//             images: ['/images/metaLogo.jpg'], // Must be an absolute URL
//         },
//     };
// }

// Main component for shipment tracking layout
export default async function ShipmentTrackingLayout({ children, params }: { children: React.ReactNode, params: { devicetype: any, slug: string, data: any, lang: string } }) {
    const headersList = headers();
    const deviceType: string | null = headersList.get('device-type');
    params.devicetype = deviceType;
    
    // Fetch shipment data based on slug
    const shipmentData = await fetcher(params);
    params.data = shipmentData;
   
    return (
        <>
            {children}
        </>
    );
}
