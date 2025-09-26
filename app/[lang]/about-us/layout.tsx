import type { Metadata } from "next";
import { getRequestContext } from "@/lib/request-context";
import { getFooterCached } from "@/lib/footerpages/footer.cached";
import { BridgeSlot } from "@/app/_ctx/ClientDataRegistry";


export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 0,
}

export default async function AboutUsLayout({ children, params }: { children: React.ReactNode, params: { slug: string, data: any, lang: string } }) {
    const { lang, baseUrl, slugStr } = await getRequestContext();
    if (!slugStr) return null;

    const footer = await getFooterCached(slugStr);
    const value = footer ? JSON.parse(JSON.stringify(footer)) : null;

    const jsonLd = [
        {
            "@id": "#breadcrumb",
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: lang === 'ar' ? 'الصفحة الرئيسي' : 'Home Page',
                    item: `${baseUrl}/${lang}`,
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: lang === 'ar' ? 'معلومات عنا' : 'About Us',
                    item: `${baseUrl}/${lang}/${footer?.data?.data?.page_link}`,
                },
            ],
        },
    ]
    return (
        <BridgeSlot slot="footer" value={value}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </BridgeSlot>
    );
}

// ---- SEO metadata ----
export async function generateMetadata(): Promise<Metadata | null> {
    const { slugParts, slugStr, lang, origin } = await getRequestContext();
    if (!slugStr) return null;

    const footer = await getFooterCached(slugStr);

    const metaTitle =
        lang === "en"
            ? footer?.data?.meta_title_en ?? "Tamkeen Stores About Us"
            : footer?.data?.meta_title_ar ?? "معلومات عنا | معارض تمكين";

    const metaDescription =
        lang === "en"
            ? footer?.data?.meta_description_en ??
            "Tamkeen Stores About Us"
            : footer?.data?.meta_description_ar ??
            "معارض تمكين معلومات عنا";

    // In /[lang]/about-us/[...slug], slugParts are ONLY the [...slug] bits (not "about-us")
    const suffix = slugParts?.length ? `/${slugParts.join("/")}` : "";
    const canonicalPath = `/${lang}${suffix}`;
    const canonicalUrl = `${origin}${canonicalPath}`;

    return {
        metadataBase: new URL(origin),
        title: metaTitle,
        description: metaDescription,
        keywords: [
            "Tamkeen Stores",
            "تمكين",
            "Electronics Saudi Arabia",
            "معارض تمكين",
            "About Us",
        ],

        referrer: "origin-when-cross-origin",
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1,
            },
        },
        formatDetection: { email: false, address: true, telephone: true },

        openGraph: {
            siteName: "Tamkeen Stores",
            title: metaTitle,
            description: metaDescription,
            locale: lang,
            type: "website",
            images: [
                {
                    url: `${origin}/images/metaLogo.jpg`,
                    width: 800,
                    height: 800,
                    alt: "logo",
                },
            ],
            url: canonicalUrl,
        },

        alternates: {
            canonical: canonicalUrl,
            languages: {
                en: `${origin}/en${suffix}`,
                ar: `${origin}/ar${suffix}`,
            },
        },

        appLinks: {
            ios: {
                url: "https://apps.apple.com/sa/app/tamkeen-stores-%D9%85%D8%B9%D8%A7%D8%B1%D8%B6-%D8%AA%D9%85%D9%83%D9%8A%D9%86/id1546482321",
                app_store_id: "com.tamkeen.tamkeenstore",
            },
            android: {
                package:
                    "https://play.google.com/store/apps/details?id=com.tamkeen.tamkeenstores",
                app_name: "com.tamkeen.tamkeenstores",
            },
            web: { url: canonicalUrl, should_fallback: true },
        },

        twitter: {
            card: "summary_large_image",
            title: metaTitle,
            description: metaDescription,
            site: "@TamkeenStores",
            creator: "@TamkeenStores",
            images: [`${origin}/images/metaLogo.jpg`],
        },

        // ✅ Developer Info (will render as <meta name="developer:*">)
        other: {
            "developer:name": "Muhammad Usman Siddiqui",
            "developer:email": "usman@tamkeen-ksa.com",
            "developer:role": "E-commerce Applications Manager",
        },
    };
}
