
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

type Props = { params: { lang: string, data: any, slidersdataone: any } }
const fetcher = async (url: any, options: RequestInit = {}) => {
  const slug = url
  const res: any = await fetch(`${Api}${slug}`, { next: { revalidate: 3600 } })
  return res.json()
}

const MobileFooter = dynamic(() => import('./components/MobileFooter'), { ssr: true })
const Footer = dynamic(() => import('./components/Footer'), { ssr: false })
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
  const headersList = headers()
  const currenturl = headersList.get('next-url')?.split('#')[0]
  const deviceType = headersList.get('device-type')
  const userIP = headersList.get('user-ip')
  params.devicetype = deviceType


  // getting city from cookies
  const cookieStore = cookies();
  const city = cookieStore.get('selectedCity')?.value || 'Jeddah';
  params.selectedCity = city
  const userLocation = city
  params.userlocation = city
  if (deviceType === 'desktop') {
    permanentRedirect(`https://tamkeenstores.com.sa/${params?.lang}`)
  }
  const dict = await getDictionary(params.lang);
  params.dict = dict;
  // if (currenturl === `/${params.lang}`) {
    const homepagedata = await fetcher(`homepage-frontend?lang=${params.lang}`, { next: { revalidate: 36000 } })
    params.data = homepagedata


    //homepage part two
    const homepageparttwonew = await fetcher(`homepagetwo-secone?lang=${params.lang}`, { next: { revalidate: 36000 } })
    params.homepageparttwonew = homepageparttwonew

    const homepageparttwosecTwo = await fetcher(`homepagetwo-sectwo?lang=${params.lang}&device_type=${params.devicetype}`, { next: { revalidate: 36000 } })
    params.homepageparttwoSecTwo = homepageparttwosecTwo

    const homepageparttwosecThree = await fetcher(`homepagetwo-secthree?lang=${params.lang}&device_type=${params.devicetype}`, { next: { revalidate: 36000 } })
    params.homepageparttwoSecThree = homepageparttwosecThree

  // }

  return (
    <html lang={params.lang} dir={params.lang == 'ar' ? 'rtl' : 'ltr'} className='nprogress-busy'>
      <body className={params.lang == "ar" ? cairo.className : notoSans.className} suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
        <div className="fixed bottom-16 w-full z-40">
          <div className="h-2" id="loader-spin"></div>
        </div>
        <Footer lang={params.lang} dict={dict} />
        <MobileFooter lang={params.lang} dict={dict} />
      </body>
    </html>
  )
}
