"use client"; // This is a client component 👈🏽

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getDictionary } from "../dictionaries";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { MdOutlinePhone } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { usePathname } from "next/navigation"
import { useRouter } from 'next-nprogress-bar';

export default function resetUsername({ params }: { params: { lang: string } }) {
    const [dict, setDict] = useState<any>([]);
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        (async () => {
            const translationdata = await getDictionary(params.lang);
            setDict(translationdata);
        })();
    })

    const resetUser: any = () => {
        router.push("/" + params.lang + '/resetpassword');
    }

    return (
        <>
            {/* Login Page Header */}
            <div className="bg-white py-3 shadow-md absolute w-full top-0">
                <div className="container grid grid-cols-2">
                    <div>
                        <Image
                            src="/images/logo.webp"
                            alt='logo'
                            title='Tamkeen Logo'
                            quality={100}
                            height={90}
                            width={90}
                            style={{ maxHeight: 90, maxWidth: 90 }}
                            loading='lazy'
                            sizes="(max-width: 960px) 50vw, (max-width: 1024px) 50vw, (max-width: 1650px) 50vw, (max-width: 1920px) 80vw, 100vw"
                        />
                    </div>
                    <div className='flex gap-x-8 items-center justify-end'>
                        <Link href="#" className='text-sm 2xl:text-base gap-x-1.5 flex items-center text-primary hover:text-secondary'>{params.lang == 'ar' ? 'English' : 'Arabic'}</Link>
                        <Link href="tel:8002444464" className='text-sm 2xl:text-base gap-x-1.5 flex items-center text-primary hover:text-secondary'><span><MdOutlinePhone className="shrink-0 h-4 w-4 2xl:h-5 2xl:w-5 text-[#219EBC]" /></span>8002444464</Link>
                        <Link href="#" className='text-sm 2xl:text-base gap-x-1.5 flex items-center text-primary hover:text-secondary'><span><BiMessageRoundedDetail className="shrink-0 h-4 w-4 2xl:h-5 2xl:w-5 text-[#219EBC]" /></span>{dict?.login?.support}</Link>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div className="h-[100vh] bg-primary "></div>
                <div className="h-auto mt-16 py-8 px-6">
                    <div className='w-[600px] 2xl:w-[730px]'>
                        <h1 className=" font-semibold text-xl 2xl:text-2xl">هل نسيـت كلمة المرور الخاصة بك</h1>
                        <p className='text-[#5D686F] text-sm 2xl:text-base mt-1.5'>يرجي ادخال واكمال البيانات التالية</p>

                        <form className="mt-8">
                            <div className=''>
                                <label className="text-sm 2xl:text-base font-medium text-[#344054]">{dict?.login?.userName}</label>
                                <div className="flex items-center justify-between border border-[#20831E] focus-visible:outline-none hover:border-primary bg-white rounded mt-1">
                                    <div className="flex items-center">
                                        <div className="flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md p-3">
                                            <CiMail className="shrink-0 h-5 w-5 2xl:h-5 2xl:w-5 text-primary" />
                                        </div>
                                        <input id="iconLeft" type="mail" placeholder={dict?.login?.email} className="text-sm 2xl:text-base p-3 focus-visible:outline-none w-[500px]" />
                                    </div>
                                    <div className="p-3">
                                        <FaCheck className="shrink-0 h-5 w-5 2xl:h-5 2xl:w-5 text-[#20831E]" />
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div className="bg-primp-3 absolute bottom-10 w-[600px] 2xl:w-[730px] ">
                            <button onClick={() => resetUser()} className='focus-visible:outline-none btn btn-prmary w-full bg-[#004B7A] p-3 rounded-md text-white'>{dict?.login?.resetLink}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
function resetUser<T>() {
    throw new Error('Function not implemented.');
}

