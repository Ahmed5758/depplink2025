"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  FreeMode,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { get } from "../../api/ApiCalls";
import { getCookie } from "cookies-next";
// const ProductComponent = dynamic(() => import("./product_component"), { ssr: true });

export default function Testimonial(props: any) {

  const origin = props?.origin;
  const isArabic = props.isArabic;
  const isMobileOrTablet = props?.isMobileOrTablet;
  const productData = props?.productData;
  const gtmNewListId = props?.gtmColumnItemListId;
  const gtmNewListName = props?.gtmColumnItemListName;
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [ProExtraData, setProExtraData] = useState<any>([]);
  const containerClass = isMobileOrTablet ? "container" : "px-20";

  const reviews = [
    {
      name: isArabic ?"ليلى عبد الله" : "Laila Abdullah",
      time: isArabic ?"منذ يوم" : "a day ago",
      rating: 4.9,
      text: isArabic ?"”فريق العمل خدوم ومتفهم، وساعدوني أختار الأنسب لاحتياجي.“" :"The team was helpful and understanding, and they helped me choose what best suited my needs.",
      image: "/images/categoryNew/testemonial-avatar.png",
    },
    {
      name: isArabic ?"أحمد السيد" :"Ahmed Al-Sayed",
      time: isArabic ?"منذ يوم" :"two day ago",
      rating: 5,
      text:  isArabic ?"”أعجبتني جودة المنتجات والسعر المنافس مقارنة بالمتاجر الأخرى.“" : "I was impressed by the product quality and the competitive price compared to other stores.",
      image: "/images/categoryNew/testemonial-avatar.png",
    },
    {
      name: isArabic ?"محمد القحطاني": "Mohammed Al-Qahtani",
      time: isArabic ?"منذ يوم" : "a day ago",
      rating: 4.8,
      text: isArabic ?"”خدمة ممتازة وسرعة في التوصيل، شكراً تمكين على الاحترافية.“" : "Excellent service and fast delivery. Thank you Tamkeen, for the professionalism.",
      image: "/images/categoryNew/testemonial-avatar.png",
    },
    {
      name: isArabic ?"ليلى عبد الله" : "Laila Abdullah",
      time: isArabic ?"منذ يوم" : "a day ago",
      rating: 4.9,
      text: isArabic ?"”فريق العمل خدوم ومتفهم، وساعدوني أختار الأنسب لاحتياجي.“" :"The team was helpful and understanding, and they helped me choose what best suited my needs.",
      image: "/images/categoryNew/testemonial-avatar.png",
    },
    {
      name: isArabic ?"أحمد السيد" :"Ahmed Al-Sayed",
      time: isArabic ?"منذ يوم" : "a day ago",
      rating: 5,
      text: isArabic ?"”أعجبتني جودة المنتجات والسعر المنافس مقارنة بالمتاجر الأخرى.“" : "I was impressed by the product quality and the competitive price compared to other stores.",
      image: "/images/categoryNew/testemonial-avatar.png",
    },
    {
      name: isArabic ?"محمد القحطاني": "Mohammed Al-Qahtani",
      time: isArabic ?"منذ يوم" : "a day ago",
      rating: 4.8,
      text: isArabic ?"”خدمة ممتازة وسرعة في التوصيل، شكراً تمكين على الاحترافية.“" : "Excellent service and fast delivery. Thank you Tamkeen, for the professionalism.",
      image: "/images/categoryNew/testemonial-avatar.png",
    },
  ];


  useEffect(() => {
    if (props?.productData) {
      extraproductdata();
    }
  }, [props?.productData]);

  const extraproductdata = async () => {
    var a: number[] = [];
    productData.forEach((item: any) => {
      a.push(item.id);
    });
    var city = getCookie("selectedCity");
    if (a?.length >= 1) {
      await get(
        `productextradatamulti-regional-new/${a?.join(",")}/${city}`
      ).then((responseJson: any) => {
        const data = responseJson?.data;
        setProExtraData(data);
      });
    }
  };

  const theTrusTOfText = isArabic ? "ثقة شركائنا هي سر نجاحنا" : "The trust of our partners is the secret to our success";


  return (
    <>
      <section
        className={`${containerClass} relative w-full pt-12 md:pt-16 testimonials_sec`}
        style={{
          backgroundImage: `linear-gradient(to right, #98b4c6 0%, white 40%, white 60%, #98b4c6 100%)`,
        }}
      >
        <div className="w-full ltr">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10">
            {theTrusTOfText}
          </h2>
          <button
            ref={prevRef}
            className={`absolute top-[16%] translate-middle-y z-10 cursor-pointer fill-white p-2.5 ${
              isMobileOrTablet ? "left-4" : "left-20"
            } md:p-3 bg-primary rounded-full`}
          >
            <svg
              height={isMobileOrTablet ? "18" : "22"}
              viewBox="0 0 32 32"
              width={isMobileOrTablet ? "18" : "22"}
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current transform transition duration-150 ease-in-out -rotate-180"
            >
              <path
                d="M17.2928 25.7071C17.1054 25.5196 17.0001 25.2652 17.0001 25C17.0001 24.7348 17.1054 24.4805 17.2928 24.2929L24.5858 17H5C4.73478 17 4.48043 16.8947 4.29289 16.7071C4.10536 16.5196 4 16.2652 4 16C4 15.7348 4.10536 15.4805 4.29289 15.2929C4.48043 15.1054 4.73478 15 5 15H24.5858L17.2928 7.70712C17.2 7.61425 17.1263 7.50401 17.0761 7.38268C17.0258 7.26135 17 7.1313 17 6.99998C17 6.86866 17.0259 6.73862 17.0761 6.61729C17.1264 6.49596 17.2 6.38573 17.2929 6.29287C17.3858 6.20001 17.496 6.12636 17.6173 6.07611C17.7387 6.02586 17.8687 5.99999 18 6C18.1314 6.00001 18.2614 6.02588 18.3827 6.07614C18.5041 6.1264 18.6143 6.20007 18.7072 6.29293L27.7072 15.2929C27.7104 15.2962 27.7131 15.2998 27.7163 15.3031C27.7361 15.3233 27.7552 15.3441 27.7732 15.366C27.7832 15.3782 27.792 15.3911 27.8014 15.4037C27.8115 15.4173 27.822 15.4306 27.8315 15.4447C27.8412 15.4592 27.8497 15.4743 27.8586 15.4893C27.8664 15.5023 27.8746 15.5151 27.8818 15.5286C27.8898 15.5436 27.8967 15.5591 27.9039 15.5744C27.9107 15.5887 27.9178 15.6027 27.9238 15.6173C27.9299 15.6321 27.9349 15.6472 27.9403 15.6623C27.9459 15.678 27.952 15.6936 27.9569 15.7097C27.9614 15.7247 27.9647 15.7399 27.9685 15.755C27.9727 15.7715 27.9773 15.7879 27.9806 15.8047C27.9841 15.8221 27.9861 15.8397 27.9887 15.8572C27.9908 15.872 27.9936 15.8864 27.995 15.9013C27.9983 15.9342 28 15.9671 28 16C28 16.033 27.9983 16.0659 27.995 16.0987C27.9936 16.1136 27.9908 16.1281 27.9887 16.1428C27.9862 16.1604 27.9841 16.1779 27.9806 16.1954C27.9773 16.2122 27.9727 16.2285 27.9685 16.245C27.9647 16.2602 27.9614 16.2754 27.9569 16.2903C27.952 16.3064 27.9459 16.322 27.9403 16.3378C27.9349 16.3528 27.9299 16.3679 27.9238 16.3827C27.9178 16.3973 27.9106 16.4113 27.9039 16.4256C27.8967 16.4409 27.8898 16.4564 27.8818 16.4715C27.8746 16.4849 27.8664 16.4977 27.8586 16.5108C27.8497 16.5257 27.8412 16.5409 27.8315 16.5554C27.822 16.5695 27.8115 16.5828 27.8014 16.5963C27.792 16.6089 27.7832 16.6219 27.7732 16.6341C27.7549 16.6563 27.7354 16.6775 27.7153 16.6981C27.7124 16.701 27.7101 16.7042 27.7072 16.7071L18.7072 25.7071C18.6143 25.8 18.504 25.8736 18.3827 25.9239C18.2614 25.9742 18.1313 26 18 26C17.8687 26 17.7386 25.9742 17.6173 25.9239C17.496 25.8736 17.3857 25.8 17.2928 25.7071Z"
                fill="white"
              />
            </svg>
          </button>
          <button
            ref={nextRef}
            className={`absolute top-[16%] translate-middle-y z-10 cursor-pointer fill-white p-2.5 ${
              isMobileOrTablet ? "right-4" : "right-20"
            } md:p-3 bg-primary rounded-full`}
          >
            <svg
              height={isMobileOrTablet ? "18" : "22"}
              viewBox="0 0 32 32"
              width={isMobileOrTablet ? "18" : "22"}
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current transform transition duration-150 ease-in-out"
            >
              <path
                d="M17.2928 25.7071C17.1054 25.5196 17.0001 25.2652 17.0001 25C17.0001 24.7348 17.1054 24.4805 17.2928 24.2929L24.5858 17H5C4.73478 17 4.48043 16.8947 4.29289 16.7071C4.10536 16.5196 4 16.2652 4 16C4 15.7348 4.10536 15.4805 4.29289 15.2929C4.48043 15.1054 4.73478 15 5 15H24.5858L17.2928 7.70712C17.2 7.61425 17.1263 7.50401 17.0761 7.38268C17.0258 7.26135 17 7.1313 17 6.99998C17 6.86866 17.0259 6.73862 17.0761 6.61729C17.1264 6.49596 17.2 6.38573 17.2929 6.29287C17.3858 6.20001 17.496 6.12636 17.6173 6.07611C17.7387 6.02586 17.8687 5.99999 18 6C18.1314 6.00001 18.2614 6.02588 18.3827 6.07614C18.5041 6.1264 18.6143 6.20007 18.7072 6.29293L27.7072 15.2929C27.7104 15.2962 27.7131 15.2998 27.7163 15.3031C27.7361 15.3233 27.7552 15.3441 27.7732 15.366C27.7832 15.3782 27.792 15.3911 27.8014 15.4037C27.8115 15.4173 27.822 15.4306 27.8315 15.4447C27.8412 15.4592 27.8497 15.4743 27.8586 15.4893C27.8664 15.5023 27.8746 15.5151 27.8818 15.5286C27.8898 15.5436 27.8967 15.5591 27.9039 15.5744C27.9107 15.5887 27.9178 15.6027 27.9238 15.6173C27.9299 15.6321 27.9349 15.6472 27.9403 15.6623C27.9459 15.678 27.952 15.6936 27.9569 15.7097C27.9614 15.7247 27.9647 15.7399 27.9685 15.755C27.9727 15.7715 27.9773 15.7879 27.9806 15.8047C27.9841 15.8221 27.9861 15.8397 27.9887 15.8572C27.9908 15.872 27.9936 15.8864 27.995 15.9013C27.9983 15.9342 28 15.9671 28 16C28 16.033 27.9983 16.0659 27.995 16.0987C27.9936 16.1136 27.9908 16.1281 27.9887 16.1428C27.9862 16.1604 27.9841 16.1779 27.9806 16.1954C27.9773 16.2122 27.9727 16.2285 27.9685 16.245C27.9647 16.2602 27.9614 16.2754 27.9569 16.2903C27.952 16.3064 27.9459 16.322 27.9403 16.3378C27.9349 16.3528 27.9299 16.3679 27.9238 16.3827C27.9178 16.3973 27.9106 16.4113 27.9039 16.4256C27.8967 16.4409 27.8898 16.4564 27.8818 16.4715C27.8746 16.4849 27.8664 16.4977 27.8586 16.5108C27.8497 16.5257 27.8412 16.5409 27.8315 16.5554C27.822 16.5695 27.8115 16.5828 27.8014 16.5963C27.792 16.6089 27.7832 16.6219 27.7732 16.6341C27.7549 16.6563 27.7354 16.6775 27.7153 16.6981C27.7124 16.701 27.7101 16.7042 27.7072 16.7071L18.7072 25.7071C18.6143 25.8 18.504 25.8736 18.3827 25.9239C18.2614 25.9742 18.1313 26 18 26C17.8687 26 17.7386 25.9742 17.6173 25.9239C17.496 25.8736 17.3857 25.8 17.2928 25.7071Z"
                fill="white"
              />
            </svg>
          </button>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            loop
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={24}
            slidesPerView={3}
            pagination={{ clickable: true }}
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
            breakpoints={{
              480: { slidesPerView: 2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            dir="ltr"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white/90 rounded-2xl shadow-md px-5 py-6 text-left border border-[#c8e8f8] backdrop-blur-sm h-full">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-2 items-center">
                      <div>
                        <Image
                          src={review?.image}
                          alt="avatar"
                          title="avatar"
                          width={0}
                          height={0}
                          quality={100}
                          sizes="100vh"
                          loading="lazy"
                          className="w-[48px] h-[48px]"
                        />
                      </div>
                      <div>
                        <div className="text-sm text-[#002d59] font-medium line-clamp-1 mb-1">
                          {review.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          {review.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-[#002d59] font-bold text-lg">
                        {review.rating}
                        <span className="text-xs font-normal">/5</span>
                      </div>
                      <span className="text-[#FF8800] fill-[#FF8800]">
                        <svg
                          height="16"
                          width="16"
                          viewBox="0 -10 511.99143 511"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#FF8800"
                        >
                          <path d="m510.652344 185.882812c-3.371094-10.367187-12.566406-17.707031-23.402344-18.6875l-147.796875-13.417968-58.410156-136.75c-4.3125-10.046875-14.125-16.53125-25.046875-16.53125s-20.738282 6.484375-25.023438 16.53125l-58.410156 136.75-147.820312 13.417968c-10.835938 1-20.011719 8.339844-23.402344 18.6875-3.371094 10.367188-.257813 21.738282 7.9375 28.925782l111.722656 97.964844-32.941406 145.085937c-2.410156 10.667969 1.730468 21.699219 10.582031 28.097656 4.757813 3.457031 10.347656 5.183594 15.957031 5.183594 4.820313 0 9.644532-1.28125 13.953125-3.859375l127.445313-76.203125 127.421875 76.203125c9.347656 5.585938 21.101562 5.074219 29.933593-1.324219 8.851563-6.398437 12.992188-17.429687 10.582032-28.097656l-32.941406-145.085937 111.722656-97.964844c8.191406-7.1875 11.308594-18.535156 7.9375-28.925782zm-252.203125 223.722657"></path>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="text-[#002d59] text-sm leading-relaxed font-medium line-clamp-2 h-12">
                    {review.text}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
