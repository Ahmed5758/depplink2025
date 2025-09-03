// app/[lang]/loyaltypoints/layout.tsx
import type { Metadata, ResolvingMetadata, Viewport } from 'next';
import { Api } from '../api/Api';

type Params = { lang: string };
type LayoutProps = { children: React.ReactNode; params: Promise<Params> };

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tamkeenstores.com.sa';
const OG_IMAGE = `${BASE_URL}/images/metaLogo.jpg`;

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

async function fetchFooter() {
    const res = await fetch(`${Api}/footer_pages/loyaltypoints`, { next: { revalidate: 7200 } });
    if (!res.ok) throw new Error('Failed to load loyaltypoints footer');
    return res.json();
}

export async function generateMetadata(
    { params }: { params: Promise<Params> },
    _parent: ResolvingMetadata
): Promise<Metadata> {
    const { lang } = await params;
    const data = await fetchFooter(); // de-duped with layout
    const meta = data?.data ?? {};
    const title =
        lang === 'ar' ? meta.meta_title_ar ?? 'نقاط الولاء' : meta.meta_title_en ?? 'Loyalty Points';
    const description =
        lang === 'ar' ? meta.meta_description_ar ?? '' : meta.meta_description_en ?? '';
    const pageLink = meta.page_link ?? 'loyaltypoints';
    const url = `${BASE_URL}/${lang}/${pageLink}`;

    return {
        title,
        description,
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
        formatDetection: { email: false, address: true, telephone: true },
        openGraph: {
            siteName: 'Tamkeen Stores',
            title,
            description,
            locale: lang,
            type: 'website',
            images: [{ url: OG_IMAGE, width: 800, height: 800, alt: title }],
            url,
        },
        alternates: {
            canonical: url,
            languages: {
                en: `${BASE_URL}/en/${pageLink}`,
                ar: `${BASE_URL}/ar/${pageLink}`,
            },
        },
        appLinks: {
            ios: {
                url: 'https://apps.apple.com/sa/app/tamkeen-stores-%D9%85%D8%B9%D8%A7%D8%B1%D8%B6-%D8%AA%D9%85%D9%83%D9%8A%D9%86/id1546482321',
                app_store_id: '1546482321',
            },
            android: {
                package: 'com.tamkeen.tamkeenstores',
                app_name: 'com.tamkeen.tamkeenstores',
            },
            web: { url, should_fallback: true },
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            site: '@TamkeenStores',
            creator: '@TamkeenStores',
            images: [OG_IMAGE],
        },
    };
}

export default async function LoyaltyPointsLayout({ children, params }: LayoutProps) {
    const { lang } = await params;
    const footerdata = await fetchFooter();

    const jsonLd = [
        {
            '@id': '#breadcrumb',
            '@context': 'http://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: lang === 'ar' ? 'الصفحة الرئيسية' : 'Home Page',
                    item: `${BASE_URL}/${lang}`,
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: lang === 'ar' ? 'نقاط الولاء' : 'Loyalty Points',
                    item: `${BASE_URL}/${lang}/loyaltypoints`,
                },
            ],
        },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
