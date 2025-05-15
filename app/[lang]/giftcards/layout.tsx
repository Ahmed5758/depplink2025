export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 0,
}


export default async function GiftCardsLayout({ children, params }: { children: React.ReactNode, params: { slug: string, data: any, lang: string } }) {
    return (
        <>
            {children}
        </>
    )
}
