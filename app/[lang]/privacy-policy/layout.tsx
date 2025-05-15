import { Api } from "../api/Api";

const fetcher = async (params: any) => {
    const slug = "privacy-policy";
    const res: any = await fetch(`${Api}/footer_pages/${slug}`, { next: { revalidate: 1800 } })
    return res.json()
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

export default async function PrivacyPolicyLayout({ children, params }: { children: React.ReactNode, params: {slug: string, data: any, lang: string } }) {
    const footerdata = await fetcher(params);
    params.data = footerdata;
    return (
        <>
            {children}
        </>
    )
}
