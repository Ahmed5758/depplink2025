import Link from "next/link";
import Image from "next/image";
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import React, { useMemo, useEffect, useState, useRef } from "react";
import { NewMedia, NewMedia2 } from "../../api/Api";
import { useRouter } from 'next-nprogress-bar'


export default function ThreeImageHalfPara(props: any) {
    const isArabic = props?.lang === 'ar';
    const router = useRouter()
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const containerRef = useRef<HTMLDivElement | null>(null);
    const link: string = typeof props?.props?.sec14_button_link === "string"
    ? props?.lang == 'ar' 
        ? props?.props?.sec14_button_link_ar 
        : props?.props?.sec14_button_link 
    : "";
    const imageAlt = `${isArabic ? "data?.name_ar" : "data?.name"}`;
    // const imageSrc = NewMedia + data.featured_image_web.image;
    // const imageSrc = [
    //     { image0: "/images/homeNew/hobs.webp" },
    //     { image1: "/images/homeNew/hoods.webp" },
    //     { image2: "/images/homeNew/oven.webp" },
    // ]m,

    const mobSlides = [
        {
            slug: props?.lang == 'ar' ? props?.props?.sec14_image_link1_ar : props?.props?.sec14_image_link1,
            name: props?.lang == 'ar' ? props?.props?.sec14_title_ar : props?.props?.sec14_title,
            image: props?.lang == 'ar' ? NewMedia2 + props?.props?.sec14_image1_ar : NewMedia2 + props?.props?.sec14_image1,
        },
        {
            slug: props?.lang == 'ar' ? props?.props?.sec14_image_link1_ar : props?.props?.sec14_image_link1,
            name: props?.lang == 'ar' ? props?.props?.sec14_title_ar : props?.props?.sec14_title,
            image: props?.lang == 'ar' ? NewMedia2 + props?.props?.sec14_image2_ar : NewMedia2 + props?.props?.sec14_image2,
        },
        {
            slug: props?.lang == 'ar' ? props?.props?.sec14_image_link1_ar : props?.props?.sec14_image_link1,
            name: props?.lang == 'ar' ? props?.props?.sec14_title_ar : props?.props?.sec14_title,
            image: props?.lang == 'ar' ? NewMedia2 + props?.props?.sec14_image3_ar : NewMedia2 + props?.props?.sec14_image3,
        },
    ];
    return (

        props?.isMobile ? 
            <div className="grid grid-cols-3 gap-2 items-center py-5">
                <div className="col-span-3">
                    <div className="w-full">
                        <h2 className="headingHomeMain !text-xl">{props?.lang == 'ar' ? props?.props?.sec14_title_ar : props?.props?.sec14_title}</h2>
                        <p className="paraHomeMain mt-2 line-clamp-2">
                        {props?.lang == 'ar' ? props?.props?.sec14_description_ar : props?.props?.sec14_description}
                        </p>
                        <div className="mt-5 mb-5">
                            <button className="btnPrimarySpecial"
                            onClick={() => {
                                router.push(`${origin}/${props?.lang}/${props?.lang == 'ar' ? props?.props?.sec14_button_link_ar : props?.props?.sec14_button_link}`)
                            }}
                            >{props?.lang == 'ar' ? props?.props?.sec14_button_title_ar : props?.props?.sec14_button_title}</button>
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden rounded-md">
                    <Link href={`${origin}/${props?.lang}/${props?.lang == 'ar' ? props?.props?.sec14_image_link1_ar : props?.props?.sec14_image_link1}`} aria-label={`${origin}/${props?.lang}${props?.lang == 'ar' ? props?.props?.sec14_image_link1_ar : props?.props?.sec14_image_link1}`}>
                        <Image
                            src={props?.lang == 'ar' ? NewMedia2 + props?.props?.sec14_image1_ar : NewMedia2 + props?.props?.sec14_image1}
                            alt={props?.props?.sec14_image1}
                            title={props?.props?.sec14_image1}
                            height={50}
                            width={50}
                            priority={true}
                            className="h-auto w-full mx-auto rounded-md hover:scale-110 transform transition-transform duration-500 ease-in-out"
                            sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw'
                        />
                    </Link>
                </div>
                <div className="overflow-hidden rounded-md">
                    <Link href={`${origin}/${props?.lang}/${props?.lang == 'ar' ? props?.props?.sec14_image_link2_ar : props?.props?.sec14_image_link2}`} aria-label={`${origin}/${props?.lang}${props?.lang == 'ar' ? props?.props?.sec14_image_link2_ar : props?.props?.sec14_image_link2}`}>
                        <Image
                            src={props?.lang == 'ar' ? NewMedia2 + props?.props?.sec14_image2_ar : NewMedia2 + props?.props?.sec14_image2}
                            alt={props?.props?.sec14_image2}
                            title={props?.props?.sec14_image2}
                            height={0}
                            width={0}
                            priority={true}
                            className="h-auto w-full mx-auto rounded-md hover:scale-110 transform transition-transform duration-500 ease-in-out"
                            sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw'
                        />
                    </Link>
                </div>
                <div className="overflow-hidden rounded-md">
                    <Link href={`${origin}/${props?.lang}/${props?.lang == 'ar' ? props?.props?.sec14_image_link3_ar : props?.props?.sec14_image_link3}`} aria-label={`${origin}/${props?.lang}${props?.lang == 'ar' ? props?.props?.sec14_image_link3_ar : props?.props?.sec14_image_link3}`}>
                        <Image
                            src={props?.lang == 'ar' ? NewMedia2 + props?.props?.sec14_image3_ar :NewMedia2 + props?.props?.sec14_image3}
                            alt={props?.props?.sec14_image3}
                            title={props?.props?.sec14_image3}
                            height={0}
                            width={0}
                            priority={true}
                            className="h-auto w-full mx-auto rounded-md hover:scale-110 transform transition-transform duration-500 ease-in-out"
                            sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw'
                        />
                    </Link>
                </div>
            </div>
            :
            <>
                <div className="grid grid-cols-6 gap-4 items-center">
                    <div className="col-span-3">
                        <div className="w-full">
                            <h2 className="headingHomeMain !text-xl">{props?.lang == 'ar' ? props?.props?.sec14_title_ar : props?.props?.sec14_title}</h2>
                            <p className="paraHomeMain mt-2 line-clamp-2">
                            {props?.lang == 'ar' ? props?.props?.sec14_description_ar : props?.props?.sec14_description}
                            </p>
                            <div className="mt-12">
                                <button className="btnPrimarySpecial"
                                onClick={() => {
                                    router.push(`${origin}/${props?.lang}/${props?.lang == 'ar' ? props?.props?.sec14_button_link_ar : props?.props?.sec14_button_link}`)
                                }}
                                >{props?.lang == 'ar' ? props?.props?.sec14_button_title_ar : props?.props?.sec14_button_title}</button>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden rounded-md">
                        <Link href={`${origin}/${props?.lang}/${props?.lang == 'ar' ? props?.props?.sec14_image_link1_ar : props?.props?.sec14_image_link1}`} aria-label={`${origin}/${props?.lang}${props?.lang == 'ar' ? props?.props?.sec14_image_link1_ar : props?.props?.sec14_image_link1}`}>
                            <Image
                                src={props?.lang == 'ar' ? NewMedia2 + props?.props?.sec14_image1_ar : NewMedia2 + props?.props?.sec14_image1}
                                alt={props?.props?.sec14_image1}
                                title={props?.props?.sec14_image1}
                                height={0}
                                width={0}
                                priority={true}
                                className="h-auto w-full mx-auto rounded-md hover:scale-110 transform transition-transform duration-500 ease-in-out"
                                sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw'
                            />
                        </Link>
                    </div>
                    <div className="overflow-hidden rounded-md">
                        <Link href={`${origin}/${props?.lang}/${props?.lang == 'ar' ? props?.props?.sec14_image_link2_ar : props?.props?.sec14_image_link2}`} aria-label={`${origin}/${props?.lang}${props?.lang == 'ar' ? props?.props?.sec14_image_link2_ar : props?.props?.sec14_image_link2}`}>
                            <Image
                                src={props?.lang == 'ar' ? NewMedia2 + props?.props?.sec14_image2_ar : NewMedia2 + props?.props?.sec14_image2}
                                alt={props?.props?.sec14_image2}
                                title={props?.props?.sec14_image2}
                                height={0}
                                width={0}
                                priority={true}
                                className="h-auto w-full mx-auto rounded-md hover:scale-110 transform transition-transform duration-500 ease-in-out"
                                sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw'
                            />
                        </Link>
                    </div>
                    <div className="overflow-hidden rounded-md">
                        <Link href={`${origin}/${props?.lang}/${props?.lang == 'ar' ? props?.props?.sec14_image_link3_ar : props?.props?.sec14_image_link3}`} aria-label={`${origin}/${props?.lang}${props?.lang == 'ar' ? props?.props?.sec14_image_link3_ar : props?.props?.sec14_image_link3}`}>
                            <Image
                                src={props?.lang == 'ar' ? NewMedia2 + props?.props?.sec14_image3_ar :NewMedia2 + props?.props?.sec14_image3}
                                alt={props?.props?.sec14_image3}
                                title={props?.props?.sec14_image3}
                                height={0}
                                width={0}
                                priority={true}
                                className="h-auto w-full mx-auto rounded-md hover:scale-110 transform transition-transform duration-500 ease-in-out"
                                sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw'
                            />
                        </Link>
                    </div>
                </div>
            </>
    );
};
