
import './globals.css'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { get } from "./api/ApiCalls";
import { Cairo, Noto_Sans } from 'next/font/google'
import Providers from './providers';

import { getDictionary } from './dictionariesserver'
import { Api } from './api/Api';
import { headers, cookies } from 'next/headers'
import { GlobalProvider } from './GlobalContext';
import { permanentRedirect } from 'next/navigation'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import {cacheKey} from './GlobalVar'

type Props = { params: { lang: string, data: any, slidersdataone: any } }
const fetcher = async (url: any, options: RequestInit = {}) => {
  const slug = url
  const res: any = await fetch(`${Api}${slug}`, { next: { revalidate: 3600 } })
  return res.json()
}

const MobileFooterNew = dynamic(() => import('./components/MobileFooterNew'), { ssr: true })
const notoSans = Noto_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: 'white',
}
export default async function RootLayout({ children, params }: { children: React.ReactNode, params: any }) {
  let globalcity: any = 'Jeddah';
  const headersList = headers()
  const currenturl = headersList.get('next-url')?.split('#')[0]
  const deviceType = headersList.get('device-type')
  const userIP = headersList.get('user-ip')


  // getting city from cookies
  const cookieStore = cookies();
  const city = cookieStore.get('selectedCity')?.value || 'Jeddah';
  params.selectedCity = city
  const userLocation = city
  params.userlocation = city
  const dict = await getDictionary(params.lang);
  params.dict = dict;
  if (!currenturl || currenturl === `/${params.lang}`) {
    const homepagedata = await fetcher(`homepage-frontend?lang=${params.lang}&${cacheKey}`)
    params.data = homepagedata

    const homepagepartonelatest = await fetcher(`homepagelatest-one?lang=${params?.lang}&device_type=${params?.deviceType}&city=${globalcity}&${cacheKey}`)
    params.homepagepartonelatest = homepagepartonelatest

    const homepageparttwolatest = await fetcher(`homepagelatest-two?lang=${params?.lang}&device_type=${params?.deviceType}&city=${globalcity}&${cacheKey}`)
    params.homepageparttwolatest = homepageparttwolatest

    const homepagepartthreelatest = await fetcher(`homepagelatest-three?lang=${params?.lang}&device_type=${params?.deviceType}&city=${globalcity}&${cacheKey}`)
    params.homepagepartthreelatest = homepagepartthreelatest
  }

  return (
    <html lang={params.lang} dir={params.lang == 'ar' ? 'rtl' : 'ltr'} className='nprogress-busy'>
      <body className={params.lang == "ar" ? cairo.className : notoSans.className} suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
        <div className="fixed top-0 w-full z-50">
          <div className="h-1.5" id="loader-spin"></div>
        </div>
        <div className='py-12'></div>
        <MobileFooterNew lang={params?.lang} dict={dict} />
      </body>
    </html>
  )
}
