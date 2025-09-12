import { Api } from "../api/Api";
import { cacheKey } from '../GlobalVar'

const fetcher = async (params: any) => {
    const slug = "returnexchange";
    const res: any = await fetch(`${Api}/footer_pages/${slug}?${cacheKey}`, { next: { revalidate: 7200 } })
    return res.json()
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

export default async function RepalcementandRetrievalPolicyLayout({ children, params }: { children: React.ReactNode, params: {slug: string, data: any, lang: string } }) {
    const footerdata = await fetcher(params);
    params.data = footerdata;
    return (
        <>
            {children}
        </>
    )
}
