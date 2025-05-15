import Link from "next/link";
import Image from "next/image";
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import React, { useMemo, useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

const ProductSliderMobile = dynamic(() => import('./ProductSliderMobile'), { ssr: false })

export default function BestProductsMobile(props: any, isArabic: boolean) {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isScrollable, setIsScrollable] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [bestSellerSelected, setBestSellerSelected] = useState<any>(null);

    useEffect(() => {
        const checkScrollable = () => {
            if (containerRef.current) {
                // Check if the container's scroll width exceeds its client width
                setIsScrollable(containerRef.current.scrollWidth > containerRef.current.clientWidth);
            }
        };

        // Check initially and also on window resize
        checkScrollable();
        window.addEventListener('resize', checkScrollable);
        const [firstKey, firstValue]: any = Object.entries(props?.data)[0];
        setSelectedCategory(0);
        setBestSellerSelected(firstValue?.prodata?.products?.data);
        return () => {
            window.removeEventListener('resize', checkScrollable);
        };
    }, [props?.data]);
    return (
        <div className="">
            <h2 className="headingHomeMobile">{props?.lang == 'ar' ? props?.data?.sec4_best_seller_title_ar ?? "المنتجات الأكثر مبيعا" : props?.data?.sec4_best_seller_title ?? "Best Selling Products"}</h2>
            <div className="relative">
                <div className="relative w-full">
                    <div
                        ref={containerRef}
                        className={`flex flex-nowrap gap-2 pt-5 pb-3 overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100`}
                    >
                        {Object.values(props?.data).map((value: any, i) => (
                            <>
                                {(value?.category?.name || value?.category?.name_arabic) ?
                                    <button
                                        key={i}
                                        className={`border border-[#004B7A] text-[#004B7A] hover:bg-[#004B7A] hover:text-white px-2.5 py-2 rounded-full text-xs font-medium w-max min-w-max md:min-w-max ${selectedCategory == i ? 'selected bg-[#004B7A] !text-white' : ''}`}
                                        // onClick={() => setBestSellerSelected([...value?.prodata?.products?.data])}
                                        onClick={() => {
                                            setSelectedCategory(i);
                                            setBestSellerSelected(value?.prodata?.products?.data);
                                        }
                                        }
                                    >
                                        {props?.isArabic ? value?.category?.name_arabic : value?.category?.name}
                                    </button>
                                    : null}
                            </>
                        ))}
                    </div>
                </div>

                <ProductSliderMobile
                    products={bestSellerSelected}
                    lang={props?.lang}
                    dict={props?.dict}
                    origin={origin}
                    userAgent={props?.userAgent}
                    classHeading="!hidden"
                />
            </div>
        </div>
    );
};
