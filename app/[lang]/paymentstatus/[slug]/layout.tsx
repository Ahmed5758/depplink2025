
import type { Metadata, ResolvingMetadata } from 'next'
import { headers } from 'next/headers'  


// import Loading from './loading'
type Props = {
    params: { slug: string, lang: string, data: any }
}



export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 0,
    // Also supported by less commonly used
    // interactiveWidget: 'resizes-visual',
}


export default async function AboutUsLayout({ children, params }: { children: React.ReactNode, params: {slug: string, data: any, lang: string } }) {
    return (
        <>
            {children}
        </>
    )
}
