import { cache } from 'react';
import type { Metadata, ResolvingMetadata } from 'next'
import { NewMedia } from '../../api/Api';
import { Api } from "../../api/Api";
import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cacheKey } from '../../../GlobalVar';
import Script from 'next/script';
type Props = {
  params: { slug: string, data: any, lang: string, devicetype: any, query: any },
  searchParams: { [key: string]: string | string[] | undefined }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

// Caching wrapper
const fetcher = async (params: any, query: any = false) => {
  const slug = params.slug;
  const cookieStore = cookies();
  const city = cookieStore.get('selectedCity')?.value || 'Jeddah';
  const url = `category-page-data-new/${slug}/${city}?v=dataupdated&lang=${params?.lang}&${cacheKey}`;
  let result = '';
  if (query) {
    result = '&' + new URLSearchParams(query).toString();
  }
  const fullUrl = `${Api}${url}${result}`;
  const res = await fetch(fullUrl, { next: { revalidate: 7200 } });
  return res.json();
};

export async function generateMetadata({ params }: { params: any }, parent: ResolvingMetadata): Promise<Metadata> {
  const catdata = await fetcher(params);
  params.data = catdata;
  const headersList = headers();
  const searchParams: string | null = headersList.get('x-url');

  // Extract query string if present
  const query = searchParams && searchParams.includes('?') ? searchParams.substring(searchParams.indexOf('?')) : '';
  const noIndex = params?.data?.category?.no_index === 1;
  const noFollow = params?.data?.category?.no_follow === 1;
  const hasProducts = params?.data?.productData?.products?.data?.length > 0;
  const baseUrl = process.env.NODE_ENV === 'production' ? `https://tamkeenstores.com.sa/${params?.lang}/category/${params?.data?.category?.slug}` : 'http://localhost:3000';

  return {
    metadataBase: new URL(baseUrl),
    title:
      params?.lang === 'ar'
        ? params?.data?.category?.meta_title_ar
        : params?.data?.category?.meta_title_en,
    description:
      params?.lang === 'ar'
        ? params?.data?.category?.meta_description_ar
        : params?.data?.category?.meta_description_en,
    keywords: [
      params?.lang === 'ar'
        ? params?.data?.category?.product_meta_tag_ar
        : params?.data?.category?.product_meta_tag_en,
    ],
    referrer: 'origin-when-cross-origin',
    robots: {
      index: !noIndex && hasProducts,
      follow: !noFollow && hasProducts,
      nocache: false,
      googleBot: {
        index: !noIndex && hasProducts,
        follow: !noFollow && hasProducts,
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
      siteName:
        params?.lang === 'ar'
          ? `${params?.data?.category?.name_arabic} | متاجر تمكين`
          : `${params?.data?.category?.name} | Tamkeen Stores`,
      title:
        params?.lang === 'ar'
          ? params?.data?.category?.meta_title_ar
          : params?.data?.category?.meta_title_en,
      description:
        params?.lang === 'ar'
          ? params?.data?.category?.meta_description_ar
          : params?.data?.category?.meta_description_en,
      locale: params?.lang,
      type: 'website',
      images: [
        {
          url:
            params?.data?.category?.web_media_image == null
              ? '/images/metaLogo.jpg'
              : NewMedia + params?.data?.category?.web_media_image.image,
          width: 800,
          height: 800,
          alt:
            params?.lang === 'ar'
              ? params?.data?.category?.name_arabic
              : params?.data?.category?.name,
        },
      ],
      url: `https://tamkeenstores.com.sa/${params?.lang}/category/${params?.data?.category?.slug}`,
    },
    alternates: {
      canonical:
        params?.data?.data?.meta_canonical_en == null
          ? `https://tamkeenstores.com.sa/${params?.lang}/category/${params?.data?.category?.slug}${query}`
          : '', // You may want to handle this better if meta_canonical_en exists
      languages: {
        en: `https://tamkeenstores.com.sa/en/category/${params?.data?.category?.slug}${query}`,
        ar: `https://tamkeenstores.com.sa/ar/category/${params?.data?.category?.slug}${query}`,
      },
    },
    appLinks: {
      ios: {
        url: 'https://apps.apple.com/sa/app/tamkeen-stores-%D9%85%D8%B9%D8%A7%D8%B1%D8%B6-%D8%AA%D9%85%D9%83%D9%8A%D9%86/id1546482321',
        app_store_id: 'com.tamkeen.tamkeenstore',
      },
      android: {
        package:
          'https://play.google.com/store/apps/details?id=com.tamkeen.tamkeenstores&hl=en&gl=US&pli=1',
        app_name: 'com.tamkeen.tamkeenstores',
      },
      web: {
        url: `https://tamkeenstores.com.sa/en/category/${params?.data?.category?.slug}`,
        should_fallback: true,
      },
    },
    twitter: {
      card: 'summary_large_image',
      title:
        params?.lang === 'ar'
          ? params?.data?.category?.meta_title_ar
          : params?.data?.category?.meta_title_en,
      description:
        params?.lang === 'ar'
          ? params?.data?.category?.meta_description_ar
          : params?.data?.category?.meta_description_en,
      siteId: '@TamkeenStores',
      creator: 'Muhammad Usman Siddiqui | usman@tamkeen-ksa.com',
      images:
        params?.data?.category?.web_media_image == null
          ? '/images/metaLogo.jpg'
          : NewMedia + params?.data?.category?.web_media_image.image,
    },
  };
}


export default async function CategoryLayout({
  children,
  params
}: {
  children: any,
  params: {
    lang: string; slug: string, data: any, devicetype: any
  }
}) {
  var query = false;
  if (children.props.childProp.segment.indexOf('?') >= 0) {
    query = JSON.parse(children.props.childProp.segment.split('?')[1])
  }

  // getting city from cookies
  const cookieStore = cookies();
  const city = cookieStore.get('selectedCity')?.value || 'Jeddah';

  const catdata = await fetcher(params, query);
  params.data = catdata;
  const headersList = headers();
  const deviceType: string | null = headersList.get('device-type');
  params.devicetype = deviceType;

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

//   if (catdata?.category?.redirection_link !== null && catdata?.category?.redirection_link !== "") {
//     redirect(`${origin}/${params?.lang}/${catdata?.category?.redirection_link}`);
//   }

  const jsonCat = [
    {
      "@id": "#breadcrumb",
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Homepage",
          item: `https://tamkeenstores.com.sa/${params?.lang}`,
        },
        params?.data?.breadcrumb?.parentcat
          ? {
            "@type": "ListItem",
            position: 2,
            name:
              params?.lang === "ar"
                ? params?.data?.breadcrumb?.parentcat?.name_arabic
                : params?.data?.breadcrumb?.parentcat?.name,
            item: `https://tamkeenstores.com.sa/${params?.lang}/category/${params?.data?.breadcrumb?.parentcat?.slug}`,
          }
          : null,
        params?.data?.breadcrumb?.childcat
          ? {
            "@type": "ListItem",
            position: params?.data?.breadcrumb?.parentcat == null ? 2 : 3,
            name:
              params?.lang === "ar"
                ? params?.data?.breadcrumb?.childcat?.name_arabic
                : params?.data?.breadcrumb?.childcat?.name,
            item: `https://tamkeenstores.com.sa/${params?.lang}/category/${params?.data?.breadcrumb?.childcat?.slug}`,
          }
          : null,
        params?.data?.breadcrumb?.breadcrumb
          ? {
            "@type": "ListItem",
            position:
              params?.data?.breadcrumb?.parentcat == null && params?.data?.breadcrumb?.childcat == null
                ? 2
                : params?.data?.breadcrumb?.parentcat == null
                  ? 3
                  : 4,
            name:
              params?.lang === "ar"
                ? params?.data?.breadcrumb?.breadcrumb?.name_arabic
                : params?.data?.breadcrumb?.breadcrumb?.name,
            item: `https://tamkeenstores.com.sa/${params?.lang}/category/${params?.data?.breadcrumb?.breadcrumb?.slug}`,
          }
          : null,
      ].filter(Boolean), // remove nulls here
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: params?.lang === 'ar' ? params?.data?.category?.name_arabic : params?.data?.category?.name,
    description:
      params?.lang === 'ar'
        ? params?.data?.category?.meta_description_ar
        : params?.data?.category?.meta_description_en,
    itemListElement:
      params?.lang === 'ar' ? params?.data?.productchemaar ?? [] : params?.data?.productchema ?? [],
  };
  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonCat) }} />
      <div key={params.slug}> {/* This forces a re-render */}
        {children}
      </div>
    </>
  )
}