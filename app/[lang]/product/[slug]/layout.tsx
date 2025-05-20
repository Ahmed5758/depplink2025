import { Api } from "../../api/Api";
import { redirect } from 'next/navigation'
import { cache } from 'react';
import { headers,cookies } from 'next/headers'
import next from "next";
import { cacheKey } from '../../GlobalVar';

const fetcher = cache(async (params: any) => {
    const { slug } = params;
    const cookieStore = cookies();
    const city = cookieStore.get('selectedCity')?.value || 'Jeddah';

    const res = await fetch(`${Api}/product-regional-new-copy/${slug}/${city}?${cacheKey}`, {
        next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    return res.json();
});

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

export default async function ProductLayout({ children, params }: { children: React.ReactNode, params: { slug: string, data: any, lang: string, devicetype: any } }) {
    const headersList = headers()
    const productdata = await fetcher(params);
    params.data = productdata;
    const deviceType: string | null = headersList.get('device-type')
    params.devicetype = deviceType;
    return (
        <>
            {children}
        </>
    )
}