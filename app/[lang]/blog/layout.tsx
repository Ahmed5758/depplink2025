import { Api } from '../api/Api';

type Props = {
    params: { lang: string, data: any }
}

const fetcher = async (params: any) => {
    const res: any = await fetch(`${Api}/blogs`, { next: { revalidate: 86400 } })
    return res.json()
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

export default async function BlogsLayout({ children, params }: { children: React.ReactNode, params: { slug: string, data: any, lang: string } }) {
    const blogData = await fetcher(params);
    params.data = blogData;
    return (
        <>
            {children}
        </>
    )
}
