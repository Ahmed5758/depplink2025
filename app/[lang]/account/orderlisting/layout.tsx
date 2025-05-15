import { get } from "../../api/ApiCalls"
import { headers } from 'next/headers'

type Props = {
    params: { slug: string, lang: string, data: any }
}

const fetcher = async (params: any) => {
    const slug = "orderlisting";
    var data;
    await get(`footer_pages/${slug}`).then((responseJson: any) => {
        data = responseJson
    })
    return data
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

export default async function OrderListingLayout({ children, params }: { children: React.ReactNode, params: { slug: string, data: any, lang: string, devicetype: any } }) {
    return (
        <>
            {children}
        </>
    )
}
