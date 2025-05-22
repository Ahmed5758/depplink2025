"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Mousewheel, Navigation, Pagination, Scrollbar } from "swiper/modules";
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import './scrollBar.css';
import 'swiper/css/pagination';
import Link from "next/link";
import Image from "next/image";
import { get } from "../../api/ApiCalls";


const ProductComponent = dynamic(
    () => import("./product_component"),
    { ssr: true }
);

export default function PriceSectionComponent(props: any) {
    const origin = props?.origin;
    const isArabic = props?.isArabic;
    const isMobileOrTablet = props?.isMobileOrTablet;
    const containerClass = isMobileOrTablet ? "container" : "px-[4.8rem]";
    const lang = isArabic ? "ar" : "en"

    const priceHeading = isArabic ? "تسوق حسب الأسعار" : "Shop by Prices"
    const categoryName = isArabic ? "" : ""
    const categoryLink = "#"


    return (
        <div>
            <div className="md:mt-6">
                <h2 className="headingHomeMain mb-5">{priceHeading}</h2>
            </div>
            <Swiper
                spaceBetween={10}
                slidesPerView={6}
                breakpoints={{
                    320: {
                        slidesPerView: 4.2,
                        spaceBetween: 6,
                    },
                    640: {
                        slidesPerView: 4.2,
                        spaceBetween: 6,
                    },
                    768: {
                        slidesPerView: 4.2,
                        spaceBetween: 6,
                    },
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: 16,
                    },
                    1280: {
                        slidesPerView: 8,
                        spaceBetween: 16,
                    },
                    1650: {
                        slidesPerView: 8,
                        spaceBetween: 16,
                    },
                    1920: {
                        slidesPerView: 8,
                        spaceBetween: 16,
                    },
                }}
                autoHeight={true}
                centeredSlides={false}
                autoplay={false}
                pagination={false}
                loop={false}
                mousewheel={{
                    forceToAxis: true,
                    releaseOnEdges: true,
                    sensitivity: 2,
                    eventsTarget: ".swiper-wrapper", // Mousewheel events will be attached to swiper wrapper
                }}
                scrollbar={{
                    draggable: true,
                    hide: isMobileOrTablet ? false : true, // Show scrollbar
                }}
                freeMode={true}
                modules={[Autoplay, Navigation, Pagination, FreeMode, Scrollbar, Mousewheel]}
                // navigation={{ nextEl: `.arrow-left-${idRandom}`, prevEl: `.arrow-right-${idRandom}` }}
                className="swiperProductSlider !pb-8"
            >
                <SwiperSlide>
                    <Link href={`${origin}/${lang}/category/under99`} aria-label={`${origin}/${lang}/category/under99`} prefetch={false} scroll={false}>
                        <Image
                            src={isArabic ? "/icons/99.webp" : "/icons/99-en.webp"}
                            width={100}
                            height={100}
                            alt=""
                            title=""
                            className=""
                            sizes="100vw"
                            quality={100}
                        />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href={`${origin}/${lang}/category/under-199`} aria-label={`${origin}/${lang}/category/under-199`} prefetch={false} scroll={false}>
                        <Image
                            src={isArabic ? "/icons/199.webp" : "/icons/199-en.webp"}
                            width={100}
                            height={100}
                            alt=""
                            title=""
                            className=""
                            sizes="100vw"
                            quality={100}
                        />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href={`${origin}/${lang}/category/under-499`} aria-label={`${origin}/${lang}/category/under-499`} prefetch={false} scroll={false}>
                        <Image
                            src={isArabic ? "/icons/499.webp" : "/icons/499-en.webp"}
                            width={100}
                            height={100}
                            alt=""
                            title=""
                            className=""
                            sizes="100vw"
                            quality={100}
                        />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href={`${origin}/${lang}/category/under-999`} aria-label={`${origin}/${lang}/category/under-999`} prefetch={false} scroll={false}>
                        <Image
                            src={isArabic ? "/icons/999.webp" : "/icons/999-en.webp"}
                            width={100}
                            height={100}
                            alt=""
                            title=""
                            className=""
                            sizes="100vw"
                            quality={100}
                        />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href={`${origin}/${lang}/category/under-1999`} aria-label={`${origin}/${lang}/category/under-1999`} prefetch={false} scroll={false}>
                        <Image
                            src={isArabic ? "/icons/1999.webp" : "/icons/1999-en.webp"}
                            width={100}
                            height={100}
                            alt=""
                            title=""
                            className=""
                            sizes="100vw"
                            quality={100}
                        />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href={`${origin}/${lang}/category/under-3999`} aria-label={`${origin}/${lang}/category/under-3999`} prefetch={false} scroll={false}>
                        <Image
                            src={isArabic ? "/icons/3999.webp" : "/icons/3999-en.webp"}
                            width={100}
                            height={100}
                            alt=""
                            title=""
                            className=""
                            sizes="100vw"
                            quality={100}
                        />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href={`${origin}/${lang}/category/under-4999`} aria-label={`${origin}/${lang}/category/under-4999`} prefetch={false} scroll={false}>
                        <Image
                            src={isArabic ? "/icons/4999.webp" : "/icons/4999-en.webp"}
                            width={100}
                            height={100}
                            alt=""
                            title=""
                            className=""
                            sizes="100vw"
                            quality={100}
                        />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href={`${origin}/${lang}/category/above-5000`} aria-label={`${origin}/${lang}/category/above-5000`} prefetch={false} scroll={false}>
                        <Image
                            src={isArabic ? "/icons/5000.webp" : "/icons/5000-en.webp"}
                            width={100}
                            height={100}
                            alt=""
                            title=""
                            className=""
                            sizes="100vw"
                            quality={100}
                        />
                    </Link>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
