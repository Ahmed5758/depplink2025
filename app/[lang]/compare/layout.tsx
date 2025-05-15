import type { Metadata, ResolvingMetadata } from 'next'
import { get } from "../api/ApiCalls";
import { headers } from 'next/headers'
import { Api } from '../api/Api';


type Props = {
    params: { slug: string, lang: string, data: any }
}


const fetcher = async (params: any) => {
    const slug = "compare";
    const res: any = await fetch(`${Api}/footer_pages/${slug}`, { next: { revalidate: 1800 } })
    return res.json()
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

export default async function CompareLayout({ children, params }: { children: React.ReactNode, params: { slug: string, data: any, lang: string } }) {
    return (
        <>
            {children}
        </>
    )
}
