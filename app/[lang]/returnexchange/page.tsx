"use client"; // This is a client component 👈🏽

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getDictionary } from "../dictionaries"
import dynamic from 'next/dynamic';

const MobileHeader = dynamic(() => import('../components/MobileHeader'), { ssr: true })

export default function RepalcementandRetrievalPolicy({ params }: { params: { lang: string, data: any, devicetype: any } }) {
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
                <MobileHeader type="Third"  lang={params.lang} pageTitle={params.lang == 'ar' ? 'الاسئلة والاجوبة' : 'Terms and Conditions'} />
            <div className="container py-16 md:py-4">
                <div className="md:my-6 w-full">
                    <div className="text-sm text-[#5D686F] mt-3" dangerouslySetInnerHTML={{ __html: params.lang == 'ar' ? data?.page_content_ar : data?.page_content_en }}></div>
                </div>
            </div>
        </>
    )
}
