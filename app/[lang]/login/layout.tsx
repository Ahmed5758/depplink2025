export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

export default async function LoginLayout({ children, params }: { children: React.ReactNode, params: { slug: string, data: any, lang: string } }) {
    return (
        <>
            {children}
        </>
    )
}
