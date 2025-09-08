
import './globals.css'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Cairo, Noto_Sans } from 'next/font/google'
import Providers from './providers';

import { getDictionary } from './dictionariesserver'
import { Api } from './api/Api';
import { headers, cookies } from 'next/headers'
import { cacheKey } from './GlobalVar'
import LayoutWrapper from './LayoutWrapper'
import GTM from './components/GTM'
import LoginGuard from './components/LoginGuard'
import { GlobalProvider } from './GlobalContext';
import Script from 'next/script';
import ReloadRefresh from './components/ReloadRefresh';
import ConnectionStatus from './components/ConnectionStatus';

type Props = { params: { lang: string, data: any, slidersdataone: any } }
const fetcher = async (url: any, options: RequestInit = {}) => {
  const slug = url
  const res: any = await fetch(`${Api}${slug}`, { next: { revalidate: 7200 } })
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


  // getting city from cookies
  const cookieStore = cookies();
  const city = cookieStore.get('selectedCity')?.value || 'Jeddah';
  params.selectedCity = city
  const userLocation = city
  params.userlocation = city
  const dict = await getDictionary(params.lang);
  params.dict = dict;
  let homepageProps = {}
  if (!currenturl || currenturl === `/${params.lang}`) {
    const homepagedata = await fetcher(`homepage-frontend?lang=${params.lang}&${cacheKey}`)
    const homepagepartonelatest = await fetcher(`homepagelatest-one?lang=${params?.lang}&device_type=mobile&city=${globalcity}&${cacheKey}`)
    const homepageparttwolatest = await fetcher(`homepagelatest-two?lang=${params?.lang}&device_type=mobile&city=${globalcity}&${cacheKey}`)
    const homepagepartthreelatest = await fetcher(`homepagelatest-three?lang=${params?.lang}&device_type=mobile&city=${globalcity}&${cacheKey}`)
    homepageProps = {
      homepagedata,
      homepagepartonelatest,
      homepageparttwolatest,
      homepagepartthreelatest,
    }
  }

  return (
    <html lang={params?.lang} dir={params.lang == 'ar' ? 'rtl' : 'ltr'} className='nprogress-busy'>
      <head>
        <GTM />
        <Script src="/WebEngagge.js" strategy="afterInteractive" />
        {/* <WebEngage /> */}
      </head>
      <body className={params.lang == "ar" ? cairo.className : notoSans.className} suppressHydrationWarning={true}>
        <GlobalProvider>
          <Providers>
            <ReloadRefresh lang={params?.lang} idleMs={30 * 60 * 1000} /> {/* 30 mins */}
            <LayoutWrapper homepageProps={homepageProps}>
              <LoginGuard />
              {children}
              <ConnectionStatus />
            </LayoutWrapper>
          </Providers>
          <div className="fixed top-0 w-full z-50">
            <div className="h-1.5" id="loader-spin"></div>
          </div>
          <MobileFooterNew lang={params?.lang} dict={dict} />
        </GlobalProvider>
      </body>
    </html>
  )
}
