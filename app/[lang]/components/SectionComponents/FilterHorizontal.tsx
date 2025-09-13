"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { NewMedia } from "../../api/Api";
import "swiper/css";
import "swiper/css/navigation";

interface FilterProps {
  isArabic: boolean;
  devicetype: string;
  brands: { id: string; name: string; name_arabic: string; brand_media_image?: { image: string } }[];
  selectedbrands: Record<string, boolean>;
  tags: { name: string; name_arabic: string; childs: { name: string; name_arabic: string; icon?: string }[] }[];
  selectedtags: Record<string, boolean>;
  setClear: () => void;
  setBrandData: (id: string, name: string) => void;
  onChangetags: (tag: { name: string; name_arabic: string; icon?: string }) => void;
}

export default function FilterHorizontal(props: FilterProps) {
  const isMobileOrTablet = props?.devicetype === "mobile" || props?.devicetype === "tablet";
  const containerClass = isMobileOrTablet ? "container" : "px-20";
  const isArabic = props.isArabic;

  // Check Icon (same as FilterVertical.tsx)
  const checkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="11"
      viewBox="0 0 15 11"
      fill="none"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-75"
      aria-hidden="true"
    >
      <path
        opacity="0.5"
        d="M13.5029 0.569855C13.7684 0.569955 14.0232 0.675132 14.2109 0.862823C14.3986 1.05052 14.5038 1.3054 14.5039 1.57083C14.5039 1.83623 14.3985 2.09109 14.2109 2.27884L14.0342 2.4556L14.0322 2.45364L6.20898 10.2769C6.11608 10.3701 6.00632 10.4452 5.88477 10.4956C5.76325 10.5461 5.63254 10.5718 5.50098 10.5718C5.36962 10.5718 5.2395 10.546 5.11816 10.4956C5.02717 10.4579 4.94204 10.4066 4.86621 10.3443L4.79297 10.2779L1.29297 6.77786C1.20008 6.68492 1.12646 6.57407 1.07617 6.45267C1.02595 6.33129 1 6.20121 1 6.06985C1.00001 5.93848 1.02594 5.80843 1.07617 5.68704C1.12647 5.56562 1.20005 5.4548 1.29297 5.36185C1.38594 5.26888 1.4967 5.19537 1.61816 5.14505C1.73955 5.09477 1.86959 5.06892 2.00098 5.06888C2.13247 5.06888 2.26328 5.09473 2.38477 5.14505C2.50604 5.19533 2.61613 5.26904 2.70898 5.36185L5.50195 8.15482L12.7949 0.862823C12.9827 0.675263 13.2375 0.569855 13.5029 0.569855Z"
        fill="#004B7A"
        stroke="#004B7A"
        strokeWidth="0.5"
      />
    </svg>
  );

  // Dropdown Icon (same as original)
  const dropdownIcon = (
    <svg
      height="16"
      viewBox="0 0 24 24"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-current transform group-hover:-rotate-180 transition duration-150 ease-in-out"
    >
      <path
        clipRule="evenodd"
        d="m2.58579 7.58579c.78104-.78105 2.04738-.78105 2.82842 0l6.58579 6.58581 6.5858-6.58581c.781-.78105 2.0474-.78105 2.8284 0 .7811.78104.7811 2.04738 0 2.82841l-8 8c-.781.7811-2.0474.7811-2.8284 0l-8.00001-8c-.78105-.78103-.78105-2.04737 0-2.82841z"
        fillRule="evenodd"
      />
    </svg>
  );

  const dropdownIconRight = (
    <svg
      height="18"
      width="18"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-current transform group-hover:translate-x-1 transition duration-150 ease-in-out"
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M8.29289 4.29289c.39053-.39053 1.02369-.39053 1.41422 0l7 7c.3905.39053.3905 1.02369 0 1.41422l-7 7c-.39053.3905-1.02369.3905-1.41422 0-.39052-.39053-.39052-1.02369 0-1.41422L14.5858 12 8.29289 5.70711c-.39052-.39053-.39052-1.02369 0-1.41422z"
      />
    </svg>
  );


  // Const For Text
  const filterText = isArabic ? "الفلـتر حــسب" : "Filter by";
  const clearText = isArabic ? "مسح الكل" : "Clear all";
  const brandText = isArabic ? "العلامة التجارية" : "Brand";

  // Split tags into two parts (left and right)
  const midPoint = Math.ceil(props.tags.length / 2);
  const leftTags = props.tags.slice(0, midPoint);
  const rightTags = props.tags.slice(midPoint);

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`filter_wrapper bg-white rounded-[1.438rem] md:p-[1.125rem] p-4 shrink-0 overflow-hidden ${containerClass}`}
      style={{ boxShadow: "0px 0px 3.125px 0px rgba(0, 0, 0, 0.25)" }}
    >
      {/* Filter Header */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="headingHomeMain !text-base !text-dark">{filterText}</h2>
          {Object.keys(props.selectedbrands).length > 0 || Object.keys(props.selectedtags).length > 0 ?
            <button
              className="clear_all text-xs text-[#BE0404] font-semibold"
              onClick={props.setClear}
              aria-label={clearText}
            >
              {clearText}
            </button>
          :null}
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {Object.keys(props.selectedbrands).map((brandName) => {
            const brand = props.brands.find((b) => b.name === brandName) ?? {
              name_arabic: brandName,
            };
            return (
              <button
                key={brandName}
                className="bestProButton w-fit whitespace-nowrap border-gray text-primary hover:text-white hover:bg-primary selected !px-3 !py-1 !text-[.625rem]"
                aria-label={isArabic ? brand.name_arabic : brandName}
              >
                {isArabic ? brand.name_arabic : brandName}
              </button>
            );
          })}
          {Object.keys(props.selectedtags).map((tagName) => {
            const tag = props.tags
              .flatMap((t) => t.childs)
              .find((c) => c.name === tagName) ?? { name_arabic: tagName };
            return (
              <button
                key={tagName}
                className="bestProButton w-fit whitespace-nowrap border-gray text-primary hover:text-white hover:bg-primary selected !px-3 !py-1 !text-[.625rem]"
                aria-label={isArabic ? tag.name_arabic : tagName}
              >
                {isArabic ? tag.name_arabic : tagName}
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full flex md:flex-row flex-col md:items-start items-center gap-2">
        {/* Filter Left */}
        <div className="filter_left md:w-1/2 w-full">
          {leftTags.map((tagdata, t) => (
            <div
              key={t}
              className="flex md:flex-row flex-col md:items-center 2xl:gap-[2.5rem] md:gap-[1 China.5rem] gap-3 w-full overflow-hidden mb-[1.188rem]"
            >
              <p className="2xl:text-sm text-xs text-[#252B42] font-bold flex items-center gap-[.625rem] w-full 2xl:w-[6rem] md:max-w-28 relative">
                <span className="line-clamp-1">
                  {isArabic ? tagdata.name_arabic : tagdata.name}
                </span>
                {tagdata.childs.filter((child) => props.selectedtags[child.name])
                  .length > 0 ? (
                  <span className="rounded-[.6375rem] w-4 h-4 bg-primary text-white shrink-0 inline-flex items-center justify-center text-[.6375rem] font-medium md:absolute ltr:md:-right-2 rtl:md:-left-2 md:top-1/2 md:-translate-y-1/2">
                    {
                      tagdata.childs.filter(
                        (child) => props.selectedtags[child.name]
                      ).length
                    }
                  </span>
                ) : null}
              </p>
              <div className="relative md:!w-[calc(100%-10rem)] w-full overflow-hidden">
                <div
                  ref={nextRef}
                  className="absolute right-0 top-0 bottom-0 z-10 cursor-pointer text-primary w-9 flex items-center justify-end pointer-events-auto"
                  style={{
                    background:
                      "linear-gradient(270deg, #FFF 40.55%, rgba(246, 247, 247, 0.05) 100%)",
                  }}
                >
                  {dropdownIconRight}
                </div>
                <Swiper
                  loop={true}
                  loopAdditionalSlides={tagdata.childs.length}
                  spaceBetween={16}
                  breakpoints={{
                    320: { slidesPerView: 2, spaceBetween: 6 },
                    640: { slidesPerView: 3, spaceBetween: 6 },
                    768: { slidesPerView: 4, spaceBetween: 8 },
                    1024: { slidesPerView: 5, spaceBetween: 8 },
                    1280: { slidesPerView: 6, spaceBetween: 12 },
                  }}
                  modules={[Navigation]}
                  onBeforeInit={(swiper) => {
                    if (swiper.params.navigation) {
                      const nav = swiper.params.navigation as any;
                      nav.prevEl = prevRef.current;
                      nav.nextEl = nextRef.current;
                    }
                  }}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  className="!w-full"
                >
                  {tagdata.childs.map((tagchild, i) => {
                    const isSelected = props.selectedtags[tagchild.name] === true;
                    return (
                      <SwiperSlide
                        key={i}
                        className="!w-16 2xl:!w-20 shrink-0"
                      >
                        <button
                          onClick={() => props.onChangetags(tagchild)}
                          className={`relative 2xl:w-20 w-16 2xl:h-10 h-8 rounded-full cursor-pointer outline-none border-primary flex items-center justify-center px-2 bg-[#F3F3F3] ${
                            isSelected ? "border-2" : "border"
                          }`}
                          aria-label={
                            isArabic ? tagchild.name_arabic : tagchild.name
                          }
                        >
                          {tagchild.icon ? (
                            <div
                              dangerouslySetInnerHTML={{ __html: tagchild.icon }}
                            />
                          ) : (
                            <div className="text-[#121212] font-bold tracking-[0.00544rem]">
                              <p className="2xl:text-[0.675rem] text-[0.625rem]">
                                {isArabic ? tagchild.name_arabic : tagchild.name}
                              </p>
                            </div>
                          )}
                          {isSelected && checkIcon}
                        </button>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          ))}
        </div>

        <div className="w-[.125rem] 2xl:h-[12.5rem] h-[9rem] bg-[#D9D9D9] rounded-[.625rem] 2xl:mx-6 mx-[13.5px] md:block hidden"></div>

        {/* Filter Right */}
        <div className="filter_right md:w-1/2 w-full">
          {/* Brand Section */}
          {props.brands?.length > 0 && (
            <div className="flex md:flex-row flex-col md:items-center 2xl:gap-[2.5rem] md:gap-[1 China.5rem] gap-3 w-full overflow-hidden mb-[1.188rem]">
              <p className="2xl:text-sm text-xs text-[#252B42] font-bold flex items-center gap-[.625rem] w-full 2xl:w-[6rem] md:max-w-20 relative">
                <span className="line-clamp-1">{brandText}</span>
                {Object.keys(props.selectedbrands).length > 0 ? (
                  <span className="rounded-[.6375rem] w-4 h-4 bg-primary text-white shrink-0 inline-flex items-center justify-center text-[.6375rem] font-medium md:absolute ltr:md:-right-2 rtl:md:-left-2 md:top-1/2 md:-translate-y-1/2">
                    {Object.keys(props.selectedbrands).length}
                  </span>
                ) : null}
              </p>
              <div className="relative md:!w-[calc(100%-10rem)] w-full overflow-hidden">
                <div
                  ref={nextRef}
                  className="absolute right-0 top-0 bottom-0 z-10 cursor-pointer text-primary w-9 flex items-center justify-end pointer-events-auto"
                  style={{
                    background:
                      "linear-gradient(270deg, #FFF 40.55%, rgba(246, 247, 247, 0.05) 100%)",
                  }}
                >
                  {dropdownIconRight}
                </div>
                <Swiper
                  loop={true}
                  loopAdditionalSlides={props.brands.length}
                  spaceBetween={16}
                  breakpoints={{
                    320: { slidesPerView: 2, spaceBetween: 6 },
                    640: { slidesPerView: 3, spaceBetween: 6 },
                    768: { slidesPerView: 4, spaceBetween: 8 },
                    1024: { slidesPerView: 5, spaceBetween: 8 },
                    1280: { slidesPerView: 6, spaceBetween: 12 },
                  }}
                  modules={[Navigation]}
                  onBeforeInit={(swiper) => {
                    if (swiper.params.navigation) {
                      const nav = swiper.params.navigation as any;
                      nav.prevEl = prevRef.current;
                      nav.nextEl = nextRef.current;
                    }
                  }}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  className="!w-full"
                >
                  {props.brands.map((brand, i) => {
                    const isSelected = props.selectedbrands[brand.name] === true;
                    return (
                      <SwiperSlide
                        key={brand.id}
                        className="!w-16 2xl:!w-20 shrink-0"
                      >
                        <button
                          onClick={() =>
                            props.setBrandData(brand.id, brand.name)
                          }
                          className={`relative 2xl:w-20 w-16 2xl:h-10 h-8 px-4 py-[9px] rounded-full cursor-pointer outline-none border-primary bg-[#F3F3F3] ${
                            isSelected ? "border-2" : "border"
                          }`}
                          aria-label={isArabic ? brand.name_arabic : brand.name}
                        >
                          <Image
                            alt={isArabic ? brand.name_arabic : brand.name}
                            title={isArabic ? brand.name_arabic : brand.name}
                            src={
                              brand.brand_media_image
                                ? NewMedia + brand.brand_media_image.image
                                : "https://images.tamkeenstores.com.sa/assets/new-media/3f4a05b645bdf91af2a0d9598e9526181714129744.png"
                            }
                            width={0}
                            height={0}
                            decoding="async"
                            data-nimg="1"
                            sizes="100vw"
                            quality={100}
                            loading="lazy"
                            className="w-full h-full object-contain rounded-[1rem]"
                          />
                          {isSelected && checkIcon}
                        </button>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          )}

          {rightTags.map((tagdata, t) => (
            <div
              key={t}
              className="flex md:flex-row flex-col md:items-center 2xl:gap-[2.5rem] md:gap-[1 China.5rem] gap-3 w-full overflow-hidden mb-[1.188rem]"
            >
              <p className="2xl:text-sm text-xs text-[#252B42] font-bold flex items-center gap-[.625rem] w-full 2xl:w-[6rem] md:max-w-20 relative">
                <span className="line-clamp-1">
                  {isArabic ? tagdata.name_arabic : tagdata.name}
                </span>
                {tagdata.childs.filter((child) => props.selectedtags[child.name])
                  .length > 0 ? (
                  <span className="rounded-[.6375rem] w-4 h-4 bg-primary text-white shrink-0 inline-flex items-center justify-center text-[.6375rem] font-medium md:absolute ltr:md:-right-2 rtl:md:-left-2 md:top-1/2 md:-translate-y-1/2">
                    {
                      tagdata.childs.filter(
                        (child) => props.selectedtags[child.name]
                      ).length
                    }
                  </span>
                ) : null}
              </p>
              <div className="relative md:!w-[calc(100%-10rem)] w-full overflow-hidden">
                <div
                  ref={nextRef}
                  className="absolute right-0 top-0 bottom-0 z-10 cursor-pointer text-primary w-9 flex items-center justify-end pointer-events-auto"
                  style={{
                    background:
                      "linear-gradient(270deg, #FFF 40.55%, rgba(246, 247, 247, 0.05) 100%)",
                  }}
                >
                  {dropdownIconRight}
                </div>
                <Swiper
                  loop={true}
                  loopAdditionalSlides={tagdata.childs.length}
                  spaceBetween={16}
                  breakpoints={{
                    320: { slidesPerView: 2, spaceBetween: 6 },
                    640: { slidesPerView: 3, spaceBetween: 6 },
                    768: { slidesPerView: 4, spaceBetween: 8 },
                    1024: { slidesPerView: 5, spaceBetween: 8 },
                    1280: { slidesPerView: 6, spaceBetween: 12 },
                  }}
                  modules={[Navigation]}
                  onBeforeInit={(swiper) => {
                    if (swiper.params.navigation) {
                      const nav = swiper.params.navigation as any;
                      nav.prevEl = prevRef.current;
                      nav.nextEl = nextRef.current;
                    }
                  }}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  className="!w-full"
                >
                  {tagdata.childs.map((tagchild, i) => {
                    const isSelected = props.selectedtags[tagchild.name] === true;
                    return (
                      <SwiperSlide
                        key={i}
                        className="!w-16 2xl:!w-20 shrink-0"
                      >
                        <button
                          onClick={() => props.onChangetags(tagchild)}
                          className={`relative 2xl:w-20 w-16 2xl:h-10 h-8 rounded-full cursor-pointer outline-none border-primary flex items-center justify-center px-2 bg-[#F3F3F3] ${
                            isSelected ? "border-2" : "border"
                          }`}
                          aria-label={
                            isArabic ? tagchild.name_arabic : tagchild.name
                          }
                        >
                          {tagchild.icon ? (
                            <div
                              dangerouslySetInnerHTML={{ __html: tagchild.icon }}
                            />
                          ) : (
                            <div className="text-[#121212] font-bold tracking-[0.00544rem]">
                              <p className="2xl:text-[0.675rem] text-[0.625rem]">
                                {isArabic ? tagchild.name_arabic : tagchild.name}
                              </p>
                            </div>
                          )}
                          {isSelected && checkIcon}
                        </button>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}