"use client"; // This is a client component 👈🏽

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getDictionary } from "../dictionaries";

export default function WarrantyPolicy({ params }: { params: { lang: string, data: any } }) {
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
            <div className="container py-4">
                {/* BreadCrumbs */}
                <ol className="flex text-gray-500  font-semibold dark:text-white-dark">
                    <li className="text-sm text-[#5D686F] font-semibold"><Link href={'https://tamkeenstores.com.sa/' + params.lang}>{params.lang == 'ar' ? 'الصفحة الرئيسي' : 'Home Page'}</Link></li>
                    <li className="text-sm text-primary font-medium before:content-['/'] before:px-1.5">{params.lang == 'ar' ? 'سياسة الضمان' : 'Warranty Policy'}</li>
                </ol>

                <div className="my-6">
                    <h1 className=" font-semibold text-lg 2xl:text-xl">{params.lang == 'ar' ? 'سياسة الضمان' : 'Warranty Policy'}</h1>
                    <div className="text-sm text-[#5D686F] mt-3" dangerouslySetInnerHTML={{ __html: params.lang == 'ar' ? data?.page_content_ar : data?.page_content_en }}></div>
                </div>
            </div>
        </>
    )
}
