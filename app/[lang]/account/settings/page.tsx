"use client"; // This is a client component 👈🏽

import React, { useEffect, useState, Fragment, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { getDictionary } from "../../dictionaries"
import { usePathname } from "next/navigation"
import { useRouter } from 'next-nprogress-bar'

const AccountSidebar = dynamic(() => import('../../components/AccountSidebar'), { ssr: false })

export default function Settings({ params }: { params: { lang: string } }) {
    const [dict, setDict] = useState<any>([]);
    useEffect(() => {
        (async () => {
            const translationdata = await getDictionary(params.lang);
            setDict(translationdata);
        })();
    })

    const router = useRouter();
    const path = usePathname();
    
    return (
        <>
            <div className="container py-4">
               
                <div className="flex items-start my-4 gap-x-5">
                    <AccountSidebar lang={params.lang} path={path}/>
                    
                    <div className="w-full">
                        <div className='flex items-center justify-between mb-5'>
                            <h3 className='text-base'>{params.lang == 'ar' ? 'قائـمة طلبــاتك' : 'List your requests'}</h3>
                        </div>

                        <div className="bg-white rounded-md shadow-md flex justify-start items-center mb-5">
                            <h1>test</h1>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}