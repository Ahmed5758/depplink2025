"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { Autoplay, Navigation, Pagination, Scrollbar, Mousewheel, Grid, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import './scrollBar.css';

const ProductComponent = dynamic(
  () => import("./product_component"),
  { ssr: true }
);

export default function BadgeProductSlider(props: any) {
  const origin = props?.origin;
  const isArabic = props?.isArabic;
  const isMobileOrTablet = props?.isMobileOrTablet;
  // const productDataSlider = props?.productDataSlider?.products?.data;
  const productDataSlider = props?.productDataSlider;
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const gtmNewListId = props?.gtmColumnItemListId;
  const gtmNewListName = props?.gtmColumnItemListName;

  return (
    <>
      <Swiper
        spaceBetween={10}
        slidesPerView={6}
        breakpoints={{
          320: {
            slidesPerView: 1.3,
            spaceBetween: 25,
          },
          640: {
            slidesPerView: 1.3,
            spaceBetween: 25,
          },
          768: {
            slidesPerView: 2.6,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
        }}
        autoHeight={true}
        centeredSlides={false}
        autoplay={false}
        pagination={false}
        loop={false}
        scrollbar={{
          draggable: false,
          hide: false, // Show scrollbar
        }}
        mousewheel={{
          forceToAxis: true,
          releaseOnEdges: true,
          sensitivity: 2,
          eventsTarget: ".swiper-wrapper", // Mousewheel events will be attached to swiper wrapper
        }}
        freeMode={true}
        modules={[Scrollbar, Mousewheel, Grid, FreeMode, Autoplay, Navigation, Pagination]}  // Use only Scrollbar, Mousewheel, and Grid
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
        className="swiperProductSlider !pb-10"
      >
        {productDataSlider?.map((productSlider: any, productSliderID: number) => (
          <SwiperSlide key={productSliderID}>
            <div className={`relative w-full flex ltr:flex-row-reverse items-start mt-[1.2rem] md:mt-6`}>
              <div className={`product_badge xl-pl-[2rem] pl-[1rem] bg-white shadow-xl rounded-tr-lg rounded-br-lg w-fit mt-[1.2rem] md:mt-6 -ml-[13px]`}>
                <span className={`text-[13rem] ${productSliderID == 0 ? "-mr-[1.9rem] span_one" :"ltr:-mr-[0.5rem] rtl:-mr-[0.8rem]"} font-bold text-[#FF7B34] md:leading-[13.5rem] leading-[10rem]`}>
                  {productSliderID + 1}
                </span>
              </div>
              <ProductComponent productData={productSlider} lang={isArabic} isMobileOrTablet={isMobileOrTablet} origin={origin} gtmColumnItemListId={gtmNewListId} gtmColumnItemListName={gtmNewListName}/>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* </div> */}
    </>
  );
}
