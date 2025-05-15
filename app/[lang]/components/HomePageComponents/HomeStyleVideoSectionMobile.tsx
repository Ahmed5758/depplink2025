import Link from "next/link";
import Image from "next/image";
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import React, { useMemo, useEffect, useState, useRef } from "react";
import { NewMedia, NewMedia2 } from "../../api/Api";
import { useRouter } from 'next-nprogress-bar'

export default function HomeStyleVideoSectionMobile(props: any) {
    const isArabic = props?.lang == 'ar';
    const heightMainSlidersLeftRight = "h-20";
    const origin = props?.origin;
    const router = useRouter()
    const imageAlt = `${isArabic ? props?.data?.sec8_title_ar : props?.data?.sec8_title}`;
    const imageSrc = `${isArabic ? NewMedia2 + props?.data?.sec8_secondary_mobile_image_ar : NewMedia2 + props?.data?.sec8_secondary_mobile_image}`;
    const imageSrc2 = `${isArabic ? NewMedia2 + props?.data?.sec8_first_mobile_video_ar : NewMedia2 + props?.data?.sec8_first_mobile_video}`;
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="mt-6">
                <h2 className="headingHomeMobile max-md:text-[0.85rem] md:headingHomeMain !text-xl">{isArabic ? props?.data?.sec8_title_ar : props?.data?.sec8_title}</h2>
                <p className="md:paraHomeMain text-xs mt-2 line-clamp-2">{isArabic ? props?.data?.sec8_description_ar : props?.data?.sec8_description}</p>
                <div className="mt-8 md:mt-12">
                    <button className="btnPrimarySpecial"
                        onClick={() => {
                            router.push(`${origin}/${props?.lang}/${isArabic ? props?.data?.sec8_button_link_ar : props?.data?.sec8_button_link} `)
                        }}
                    >{isArabic ? props?.data?.sec8_button_title_ar : props?.data?.sec8_button_title}</button>
                </div>
            </div>
            <div className="col-span-2">
                <Link href={`${origin}/${props?.lang}/${props?.lang == 'ar' ? props?.data?.sec8_secondary_image_link_ar : props?.data?.sec8_secondary_image_link}`}>
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        title={imageAlt}
                        height={0}
                        width={0}
                        priority={true}
                        className="h-auto w-full mx-auto rounded-md"
                        sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw'
                    />
                </Link>
            </div>
            {props?.data?.sec8_first_mobile_video_ar || props?.data?.sec8_first_mobile_video ?
                <div className={`rounded-md ${props?.devicetype == true ? 'col-span-2' : ''}`}>
                    {/* <Link href={`${origin}/${props?.lang}/${props?.lang == 'ar' ? props?.data?.sec8_video_link_ar : props?.data?.sec8_video_link}`}>
                        <Image
                            src={imageSrc2}
                            alt={isArabic ? props?.data?.sec8_title_ar : props?.data?.sec8_title}
                            title={isArabic ? props?.data?.sec8_title_ar : props?.data?.sec8_title}
                            height={'360'}
                            width={'640'}
                            priority={true}
                            className="h-auto w-full mx-auto max-md:rounded-md"
                            sizes='(max-width: 140px) 100vw, (max-width: 1068px) 1150px, (max-width: 1024px) 1, 100vw'
                        />
                    </Link> */}
                    <video width="640" height="360" controls={false} muted autoPlay loop className="rounded-md">
                        <source src={imageSrc2} />
                        {/* <source src="path/to/video.webm" type="video/webm" />
                    Your browser does not support the video tag. */}
                    </video>

                </div>
                : null}
        </div>
    );
};
