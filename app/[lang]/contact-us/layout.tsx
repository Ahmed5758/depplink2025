
import type { Metadata, ResolvingMetadata } from 'next'
import { headers } from 'next/headers'

// import Loading from './loading'
type Props = {
    params: { slug: string, lang: string }
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

export default async function ContactUsLayout({ children, params }: { children: React.ReactNode, params: { slug: string, data: any, lang: string } }) {
    return (
        <>
            {children}
        </>
    )
}
