"use client"; // This is a client component 👈🏽

import dynamic from 'next/dynamic'
import { Api } from '../../../api/Api'
import React, { useEffect, useState } from 'react'
import { getDictionary } from "../../../dictionaries"

const MobileHeader = dynamic(() => import('../../../components/MobileHeader'), { ssr: true })

export default function Card({ params }: { params: { lang: string, slug: any } }) {
    const [dict, setDict] = useState<any>([]);
    useEffect(() => {
        (async () => {
            const translationdata = await getDictionary(params.lang);
            setDict(translationdata);
        })();
    })

    return (
        <>
            <MobileHeader type="Third"  lang={params.lang} pageTitle={params.lang === 'ar' ? 'بوابة الدفع الآمنة' : 'Secure Payment'} />
            <div className="container py-32 md:py-32">
                <iframe className='w-full h-[800px]' src={Api + 'hyperpay/' + params.slug + '/' + params.lang}></iframe>
            </div>
        </>
    )
}
