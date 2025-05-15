import { Api } from "../../api/Api";
import { redirect } from 'next/navigation'
import { headers,cookies } from 'next/headers'
import next from "next";

const fetcher = async (params: any) => {
    const slug = params.slug
    // const res: any = await fetch(`${Api}/product-regional/${slug}`)
    const cookieStore = cookies();
    const city = cookieStore.get('selectedCity')?.value || 'Jeddah';
    // const res: any = await fetch(`${Api}/product-regional-new-copy/${slug}/${city}`)
    const res: any = await fetch(`${Api}product-regional-new-copy/${slug}?v=updated&lang=${params.lang}`, { next: { revalidate: 36000 } })
    return res.json()
}

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