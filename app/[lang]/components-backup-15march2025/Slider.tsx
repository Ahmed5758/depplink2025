'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'


export default function Slider(props: any) {
    return (
        <>
            {props.type == 'main' ?
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {[...Array(4)].map((_, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <Link href="#">
                                    <Image
                                        src="https://cdn-media.tamkeenstores.com.sa/cdn-cgi/imagedelivery/Jw_qf5oljXy0QDE-Fq4W9Q/a305bcdc-4371-4044-6ed2-80fce934d300/h=500"
                                        alt='logo'
                                        title='Tamkeen Logo'
                                        quality={100}
                                        height={0}
                                        width={0}
                                        loading='lazy'
                                        className='w-full h-auto rounded-br-md rounded-bl-md'
                                        sizes="(max-width: 960px) 50vw, (max-width: 1024px) 50vw, (max-width: 1650px) 50vw, (max-width: 1920px) 100vw, 100vw"
                                    />
                                </Link>
                            </SwiperSlide>
                        )
                    })
                    }
                </Swiper>
                :
                props.type == 'categories' ?
                    <></>
                    // <Swiper
                    //     navigation={false}
                    //     modules={[Navigation]}
                    //     className="mySwiper"
                    //     pagination={{
                    //         clickable: true,
                    //     }}
                    //     breakpoints={{
                    //         350: {
                    //             slidesPerView: 3,
                    //             spaceBetween: 20,
                    //         },
                    //         960: {
                    //             slidesPerView: 4,
                    //             spaceBetween: 20,
                    //         },
                    //         1140: {
                    //             slidesPerView: 5,
                    //             spaceBetween: 20,
                    //         },
                    //         1440: {
                    //             slidesPerView: 6,
                    //             spaceBetween: 20,
                    //         },
                    //         1920: {
                    //             slidesPerView: 8,
                    //             spaceBetween: 20,
                    //         },
                    //     }}
                    // >
                    //     {props?.data.map((data: any, i: number) => {
                    //         return (
                    //             <SwiperSlide key={i}>
                    //                 <div className='bg-white p-3.5 w-200 h-200 rounded-lg shadow-md text-center mb-1.5'>
                    //                     <Link href={`/${props.lang}/category/${data?.slug}`}>
                    //                         <Image
                    //                             src={data?.web_media_image ? data?.web_media_image?.file_url + 'h=300' : ''}
                    //                             alt={props.lang === 'ar' ? data.name_arabic : data.name}
                    //                             title={props.lang === 'ar' ? data.name_arabic : data.name}
                    //                             quality={100}
                    //                             height={160}
                    //                             width={160}
                    //                             loading='lazy'
                    //                             className='mx-auto'
                    //                         // sizes="(max-width: 960px) 50vw, (max-width: 1024px) 50vw, (max-width: 1650px) 50vw, (max-width: 1920px) 80vw, 100vw"
                    //                         />
                    //                         <h4 className='text-sm text-primary font-[500] mt-4'>{props.lang === 'ar' ? data.name_arabic : data.name}</h4>
                    //                         <p className='text-xs text-primary opacity-50 mt-1'>{props.lang === 'ar' ? '+' + data.productname_count + ' منتج' : '+' + data.productname_count + ' Products'}</p>
                    //                     </Link>
                    //                 </div>
                    //             </SwiperSlide>
                    //         )
                    //     })
                    //     }
                    // </Swiper>
                    //    <div className='mt-4 pb-2'>
                    //     <Slider type="categories" lang={params.lang} data={homepagedata?.categories} />
                    //     <div className="mt-3" />
                    //     <Slider type="categories" lang={params.lang} data={homepagedata?.categories} />
                    //   </div>
                    : null}

        </>
    );
}