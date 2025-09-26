"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Mousewheel, Navigation, Pagination, Scrollbar } from "swiper/modules";
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import './scrollBar.css';
import 'swiper/css/pagination';
import { get } from "../../api/ApiCalls";


const ProductComponent = dynamic(
    () => import("./product_component_updated"),
    { ssr: true }
);

export default function ProductLoopMobile(props: any) {
    const origin = props?.origin;
    const isArabic = props?.lang;
    const isMobileOrTablet = props?.isMobileOrTablet;
    const productData = props?.productData;
    const [ProExtraData, setProExtraData] = useState<any>([])
    const containerClass = isMobileOrTablet ? "container" : "px-[4.8rem]";
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const gtmNewListId = props?.gtmColumnItemListId;
    const gtmNewListName = props?.gtmColumnItemListName;

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
        // localStorage.getItem("globalcity")
        await get(`productextradatamulti-regional-new/${a?.join(",")}/${localStorage.getItem("globalcity")}`).then((responseJson: any) => {
            const data = responseJson?.data;
            setProExtraData(data)
        })
    }
    return (
        <>
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
                        slidesPerView: 4,
                        spaceBetween: 6,
                    },
                    1024: {
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
                autoplay={{
                    delay: 15000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={false}
                loop={true}
                mousewheel={{
                    forceToAxis: true,
                    releaseOnEdges: true,
                    sensitivity: 2,
                    eventsTarget: ".swiper-wrapper", // Mousewheel events will be attached to swiper wrapper
                }}
                scrollbar={{
                    draggable: true,
                    hide: false, // Show scrollbar
                }}
                freeMode={true}
                modules={[Autoplay, Navigation, Pagination, FreeMode, Scrollbar, Mousewheel]}
                // navigation={{ nextEl: `.arrow-left-${idRandom}`, prevEl: `.arrow-right-${idRandom}` }}
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
                className="swiperProductSlider !pb-4"
            >
                {productData?.map((productData: any, i: number) => (
                    <SwiperSlide key={i}>
                        <ProductComponent productData={productData} key={i} lang={isArabic} isMobileOrTablet={isMobileOrTablet} origin={origin} ProExtraData={ProExtraData[productData?.id]} gtmColumnItemListId={gtmNewListId} gtmColumnItemListName={gtmNewListName}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
