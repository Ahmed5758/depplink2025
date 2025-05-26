"use client"; // This is a client component 👈🏽

import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { get } from "../api/ApiCalls"
import { getDictionary } from "../dictionaries"
import { useRouter, usePathname } from 'next/navigation'

const MobileHeader = dynamic(() => import('../components/MobileHeader'), { ssr: true })

export default function Notifications({ params }: { params: { lang: string, data: any, devicetype: any } }) {
    const router = useRouter()
    const [dict, setDict] = useState<any>([])
    const [data, setData] = useState<any>(params?.data?.data)
    const [notificationsListing, setNotificationsListing] = useState([])

    const getNotificationData = async () => {
        await get(`notifications`).then((responseJson: any) => {
            setNotificationsListing(responseJson?.data)
        })
    }

    useEffect(() => {
        (async () => {
            const translationdata = await getDictionary(params.lang);
            setDict(translationdata);
        })();
        getNotificationData()
    }, [params])
    return (
        <>
            <MobileHeader type="Third" lang={params.lang} pageTitle={params.lang === 'ar' ? 'إشعارات' : 'Notifications'} />
            <div className="container py-16 md:py-4">
                {notificationsListing?.map((data: any, i: any) => (
                    <button onClick={() => router.push(data?.link)} className="focus-visible:outline-none bg-white shadow-md rounded-md pb-2 text-left w-full mb-3" key={data?.id + i}>
                        {data?.image ?
                            <Image src={data?.image} alt={params.lang === 'ar' ? data?.title_arabic : data?.title} title={params.lang === 'ar' ? data?.title_arabic : data?.title} height={0} width={0} className="h-auto w-full rounded-tl-md rounded-tr-md"
                                sizes='100vw'
                            />
                            : null}
                        <div className="mt-3 px-2">
                            <h6 className="font-semibold text-base text-[#004B7A]">{params.lang === 'ar' ? data?.title_arabic : data?.title}</h6>
                            <small className="font-medium text-[#000000]">{params.lang === 'ar' ? data?.message_arabic : data?.message}</small>

                            <div className="mt-4">
                                <small className="font-medium text-[#5D686F] text-xs">{moment(data?.created_at?.split('T')[0]).format('MMMM Do, YYYY | h:mm A')}</small>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </>
    )
}
