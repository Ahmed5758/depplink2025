import { headers } from 'next/headers'
import type { Metadata, ResolvingMetadata } from 'next'
import { get } from "../../../api/ApiCalls";

type Props = {
    params: { slug: string, lang: string, data: any }
}


const fetcher = async (params: any) => {
    const slug = params.slug
    var data;
    await get(`orderdata-thankyou/${slug}`).then((responseJson: any) => {
        data = responseJson
    })
    return data
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    // userScalable: false,
}

export default async function CongratulationsLayout({ children, params }: { children: React.ReactNode, params: { slug: string, data: any, lang: string } }) {
    const orderData = await fetcher(params);
    params.data = orderData;
    return (
        <>
            {children}
        </>
    )
}
