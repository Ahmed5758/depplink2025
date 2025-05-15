"use client"; // This is a client component 👈🏽

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { getDictionary } from "../dictionaries"

const MobileHeader = dynamic(() => import('../components/MobileHeader'), { ssr: true })

export default function TamkeenWallet({ params }: { params: { lang: string, data: any, devicetype: any } }) {
    const [dict, setDict] = useState<any>([]);
    const [data, setData] = useState<any>(params?.data?.data);

    useEffect(() => {
        (async () => {
            const translationdata = await getDictionary(params.lang);
            setDict(translationdata);
        })();
    })

    return (
        <>
                <MobileHeader type="Third"  lang={params.lang} pageTitle={params.lang == 'ar' ? 'محفظة تمكين' : 'Tamkeen Wallet'} />
            <div className="container py-16 md:py-4">
                {/* BreadCrumbs */}
                <div className="md:my-6 w-full">
                    <div className="text-sm text-[#5D686F] mt-3" dangerouslySetInnerHTML={{ __html: params.lang == 'ar' ? data?.page_content_ar : data?.page_content_en }}></div>
                </div>
            </div>
        </>
    )
}
