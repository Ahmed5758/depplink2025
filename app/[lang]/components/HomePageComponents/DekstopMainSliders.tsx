import Link from "next/link";
import Image from "next/image";
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import React, { useMemo, useEffect } from "react";
import { NewMedia, NewMedia2 } from "../../api/Api";

export default function DekstopMainSliders(props: any) {
    const isArabic: any = props?.isArabic;
    // const NewMedia = "https://adminpaneltamkeen.tamkeenstores.com.sa/public/assets/new-media/"
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const mainClasses = "mx-auto h-auto w-full"
    const heightMainSlidersLeftRight = "min-h-[36rem] h-[36rem]"
    const heightCenterSlides = "min-h-[17.4rem] h-[17.4rem]"

    const SliderMainHome = ({ sliders, lang, origin }: any) => {
        if (!sliders?.length) return null;

        const renderSlides = () =>
            sliders.map((data: any, id: number) => {
                if (!data?.featured_image_web) return null;

                // const link = generateLink(data);
                const link: any = typeof data?.custom_link == "string" ? data.custom_link : "";
                // const langStr = lang == true ? 'ar' : 'en';
                const imageAlt = `${isArabic ? data?.name_ar : data?.name}-${id + 11}`;
                const imageSrc = NewMedia2 + data.featured_image_web.image;
                // const imageSrc = data?.featured_image_web?.image;
                return (
                    <SwiperSlide key={id}>
                        <div className="relative">
                            <Link href={`${origin}/${lang}/${link}`} aria-label={`${origin}/${lang}/${link}`}>
                                <Image
                                    src={imageSrc}
                                    alt={imageAlt}
                                    width={0}
                                    height={0}
                                    className="w-full h-auto rounded-md"
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                                />
                            </Link>
                        </div>
                    </SwiperSlide>
                );
            });

        return (
            <Swiper
                spaceBetween={10}
                centeredSlides={false}
                autoplay={{
                    delay: 15000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={true}
                loop={true}
                modules={[Autoplay, Navigation, Pagination]}
                navigation={{ nextEl: ".arrow-left", prevEl: ".arrow-right" }}
                className="mySwiper"
            >
                {renderSlides()}
            </Swiper>
        );
    };

    const SliderMainHomeTwo = ({ sliders, lang, origin }: any) => {
        if (!sliders?.length) return null;

        // Generate dynamic link for each slide
        // const generateLink = (data: any): string => {
        //     if (data?.pro) return `/product/${data.pro.slug}`;
        //     if (data?.brand) return `/brand/${data.brand.slug}`;
        //     if (data?.cat) return `/category/${data.cat.slug}`;
        //     if (data?.custom_link) return `/${data.custom_link}`;
        //     return "#";
        // };

        const renderSlides = () =>
            sliders.map((data: any, id: number) => {
                if (!data?.featured_image_web) return null;

                // const link = generateLink(data);
                const link = typeof data?.custom_link == "string" ? data.custom_link : "";
                // const langStr = lang == true ? 'ar' : 'en';
                const imageAlt = `${isArabic ? data?.name_ar : data?.name}-${id + 11}`;
                const imageSrc = NewMedia2 + data.featured_image_web.image;
                // const imageSrc = data.featured_image_web.image;

                return (
                    <SwiperSlide key={id}>
                        <div className="relative">
                            <Link href={`${origin}/${lang}/${link}`} aria-label={`${origin}/${lang}/${link}`}>
                                <Image
                                    src={imageSrc}
                                    alt={imageAlt}
                                    width={0}
                                    height={0}
                                    className="w-full h-auto rounded-md"
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                                />
                            </Link>
                        </div>
                    </SwiperSlide>
                );
            });

        return (
            <Swiper
                spaceBetween={10}
                centeredSlides={false}
                autoplay={{
                    delay: 15000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={true}
                loop={true}
                modules={[Autoplay, Navigation, Pagination]}
                navigation={{ nextEl: ".arrow-left", prevEl: ".arrow-right" }}
                className="mySwiper"
            >
                {renderSlides()}
            </Swiper>
        );
    };

    const SliderMainHomeThree = ({ sliders, lang, origin }: any) => {
        if (!sliders?.length) return null;

        // Generate dynamic link for each slide
        // const generateLink = (data: any): string => {
        //     if (data?.pro) return `/product/${data.pro.slug}`;
        //     if (data?.brand) return `/brand/${data.brand.slug}`;
        //     if (data?.cat) return `/category/${data.cat.slug}`;
        //     if (data?.custom_link) return `/${data.custom_link}`;
        //     return "#";
        // };

        const renderSlides = () =>
            sliders.map((data: any, id: number) => {
                if (!data?.featured_image_web) return null;

                // const link = generateLink(data);
                const link = typeof data?.custom_link == "string" ? data.custom_link : "";
                // const langStr = isArabic == true ? 'ar' : 'en';
                const imageAlt = `${isArabic ? data?.name_ar : data?.name}-${id + 11}`;
                const imageSrc = NewMedia2 + data.featured_image_web.image;
                // const imageSrc = data.featured_image_web.image;

                return (
                    <SwiperSlide key={id}>
                        <div className="relative">
                            <Link href={`${origin}/${lang}/${link}`} aria-label={`${origin}/${lang}/${link}`}>
                                <Image
                                    src={imageSrc}
                                    alt={imageAlt}
                                    width={0}
                                    height={0}
                                    className="w-full h-auto rounded-md"
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                                />
                            </Link>
                        </div>
                    </SwiperSlide>
                );
            });

        return (
            <Swiper
                spaceBetween={10}
                centeredSlides={false}
                autoplay={{
                    delay: 15000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={true}
                loop={true}
                slidesPerView={1}
                modules={[Autoplay, Navigation, Pagination]}
                navigation={{ nextEl: ".arrow-left", prevEl: ".arrow-right" }}
                className="mySwiper"
            >
                {renderSlides()}
            </Swiper>
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className={`${mainClasses} col-span-2`}>
                <SliderMainHome sliders={props?.params?.sec2SliderRight} lang={props?.lang} origin={origin} />
            </div>
            <div className={`${mainClasses}`}>
                <div className="h-1/2">
                    <SliderMainHomeTwo sliders={props?.params?.sec2SliderMiddleTop} lang={props?.lang} origin={origin} />
                </div>
                <div className="grid grid-cols-2 items-start gap-3 mt-3 h-1/2">
                    <div className="w-full">
                        <SliderMainHomeThree sliders={props?.params?.sec2SliderMiddleBottomLeft} lang={props?.lang} origin={origin} />
                    </div>
                    <div className="w-full">
                        <SliderMainHomeThree sliders={props?.params?.sec2SliderMiddleBottomRight} lang={props?.lang} origin={origin} />
                    </div>
                </div>
            </div>
            <div className={`${mainClasses}`}>
                <SliderMainHome sliders={props?.params?.sec2SliderLeft} lang={props?.lang} origin={origin} />
            </div>
        </div>
    );
};
