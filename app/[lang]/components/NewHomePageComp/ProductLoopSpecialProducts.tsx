"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Mousewheel, Navigation, Pagination, Scrollbar } from "swiper/modules";
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { get } from "../../api/ApiCalls";
const ProductComponent = dynamic(() => import("./product_component"), { ssr: true });

export default function ProductLoopSpecialProductsComponent(props: any) {
    const origin = props?.origin;
    const isArabic = props?.lang;
    const isMobileOrTablet = props?.isMobileOrTablet;
    const productData = props?.productData;
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const [ProExtraData, setProExtraData] = useState<any>([])

    useEffect(() => {
        if (props?.productData) {
            extraproductdata()
        }
    }, [props?.productData])

    const extraproductdata = async () => {
        var a: number[] = []
        productData.forEach((item: any) => {
            a.push(item.id)
        });
        await get(`productextradatamulti-regional-new/${a?.join(",")}/${localStorage.getItem("globalcity")}`).then((responseJson: any) => {
            const data = responseJson?.data;
            setProExtraData(data)
        })
    }


    return (
        <>
            <button ref={prevRef} className={`absolute top-[40%] translate-middle-y z-10 cursor-pointer fill-white p-2.5 left-1 md:p-3 md:left-7 bg-primary rounded-full`}>
                <svg
                    height={isMobileOrTablet ? "18" : "22"}
                    viewBox="0 0 24 24"
                    width={isMobileOrTablet ? "18" : "22"}
                    xmlns="http://www.w3.org/2000/svg"
                    id="fi_10486749"
                    className="fill-current transform transition duration-150 ease-in-out rotate-90"
                >
                    <path
                        clipRule="evenodd"
                        d="m2.58579 7.58579c.78104-.78105 2.04738-.78105 2.82842 0l6.58579 6.58581 6.5858-6.58581c.781-.78105 2.0474-.78105 2.8284 0 .7811.78104.7811 2.04738 0 2.82841l-8 8c-.781.7811-2.0474.7811-2.8284 0l-8.00001-8c-.78105-.78103-.78105-2.04737 0-2.82841z"
                        fillRule="evenodd"
                    ></path>
                </svg>
            </button>
            <button ref={nextRef} className={`absolute top-[40%] translate-middle-y z-10 cursor-pointer fill-white p-2.5 right-1 md:p-3 md:right-7 bg-primary rounded-full`}>
                <svg
                    height={isMobileOrTablet ? "18" : "22"}
                    viewBox="0 0 24 24"
                    width={isMobileOrTablet ? "18" : "22"}
                    xmlns="http://www.w3.org/2000/svg"
                    id="fi_10486750"
                    className="fill-current transform transition duration-150 ease-in-out -rotate-90"
                >
                    <path
                        clipRule="evenodd"
                        d="m2.58579 7.58579c.78104-.78105 2.04738-.78105 2.82842 0l6.58579 6.58581 6.5858-6.58581c.781-.78105 2.0474-.78105 2.8284 0 .7811.78104.7811 2.04738 0 2.82841l-8 8c-.781.7811-2.0474.7811-2.8284 0l-8.00001-8c-.78105-.78103-.78105-2.04737 0-2.82841z"
                        fillRule="evenodd"
                    ></path>
                </svg>
            </button>
            <Swiper
                spaceBetween={10}
                slidesPerView={5}
                breakpoints={{
                    320: {
                        slidesPerView: 2.2,
                        spaceBetween: 6,
                    },
                    640: {
                        slidesPerView: 2.2,
                        spaceBetween: 6,
                    },
                    768: {
                        slidesPerView: 2.2,
                        spaceBetween: 6,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 6,
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 6,
                    },
                    1650: {
                        slidesPerView: 5,
                        spaceBetween: 6,
                    },
                    1920: {
                        slidesPerView: 5,
                        spaceBetween: 6,
                    },
                }}
                autoHeight={true}
                centeredSlides={false}
                pagination={false}
                loop={true}
                mousewheel={{
                    forceToAxis: true,
                    releaseOnEdges: true,
                    sensitivity: 2,
                    eventsTarget: ".swiper-wrapper", // Mousewheel events will be attached to swiper wrapper
                }}
                freeMode={true}
                modules={[Autoplay, Navigation, Pagination, FreeMode, Scrollbar, Mousewheel]}
                onBeforeInit={(swiper) => {
                    if (swiper.params.navigation) {
                        const navigation = swiper.params.navigation as any;
                        navigation.prevEl = prevRef.current;
                        navigation.nextEl = nextRef.current;
                    }
                }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                className="swiperProductSlider"
            >
                {productData?.map((productData: any, productSliderID: number) => (
                    <SwiperSlide key={productSliderID}>
                        <ProductComponent productData={productData} lang={isArabic} isMobileOrTablet={isMobileOrTablet} origin={origin} ProExtraData={ProExtraData[productData?.id]} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
