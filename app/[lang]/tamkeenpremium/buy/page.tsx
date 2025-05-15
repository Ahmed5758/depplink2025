"use client"; // This is a client component 👈🏽

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next-nprogress-bar'
import { getDictionary } from "../../dictionaries"
import React, { useEffect, useState } from 'react'

export default function Buy({ params }: { params: { lang: string, data: any, devicetype: any } }) {
    const router = useRouter()
    const [dict, setDict] = useState<any>([]);
    const [data, setData] = useState<any>(params?.data?.data);
    useEffect(() => {
        if (!params?.devicetype)
            router.refresh()
    }, [params])
    useEffect(() => {
        (async () => {
            const translationdata = await getDictionary(params.lang);
            setDict(translationdata);
        })();
    })

    const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

    return (
        <>
            <div className="container py-4 max-md:pt-20">

                <div className="my-8 w-1/2 mx-auto">
                    <Link href={`/${params.lang}/giftcards`} className="flex items-center gap-x-1">
                        <svg height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg" id="fi_2722991"><g id="_17" data-name="17"><path d="m15 19a1 1 0 0 1 -.71-.29l-6-6a1 1 0 0 1 0-1.41l6-6a1 1 0 0 1 1.41 1.41l-5.29 5.29 5.29 5.29a1 1 0 0 1 -.7 1.71z"></path></g></svg>
                        <h1 className="text-lg font-bold line-clamp-1">Confirm & Pay</h1>
                    </Link>

                    <div className='w-full border border-[#dfdfdf70] my-2'></div>
                    <div className="flex items-center gap-x-3 text-sm font-semibold">
                    </div>
                    <div className="flex items-start gap-x-5 mt-3">
                        <div className="w-1/2">
                            <div className="shadow-lg rounded-2xl">
                                <Image
                                    src="/images/37817.png"
                                    alt="giftCard"
                                    title="Gift Cards"
                                    height={450}
                                    width={450}
                                />
                            </div>
                            <div className="py-5 px-2 bg-gray/10 mt-3 shadow-md rounded-md flex items-center gap-4">
                                <div className="text-xs">
                                    <label className="font-normal">{params.lang === 'ar' ? 'كمية' : 'Validity'}</label>
                                    <p className="font-semibold mt-2 text-sm text-[#000000]">1{' '}{params.lang === 'ar' ? 'سنة' : 'Year'}</p>
                                </div>

                                <div className="text-xs">
                                    <label className="font-normal">{params.lang === 'ar' ? 'الدفع ببطاقة الهدايا' : 'Tamkeen Premium (Silver)'}</label>
                                    <p className="font-semibold mt-2 text-sm text-[#000000]">{params.lang === 'ar' ? '' : 'SR'}{' '}5,00.00{' '}{params.lang === 'ar' ? 'ر.س' : ''}</p>
                                </div>
                            </div>
                        </div>
                        <div className='h-[480px] border border-l border-[#dfdfdf70]'></div>
                        <div className="w-1/2">
                            <h3 className="text-base font-semibold">Payment Method</h3>
                            <div className="fill-[#5D686F90] flex items-center gap-1 mt-1 text-[#5D686F90]">
                                <svg height="12" viewBox="0 0 24 24" width="12" xmlns="http://www.w3.org/2000/svg" id="fi_9446643"><g><path d="m12.75 11c0-.4142-.3358-.75-.75-.75s-.75.3358-.75.75v6c0 .4142.3358.75.75.75s.75-.3358.75-.75z"></path><path clipRule="evenodd" d="m12 1.25c-5.93706 0-10.75 4.81294-10.75 10.75 0 5.9371 4.81294 10.75 10.75 10.75 5.9371 0 10.75-4.8129 10.75-10.75 0-5.93706-4.8129-10.75-10.75-10.75zm-9.25 10.75c0-5.10863 4.14137-9.25 9.25-9.25 5.1086 0 9.25 4.14137 9.25 9.25 0 5.1086-4.1414 9.25-9.25 9.25-5.10863 0-9.25-4.1414-9.25-9.25z" fillRule="evenodd"></path><path d="m13 8c0 .55228-.4477 1-1 1s-1-.44772-1-1 .4477-1 1-1 1 .44772 1 1z"></path></g></svg>
                                <label className="text-[11px]">We accept all card's accept installment plans</label>
                            </div>
                            <div className="my-4 flex items-center justify-between">
                                <p className="text-xs font-semibold">{params.lang === 'ar' ? 'البطاقات المدعومة' : 'Supported Cards'}</p>
                                <div className="flex items-center gap-x-2">
                                    <Image
                                        src="/images/mada.webp"
                                        alt="madapay"
                                        title="Mada Pay"
                                        height={40}
                                        width={40}
                                    />
                                    <Image
                                        src="/images/visa.webp"
                                        alt="visa"
                                        title="Visa"
                                        height={40}
                                        width={40}
                                    />
                                    <Image
                                        src="/images/master.webp"
                                        alt="master"
                                        title="Master Pay"
                                        height={35}
                                        width={35}
                                    />
                                    <Image
                                        src="/images/applepay.webp"
                                        alt="madapay"
                                        title="Mada Pay"
                                        height={30}
                                        width={35}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-3 my-3">
                                <button className="focus-visible:outline-none p-1 border border-[#004B7A] rounded-md hover:border-[#004B7A]">
                                    <Image
                                        src="/images/mada.webp"
                                        alt="giftCard"
                                        title="Gift Cards"
                                        height={200}
                                        width={200}
                                        loading='lazy'
                                    />
                                </button>
                                <button className="focus-visible:outline-none p-1 border border-[#dfdfdf70] rounded-md hover:border-[#004B7A]">
                                    <Image
                                        src="/images/visa.webp"
                                        alt="giftCard"
                                        title="Gift Cards"
                                        height={200}
                                        width={200}
                                        loading='lazy'
                                    />
                                </button>
                                <button className="focus-visible:outline-none p-1 border border-[#dfdfdf70] rounded-md hover:border-[#004B7A]">
                                    <Image
                                        src="/images/master.webp"
                                        alt="giftCard"
                                        title="Gift Cards"
                                        height={200}
                                        width={200}
                                        loading='lazy'
                                    />
                                </button>
                                <button className="focus-visible:outline-none p-1 border border-[#dfdfdf70] rounded-md hover:border-[#004B7A]">
                                    <Image
                                        src="/images/applepay.webp"
                                        alt="giftCard"
                                        title="Gift Cards"
                                        height={200}
                                        width={200}
                                        loading='lazy'
                                    />
                                </button>
                                <button className="focus-visible:outline-none p-1 border border-[#dfdfdf70] rounded-md hover:border-[#004B7A]">
                                    <Image
                                        src="/images/giftCardsMockeup.webp"
                                        alt="giftCard"
                                        title="Gift Cards"
                                        height={200}
                                        width={200}
                                        loading='lazy'
                                    />
                                </button>
                            </div>
                            <form className="">
                                <div className=''>
                                    <label className="text-sm font-medium text-[#344054]">{params.lang == 'ar' ? 'الاسم بالكامل' : `Receiver's Name`}</label>
                                    <div className="border border-[#dfdfdf70] focus-visible:outline-none hover:border-[#004B7A] bg-white rounded p-2">
                                        <div className="flex items-center gap-3 fill-[#004B7A]">
                                            <svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" id="fi_9308008"><g><path d="m12 12.75c-3.17 0-5.75-2.58-5.75-5.75s2.58-5.75 5.75-5.75 5.75 2.58 5.75 5.75-2.58 5.75-5.75 5.75zm0-10c-2.34 0-4.25 1.91-4.25 4.25s1.91 4.25 4.25 4.25 4.25-1.91 4.25-4.25-1.91-4.25-4.25-4.25z"></path><path d="m20.5901 22.75c-.41 0-.75-.34-.75-.75 0-3.45-3.5199-6.25-7.8399-6.25-4.32005 0-7.84004 2.8-7.84004 6.25 0 .41-.34.75-.75.75s-.75-.34-.75-.75c0-4.27 4.18999-7.75 9.34004-7.75 5.15 0 9.3399 3.48 9.3399 7.75 0 .41-.34.75-.75.75z"></path></g></svg>
                                            <input id="iconLeft" type="text" placeholder={params.lang == 'ar' ? 'الاسم بالكامل' : 'Full Name'} className="text-xs focus-visible:outline-none w-full" />
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-2'>
                                    <label className="text-sm font-medium text-[#344054]">{params.lang == 'ar' ? 'بريد إلكتروني' : `Receiver's E-mail`}</label>
                                    <div className="border border-[#dfdfdf70] focus-visible:outline-none hover:border-[#004B7A] bg-white rounded p-2">
                                        <div className="flex items-center gap-3 fill-[#004B7A]">
                                            <svg id="fi_2549872" height="22" viewBox="0 0 125 125" width="22" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m105.182 97.82h-85.364a10.477 10.477 0 0 1 -10.465-10.466v-52.72a10.477 10.477 0 0 1 10.465-10.466h85.364a10.477 10.477 0 0 1 10.465 10.466v52.72a10.477 10.477 0 0 1 -10.465 10.466zm-85.364-69.652a6.472 6.472 0 0 0 -6.465 6.466v52.72a6.472 6.472 0 0 0 6.465 6.466h85.364a6.472 6.472 0 0 0 6.465-6.466v-52.72a6.472 6.472 0 0 0 -6.465-6.466z"></path><path d="m62.5 72.764a2 2 0 0 1 -1.324-.5l-48.2-42.548 2.647-3 46.877 41.384 46.879-41.379 2.647 3-48.2 42.548a1.994 1.994 0 0 1 -1.326.495z"></path><path d="m5.012 72.393h49.061v4h-49.061z" transform="matrix(.66 -.752 .752 .66 -45.859 47.529)"></path><path d="m93.454 49.862h4v49.062h-4z" transform="matrix(.752 -.66 .66 .752 -25.361 81.43)"></path></svg>
                                            <input id="iconLeft" type="text" placeholder={params.lang == 'ar' ? 'بريد إلكتروني' : 'E-mail'} className="text-xs focus-visible:outline-none w-full" />
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-2'>
                                    <label className="text-sm font-medium text-[#344054]">{params.lang == 'ar' ? 'رقم التليفون' : `Receiver's Phone Number`}</label>
                                    <div className="border border-[#dfdfdf70] focus-visible:outline-none hover:border-[#004B7A] bg-white rounded p-2">
                                        <div className="flex items-center gap-3 fill-[#004B7A]">
                                            <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg" id="fi_3059407"><g id="Layer_3" data-name="Layer 3"><path d="m30.035 22.594c-.053-.044-6.042-4.33-7.667-4.049-.781.138-1.228.67-2.123 1.737-.144.172-.491.583-.759.876a12.458 12.458 0 0 1 -1.651-.672 13.7 13.7 0 0 1 -6.321-6.321 12.458 12.458 0 0 1 -.672-1.651c.294-.269.706-.616.882-.764 1.061-.89 1.593-1.337 1.731-2.119.283-1.619-4.005-7.613-4.049-7.667a2.289 2.289 0 0 0 -1.706-.964c-1.738 0-6.7 6.436-6.7 7.521 0 .063.091 6.467 7.988 14.5 8.024 7.888 14.428 7.979 14.491 7.979 1.085 0 7.521-4.962 7.521-6.7a2.287 2.287 0 0 0 -.965-1.706zm-6.666 6.4c-.874-.072-6.248-.781-12.967-7.382-6.635-6.755-7.326-12.144-7.395-12.979a27.054 27.054 0 0 1 4.706-5.561c.04.04.093.1.161.178a35.391 35.391 0 0 1 3.574 6.063 11.886 11.886 0 0 1 -1.016.911 10.033 10.033 0 0 0 -1.512 1.422l-.243.34.072.411a11.418 11.418 0 0 0 .965 2.641 15.71 15.71 0 0 0 7.248 7.247 11.389 11.389 0 0 0 2.641.966l.411.072.34-.243a10.117 10.117 0 0 0 1.428-1.518c.313-.374.732-.873.89-1.014a35.163 35.163 0 0 1 6.078 3.578c.083.07.141.124.18.159a27.031 27.031 0 0 1 -5.561 4.707z"></path></g></svg>
                                            <input id="iconLeft" type="text" placeholder={params.lang == 'ar' ? 'رقم التليفون' : 'Phone Number'} className="text-xs focus-visible:outline-none w-full" />
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div className="mt-5">
                                <div className="fill-[#5D686F90] flex items-center gap-1 mb-1.5 text-[#5D686F90]">
                                    <svg height="12" viewBox="0 0 24 24" width="12" xmlns="http://www.w3.org/2000/svg" id="fi_9446643"><g><path d="m12.75 11c0-.4142-.3358-.75-.75-.75s-.75.3358-.75.75v6c0 .4142.3358.75.75.75s.75-.3358.75-.75z"></path><path clipRule="evenodd" d="m12 1.25c-5.93706 0-10.75 4.81294-10.75 10.75 0 5.9371 4.81294 10.75 10.75 10.75 5.9371 0 10.75-4.8129 10.75-10.75 0-5.93706-4.8129-10.75-10.75-10.75zm-9.25 10.75c0-5.10863 4.14137-9.25 9.25-9.25 5.1086 0 9.25 4.14137 9.25 9.25 0 5.1086-4.1414 9.25-9.25 9.25-5.10863 0-9.25-4.1414-9.25-9.25z" fillRule="evenodd"></path><path d="m13 8c0 .55228-.4477 1-1 1s-1-.44772-1-1 .4477-1 1-1 1 .44772 1 1z"></path></g></svg>
                                    <label className="text-[11px]">Tamkeen Premium Subscription is valid for 1 year from the date of purchase</label>
                                </div>
                                <button className="bg-[#004B7A] focus-visible:outline-none w-full p-3 rounded-md text-white text-sm" aria-label="proceed-to-buy">
                                    {params.lang === 'ar' ? 'الشروع في الشراء' : 'Proceed to Pay'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
