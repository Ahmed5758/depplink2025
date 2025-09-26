"use client"; // This is a client component 👈🏽

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getDictionary } from "../../dictionaries";
import dayjs from 'dayjs'
import 'dayjs/locale/ar'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import { NewMedia } from '../../api/Api';

import { Navigation } from 'swiper/modules'

export default function BlogDetails({ params }: { params: { lang: string, data: any } }) {
    const [dict, setDict] = useState<any>([]);
    // const [data, setData] = useState<any>(params?.data);

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
            <div className="container py-4">
                {/* BreadCrumbs */}
                <ol className="flex text-[#5D686F] font-medium text-sm">
                    <li><Link href={'https://tamkeenstores.com.sa/' + params.lang}>{params.lang == 'ar' ? 'الصفحة الرئيسي' : 'Home Page'}</Link></li>
                    <li className="before:content-['/'] before:px-1.5"><Link href={`https://tamkeenstores.com.sa/${params.lang}/blogs`}>{params.lang == 'ar' ? 'الصفحة الرئيسي' : 'Blogs'}</Link></li>
                    <li className="text-primary before:content-['/'] before:px-1.5">{params.lang == 'ar' ? params?.data?.data?.name_arabic : params?.data?.data?.name}</li>
                </ol>

                <div className="flex justify-center py-6 px-44">
                    <div className="">
                        <ul className="text-sm flex items-center justify-center gap-x-3 font-bold text-[#004B7A]">
                            <li>{dayjs(params?.data?.data?.created_at).locale(params.lang == 'ar' ? 'ar' : 'en').format("MMM  DD")}</li>
                            <li>|</li>
                            <li>{dayjs(params?.data?.data?.created_at).locale(params.lang == 'ar' ? 'ar' : 'en').endOf('day').fromNow()}</li>
                        </ul>
                        <h1 className="my-4 font-bold text-xl text-[#004B7A] text-center">{params.lang == 'ar' ? params?.data?.data?.name_arabic : params?.data?.data?.name}</h1>
                        <Image
                            src={params?.data?.data?.blog_media_image ? NewMedia + params?.data?.data?.blog_media_image?.image : 'https://partners.tamkeenstores.com.sa/public/assets/new-media/3f4a05b645bdf91af2a0d9598e9526181714129744.png'}
                            alt={(params?.data?.data?.blog_media_image?.alt_arabic && params?.lang == 'ar') ? params?.data?.data?.blog_media_image?.alt_arabic : (params?.data?.data?.blog_media_image?.alt && params?.lang == 'en') ? params?.data?.data?.blog_media_image?.alt : ''}
                            title={(params?.data?.data?.blog_media_image?.title_arabic && params?.lang == 'ar') ? params?.data?.data?.blog_media_image?.title_arabic : (params?.data?.data?.blog_media_image?.title && params?.lang == 'en') ? params?.data?.data?.blog_media_image?.title : ''}
                            quality={100}
                            height={840}
                            width={840}
                            loading='lazy'
                            className='m-auto'
                            sizes="(max-width: 960px) 50vw, (max-width: 1024px) 50vw, (max-width: 1650px) 50vw, (max-width: 1920px) 80vw, 100vw"
                        />
                        <div className="text-xs mt-1.5 leading-5" dangerouslySetInnerHTML={{ __html: params.lang == 'ar' ? params?.data?.data?.description_arabic : params?.data?.data?.description }} />
                    </div>
                </div>

                <div className='my-10 container'>
                    <div className='flex items-center justify-between font-bold'>
                        <h5 className='text-xl'>{params.lang == 'ar' ? 'أحدث منشورات' : 'Recently Added'}</h5>
                        <Link href={`${origin}/${params.lang}/blog`} className='text-[#219EBC] hover:underline'>{params.lang == 'ar' ? 'عـرض الكــل' : 'Show All'}</Link>
                    </div>
                    <div className='mt-4 pb-2 grid grid-cols-5 gap-x-3'>
                        {params?.data?.latestblogs?.map((data: any, i: React.Key | null | undefined) => {
                            return (
                                <Link href={`${origin}/${params.lang}/blog/${data?.slug}`} className="bg-white rounded-md shadow-md" key={i}>
                                    <Image
                                        src={data?.blog_media_image ? NewMedia + data?.blog_media_image?.image : 'https://partners.tamkeenstores.com.sa/public/assets/new-media/3f4a05b645bdf91af2a0d9598e9526181714129744.png'}
                                        alt={(data?.blog_media_image?.alt_arabic && params?.lang == 'ar') ? data?.blog_media_image?.alt_arabic : (data?.blog_media_image?.alt && params?.lang == 'en') ? data?.blog_media_image?.alt : ''}
                                        title={(data?.blog_media_image?.title_arabic && params?.lang == 'ar') ? data?.blog_media_image?.title_arabic : (data?.blog_media_image?.title && params?.lang == 'en') ? data?.blog_media_image?.title : ''}
                                        quality={100}
                                        height={300}
                                        width={300}
                                        loading='lazy'
                                        className="rounded-tl-md rounded-tr-md min-w-full"
                                    />
                                    <div className='mt-10 pb-5 px-3'>
                                        <ul className="text-xs flex items-center gap-x-3 font-medium">
                                            <li>{dayjs(data?.created_at).locale(params.lang == 'ar' ? 'ar' : 'en').format("MMM  DD")}</li>
                                            <li>|</li>
                                            <li>{dayjs(data?.created_at).locale(params.lang == 'ar' ? 'ar' : 'en').endOf('day').fromNow()}</li>
                                        </ul>
                                        <h2 className="mt-4 font-bold text-xs text-[#004B7A] line-clamp-1">{params.lang == 'ar' ? data?.name_arabic : data?.name}</h2>
                                        <div className="text-xs mt-1.5 line-clamp-3 leading-5" dangerouslySetInnerHTML={{ __html: params.lang == 'ar' ? data?.description_arabic : data?.description }} />
                                        <div className="flex items-center justify-between mt-8 text-sm font-bold">
                                            <span className="">{data?.views}{' '}{params.lang == 'ar' ? 'المشاهدات' : 'Views'}</span>
                                            <button className="focus-visible:outline-none btn fill-[#004B7A] text-[#004B7A] font-bold flex items-center gap-x-2">
                                                <span>8</span>
                                                <svg id="fi_3870922" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m489.864 101.1a130.755 130.755 0 0 0 -60.164-50.89c-28.112-11.8-59.687-13.924-91.309-6.127-28.978 7.146-57.204 22.645-82.391 45.129-25.189-22.486-53.418-37.986-82.4-45.131-31.623-7.8-63.2-5.674-91.312 6.134a130.755 130.755 0 0 0 -60.161 50.9c-15.02 23.744-22.661 52.619-22.097 83.5 2.504 137.285 207.006 262.122 247.976 285.755a16 16 0 0 0 15.989 0c40.974-23.636 245.494-148.495 247.976-285.779.558-30.879-7.086-59.751-22.107-83.491zm-9.887 82.916c-.8 44.388-30.39 96.139-85.563 149.655-51.095 49.558-109.214 86.912-138.414 104.293-29.2-17.378-87.31-54.727-138.4-104.287-55.176-53.512-84.766-105.259-85.576-149.646-.884-48.467 22.539-87.462 62.656-104.313a106.644 106.644 0 0 1 41.511-8.238c36.795 0 75.717 17.812 108.4 51.046a16 16 0 0 0 22.815 0c45.406-46.17 102.85-62.573 149.9-42.811 40.121 16.845 63.547 55.834 62.671 104.298z"></path></svg>
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
