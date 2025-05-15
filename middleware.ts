import { NextRequest, NextResponse, userAgent } from 'next/server'
const PUBLIC_FILE = /\.(.*)$/
import Negotiator from 'negotiator'

let headers = { 'accept-language': 'en,en;q=0.5' }
let languages = new Negotiator({ headers }).languages()
let locales = ['en', 'ar']
let defaultLocale = 'ar'

// Get the preferred locale, similar to above or using a library
function getLocale(request: any) { locales }

export function middleware(request: any) {
    // Check if there is any supported locale in the pathname
    const pathname = request.nextUrl.pathname
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname === `/`
    )


    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request)

        // e.g. incoming request is /products
        // The new URL is now /en-US/products
        return NextResponse.redirect(
            new URL(`/${defaultLocale}/${pathname}`, request.url)
        )
    }
    const { device } : any = userAgent(request)
    const deviceType: string = device.type === 'mobile' ? 'mobile' : 'desktop'
    // const deviceVendor: string = device.vendor
    // const deviceModel: string = device.model
    const response = NextResponse.next()
    response.headers.append('device-type', deviceType)
    // response.headers.append('device-vendor', deviceVendor)
    // response.headers.append('device-model', deviceModel)
    return response

}


// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
        // '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
        // Optional: only run on root (/) URL
        // '/'
    ],
}