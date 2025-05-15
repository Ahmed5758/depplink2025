"use client"; // This is a client component 👈🏽

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { NewMedia } from '../api/Api'
import { get } from "../api/ApiCalls"
import { getDictionary } from "../dictionaries"
import dynamic from 'next/dynamic';

const MobileHeader = dynamic(() => import('../components/MobileHeader'), { ssr: true })

export default function AboutUs({ params }: { params: { lang: string, data: any } }) {
    const [dict, setDict] = useState<any>([]);
    const [brandsData, setBrandsData] = useState<any>([]);
    const getBrandsData = async () => {
        await get(`get-brands`).then((responseJson: any) => {
            setBrandsData(responseJson?.brands)
        })
    }

    useEffect(() => {
        (async () => {
            const translationdata = await getDictionary(params.lang);
            setDict(translationdata);
        })();
        getBrandsData()
    }, [params])

    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';

    return (
        <>
            <MobileHeader type="Third" lang={params.lang} pageTitle={params.lang == 'ar' ? 'تسوق حسب العلامة التجارية' : `Shop By Brand's`} />

            <div className="container md:py-4 py-16">
                <div className="my-6">
                    <h1 className=" font-semibold text-lg 2xl:text-xl hidden md:block">{params.lang == 'ar' ? 'تسوق حسب العلامة التجارية' : `Shop By Brand's`}</h1>
                    <div className={`grid grid-cols-2 md:mt-4 gap-3`}>
                        {brandsData?.map((data: any, i: number) => {
                            return (
                                <div className='bg-white h-auto relative p-2 rounded-lg shadow-md text-sm' key={data?.id}>
                                    <Link
                                        replace={true}
                                        prefetch={true}
                                        href={`${origin}/${params.lang}/brand/${data.slug}`}
                                        aria-label={params.lang == 'ar' ? '' : ''}
                                    >
                                        <Image
                                            src={data?.brand_media_image ? NewMedia + data?.brand_media_image?.image : ''}
                                            alt={params.lang === 'ar' ? data?.name_arabic : data?.name}
                                            title={params.lang === 'ar' ? data?.name_arabic : data?.name}
                                            quality={100}
                                            height={150}
                                            width={150}
                                            loading='lazy'
                                            className='mx-auto'
                                        />
                                    </Link>
                                    {data?.categories?.length ?
                                        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mt-8 gap-y-4'>
                                            {data?.categories?.map((categoryData: any, k: number) => {
                                                return (
                                                    <Link
                                                        replace={true}
                                                        prefetch={true}
                                                        key={k}
                                                        href={`${origin}/${params.lang}/category/${categoryData?.slug}?page=1&brand=${data?.name.split(' ').join('+')}`}
                                                        aria-label={params.lang == 'ar' ? categoryData?.name_arabic : categoryData?.name}
                                                        className='text-center p-3 bg-white hover:bg-[#219EBC40] hover:fill-primary rounded-md opacity-50 hover:opacity-100'
                                                    >
                                                        <div className="flex items-center justify-center" dangerouslySetInnerHTML={{ __html: categoryData?.icon }}></div>
                                                        <p className='mt-3 text-xs font-[500] text-primary line-clamp-1'>{params.lang == 'ar' ? categoryData?.name_arabic : categoryData?.name}</p>
                                                    </Link>
                                                )
                                            })
                                            }
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
