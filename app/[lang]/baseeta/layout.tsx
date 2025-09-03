
import type { Metadata, ResolvingMetadata } from 'next'
import { get } from "../api/ApiCalls"
import { headers } from 'next/headers'
import { Api } from '../api/Api'

// import Loading from './loading'
type Props = {
    params: { slug: string, lang: string, data: any }
}

const fetcher = async (params: any) => {
    const slug = "baseeta";
    const res: any = await fetch(`${Api}/product/${slug}`, { next: { revalidate: 7200 } })
    return res.json()
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

export default async function BaseetaLayout({ children, params }: { children: React.ReactNode, params: { slug: string, data: any, lang: string } }) {
    const footerdata = await fetcher(params);
    params.data = footerdata;
    return (
        <>
            {children}
        </>
    )
}
