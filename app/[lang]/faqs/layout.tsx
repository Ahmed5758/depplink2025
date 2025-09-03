
import type { Metadata, ResolvingMetadata } from 'next'
import { headers } from 'next/headers'
import { get } from "../api/ApiCalls"
import { Api } from '../api/Api'

// import Loading from './loading'
type Props = {
    params: { slug: string, lang: string, data: any }
}

const fetcher = async (params: any) => {
    const slug = "faqs";
    const res: any = await fetch(`${Api}/footer_pages/${slug}`, { next: { revalidate: 7200 } })
    return res.json()
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

export default async function FaqsLayout({ children, params }: { children: React.ReactNode, params: { slug: string, data: any, lang: string, devicetype: any } }) {
    const headersList = headers()
    const deviceType: string | null = headersList.get('device-type')
    params.devicetype = deviceType;
    const footerdata = await fetcher(params);
    params.data = footerdata;

    return (
        <>
            {children}
        </>
    )
}
