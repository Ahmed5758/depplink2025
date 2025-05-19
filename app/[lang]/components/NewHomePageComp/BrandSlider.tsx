"use client";

import React, { useRef, useState, useEffect } from "react";
import { Autoplay, Navigation, Pagination, Scrollbar, Mousewheel, Grid, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import './scrollBar.css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import Image from "next/image";
import { NewMedia } from "../../api/Api";
import Link from "next/link";


export default function BrandSlider(props: any) {

    const brands = props?.data;
    const origin = props?.origin;
    const isArabic = props?.isArabic;
    const isMobileOrTablet = props?.isMobileOrTablet;
    // const productDataSlider = props?.productDataSlider?.products?.data;
    const productDataSlider = props?.productDataSlider;
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const scrollAmount = 300;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    // 🔁 Add wheel-to-horizontal scroll
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                el.scrollBy({
                    left: e.deltaY,
                });
            }
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, []);

    // Drag scroll handlers
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handleMouseDown = (e: MouseEvent) => {
            setIsDragging(true);
            setStartX(e.pageX - el.offsetLeft);
            setScrollLeft(el.scrollLeft);
        };

        const handleMouseLeave = () => setIsDragging(false);
        const handleMouseUp = () => setIsDragging(false);

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - el.offsetLeft;
            const walk = (x - startX) * 1.5; // 1.5 = drag speed
            el.scrollLeft = scrollLeft - walk;
        };

        el.addEventListener("mousedown", handleMouseDown);
        el.addEventListener("mouseleave", handleMouseLeave);
        el.addEventListener("mouseup", handleMouseUp);
        el.addEventListener("mousemove", handleMouseMove);

        return () => {
            el.removeEventListener("mousedown", handleMouseDown);
            el.removeEventListener("mouseleave", handleMouseLeave);
            el.removeEventListener("mouseup", handleMouseUp);
            el.removeEventListener("mousemove", handleMouseMove);
        };
    }, [isDragging, startX, scrollLeft]);

    const firstRowBrands = brands?.slice(0, Math.ceil(brands.length / 2));
    const secondRowBrands = brands?.slice(Math.ceil(brands.length / 2));
    return (
        <>
            {isMobileOrTablet ?
                <Swiper
                    spaceBetween={16}
                    slidesPerView={6}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 16,
                            grid: { rows: 2, fill: 'row' },
                        },
                        640: {
                            slidesPerView: 1.3,
                            spaceBetween: 16,
                            grid: { rows: 2, fill: 'row' },
                        },
                        768: {
                            slidesPerView: 2.6,
                            spaceBetween: 16,
                            grid: { rows: 2, fill: 'row' },
                        },
                        1024: {
                            slidesPerView: 3.2,
                            spaceBetween: 16,
                            grid: { rows: 2, fill: 'row' },
                        },
                    }}
                    autoHeight={false}
                    centeredSlides={false}
                    autoplay={false}
                    pagination={false}
                    loop={false}
                    scrollbar={{
                        draggable: true,
                        hide: false, // Show scrollbar
                    }}
                    grid={{
                        rows: 2,
                        fill: "row",
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
                    className="swiperProductSlider !pb-5"
                >
                    {brands?.map((brand: any, i: number) => {
                        const brandCategoryCount = brand?.category?.length
                        const brandImage: any = isMobileOrTablet ? brand?.brand_media_app_image?.image : brand?.brand_media_image?.image;
                        return (
                            <SwiperSlide className="" key={i}>
                                <div className="bg-white p-2 rounded-lg shadow-md w-full relative">
                                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                        <div className="brand_logo px-1 col-span-2">
                                            <Image
                                                src={`${NewMedia}/${brandImage}`}
                                                alt={brandImage}
                                                title={brandImage}
                                                width={180}
                                                height={45}
                                                quality={100}
                                                style={{ maxWidth: isMobileOrTablet ? "" : "180px", height: "65px" }}
                                                className="object-contain mx-auto"
                                                loading="lazy"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                                            />
                                        </div>
                                        <div className="overflow-y-auto grid grid-cols-2 lg:col-span-2 h-36">
                                            {brand?.category.map((category: any, id: number) => (
                                                <div
                                                    key={`brandIcon_${id}`}
                                                    className="brand_item text-center p-1 md:p-2 bg-white hover:bg-[#219EBC40] hover:fill-primary rounded-md mx-auto transition-all duration-300 ease-in-out cursor-pointer w-full h-[64px] overflow-hidden"
                                                >
                                                    <Link prefetch={false} scroll={false} href={`${origin}/${isArabic ? "ar" : "en"}/category/${category.slug}?page=1&brand=${encodeURIComponent(brand?.name)}`} aria-label="">
                                                        <Image
                                                            src={category?.image_link_app ? category.image_link_app : "https://images.tamkeenstores.com.sa/assets/new-media/air-conditioner%20(convert.io).webp"}
                                                            alt="Air Conditioners"
                                                            title="Air Conditioners"
                                                            width={32}
                                                            height={32}
                                                            quality={100}
                                                            className="w-6 h-6 mx-auto"
                                                            loading="lazy"
                                                        />
                                                        <span className="text-xs font-semibold text-primary line-clamp-1 max-md:text-[0.65rem] mt-1">
                                                            {category?.name}
                                                        </span>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-white h-5 shadow-brandShadow left-0 right-0 bottom-0 z-40 absolute opacity-80"></div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                :
                <>
                    <div className="relative w-full">
                        {/* Left Arrow */}
                        <button
                            onClick={() => scroll("left")}
                            className="absolute top-1/2 translate-middle-y z-10 cursor-pointer fill-white p-2.5 left-1 md:p-3 md:-left-12 bg-primary rounded-full"
                        >
                            <svg
                                height="22"
                                viewBox="0 0 24 24"
                                width="22"
                                xmlns="http://www.w3.org/2000/svg"
                                id="fi_10486749"
                                className="fill-current transform transition duration-150 ease-in-out rotate-90"
                            >
                                <path
                                    clip-rule="evenodd"
                                    d="m2.58579 7.58579c.78104-.78105 2.04738-.78105 2.82842 0l6.58579 6.58581 6.5858-6.58581c.781-.78105 2.0474-.78105 2.8284 0 .7811.78104.7811 2.04738 0 2.82841l-8 8c-.781.7811-2.0474.7811-2.8284 0l-8.00001-8c-.78105-.78103-.78105-2.04737 0-2.82841z"
                                    fill-rule="evenodd"
                                ></path>
                            </svg>
                        </button>
                        <div
                            ref={scrollRef}
                            className="overflow-x-auto scroll-smooth scrollbar-hide"
                        >
                            <div className="flex flex-col gap-4 min-w-max">
                                {/* First Row */}
                                <div className="flex gap-4">
                                    {firstRowBrands?.map((brand: any, i: number) => {
                                        const brandCategoryCount = brand?.category?.length || 0;
                                        const brandImage = isMobileOrTablet
                                            ? brand?.brand_media_app_image?.image
                                            : brand?.brand_media_image?.image;

                                        const gridColsClass =
                                            brandCategoryCount >= 12
                                                ? "grid-cols-8"
                                                : brandCategoryCount === 9
                                                    ? "grid-cols-6"
                                                    : brandCategoryCount === 5 || brandCategoryCount === 6 ?
                                                        "grid-cols-4"
                                                        : brandCategoryCount === 4 || brandCategoryCount === 3
                                                            ? "grid-cols-3"
                                                            : "grid-cols-2";

                                        return (
                                            <div key={`brand_1_${i}`} className={`
                                                flex-shrink-0 w-full ${brandCategoryCount >= 12 ? "max-w-[30%]" : brandCategoryCount == 5 || brandCategoryCount == 6 ? "max-w-[14%]" : brandCategoryCount == 9 ? "max-w-[22%]" : "max-w-[12%]"}`}>
                                                <div className={`bg-white p-2 rounded-lg shadow-md w-full grid ${gridColsClass}`}>
                                                    <div className="brand_logo px-1 col-span-2">
                                                        <Image
                                                            src={`${NewMedia}/${brandImage}`}
                                                            alt={brandImage}
                                                            title={brandImage}
                                                            width={180}
                                                            height={45}
                                                            quality={100}
                                                            style={{ maxWidth: "180px", height: "65px" }}
                                                            className="object-contain mx-auto"
                                                            loading="lazy"
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                                                        />
                                                    </div>
                                                    {brand?.category?.map((category: any, id: number) => (
                                                        <div
                                                            key={`cat_1_${i}_${id}`}
                                                            className="brand_item text-center p-1 md:p-2 bg-white hover:bg-[#219EBC40] hover:fill-primary rounded-md mx-auto transition-all duration-300 ease-in-out cursor-pointer w-full h-[64px] overflow-hidden"
                                                        >
                                                            <Link
                                                                prefetch={false}
                                                                scroll={false}
                                                                href={`${origin}/${isArabic ? "ar" : "en"}/category/${category.slug}?page=1&brand=${encodeURIComponent(brand?.name)}`}
                                                                aria-label={isArabic ? category.name_arabic : category.name}
                                                            >
                                                                <Image
                                                                    src={category?.image_link_app || "https://images.tamkeenstores.com.sa/assets/new-media/air-conditioner%20(convert.io).webp"}
                                                                    alt="Air Conditioners"
                                                                    title="Air Conditioners"
                                                                    width={32}
                                                                    height={32}
                                                                    quality={100}
                                                                    className="w-6 h-6 mx-auto"
                                                                    loading="lazy"
                                                                />
                                                                <span className="text-xs font-semibold text-primary line-clamp-1 max-md:text-[0.65rem] mt-2">
                                                                    {category?.name}
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Second Row */}
                                <div className="flex gap-4">
                                    {secondRowBrands?.map((brand: any, i: number) => {
                                        const brandCategoryCount = brand?.category?.length || 0;
                                        const brandImage = isMobileOrTablet
                                            ? brand?.brand_media_app_image?.image
                                            : brand?.brand_media_image?.image;

                                        const gridColsClass =
                                            brandCategoryCount >= 12
                                                ? "grid-cols-8"
                                                : brandCategoryCount === 9
                                                    ? "grid-cols-6"
                                                    : brandCategoryCount === 5 || brandCategoryCount === 6 ?
                                                        "grid-cols-4"
                                                        : brandCategoryCount === 4 || brandCategoryCount === 3
                                                            ? "grid-cols-3"
                                                            : "grid-cols-2";

                                        return (
                                            <div key={`brand_2_${i}`} className={`
                                                flex-shrink-0 w-full ${brandCategoryCount >= 12 ? "max-w-[30%]" : brandCategoryCount == 5 || brandCategoryCount == 6 ? "max-w-[14%]" : brandCategoryCount == 9 ? "max-w-[22%]" : "max-w-[12%]"}`}>
                                                <div className={`bg-white p-2 rounded-lg shadow-md w-full grid ${gridColsClass}`}>
                                                    <div className="brand_logo px-1 col-span-2">
                                                        <Image
                                                            src={`${NewMedia}/${brandImage}`}
                                                            alt={brandImage}
                                                            title={brandImage}
                                                            width={180}
                                                            height={45}
                                                            quality={100}
                                                            style={{ maxWidth: "180px", height: "65px" }}
                                                            className="object-contain mx-auto"
                                                            loading="lazy"
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                                                        />
                                                    </div>
                                                    {brand?.category?.map((category: any, id: number) => (
                                                        <div
                                                            key={`cat_2_${i}_${id}`}
                                                            className="brand_item text-center p-1 md:p-2 bg-white hover:bg-[#219EBC40] hover:fill-primary rounded-md mx-auto transition-all duration-300 ease-in-out cursor-pointer w-full h-[64px] overflow-hidden"
                                                        >
                                                            <Link
                                                                prefetch={false}
                                                                scroll={false}
                                                                href={`${origin}/${isArabic ? "ar" : "en"}/category/${category.slug}?page=1&brand=${encodeURIComponent(brand?.name)}`}
                                                                aria-label={isArabic ? category.name_arabic : category.name}
                                                            >
                                                                <Image
                                                                    src={category?.image_link_app || "https://images.tamkeenstores.com.sa/assets/new-media/air-conditioner%20(convert.io).webp"}
                                                                    alt="Air Conditioners"
                                                                    title="Air Conditioners"
                                                                    width={32}
                                                                    height={32}
                                                                    quality={100}
                                                                    className="w-6 h-6 mx-auto"
                                                                    loading="lazy"
                                                                />
                                                                <span className="text-xs font-semibold text-primary line-clamp-1 max-md:text-[0.65rem] mt-2">
                                                                    {category?.name}
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={() => scroll("right")}
                            className="absolute top-1/2 translate-middle-y z-10 cursor-pointer fill-white p-2.5 right-1 md:p-3 md:-right-12 bg-primary rounded-full"
                        >
                            <svg
                                height="22"
                                viewBox="0 0 24 24"
                                width="22"
                                xmlns="http://www.w3.org/2000/svg"
                                id="fi_10486750"
                                className="fill-current transform transition duration-150 ease-in-out -rotate-90"
                            >
                                <path
                                    clip-rule="evenodd"
                                    d="m2.58579 7.58579c.78104-.78105 2.04738-.78105 2.82842 0l6.58579 6.58581 6.5858-6.58581c.781-.78105 2.0474-.78105 2.8284 0 .7811.78104.7811 2.04738 0 2.82841l-8 8c-.781.7811-2.0474.7811-2.8284 0l-8.00001-8c-.78105-.78103-.78105-2.04737 0-2.82841z"
                                    fill-rule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </>
            }
        </>
    );
}
