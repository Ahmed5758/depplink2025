import { headers } from 'next/headers'
import { Api } from '../api/Api'

type Props = {
    params: { slug: string, lang: string, data: any }
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

const fetcher = async (params: any) => {
    const slug = "installment-service-methods";
    const res: any = await fetch(`${Api}/footer_pages/${slug}`, { next: { revalidate: 1800 } })
    return res.json()
}

export default async function InstallmentServiceMethodsLayout({ children, params }: { children: React.ReactNode, params: { slug: string, data: any, lang: string, devicetype: any } }) {
    const footerdata = await fetcher(params);
    params.data = footerdata;
    const headersList = headers()
    const deviceType: string | null = headersList.get('device-type')
    params.devicetype = deviceType;
    return (
        <>
            {children}
        </>
    )
}
