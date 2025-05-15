import Link from "next/link";
import Image from "next/image";
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import React, { useMemo, useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

const Products = dynamic(() => import('../Products'), { ssr: false })

export default function BestProducts(props: any) {
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
        setSelectedCategory(0);
        const [firstKey, firstValue]: any = Object.entries(props?.data)[0];
        setBestSellerSelected(firstValue?.prodata?.products?.data);
        return () => {
            window.removeEventListener('resize', checkScrollable);
        };
    }, [props?.data]);
    return (
        <div className="">
            <h2 className="headingHomeMain">{props?.lang == 'ar' ? props?.data?.sec4_best_seller_title_ar : props?.data?.sec4_best_seller_title}</h2>
            <div className="relative">
                <div
                    ref={containerRef}
                    className={`flex gap-x-4 py-3 w-auto max-w-auto ${isScrollable ? 'overflow-x-auto' : 'overflow-x-hidden'}`}
                >
                    {Object.values(props?.data).map((value: any,i: any) => (
                        <>
                        {(value?.category?.name || value?.category?.name_arabic) ?
                        <button
                            key={i}
                            className={`bestProButton ${selectedCategory == i ? 'selected bg-[#004B7A] !text-white' : ''}`}
                            onClick={() => {
                                setSelectedCategory(i);
                                setBestSellerSelected(value?.prodata?.products?.data);
                                }
                            }  
                        >
                            {props?.isArabic ?  value?.category?.name_arabic : value?.category?.name}
                        </button>
                        : null}
                        </>
                    ))}
                </div>

                {/* Arrow left */}
                {/* {isScrollable && (
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 cursor-pointer hover:bg-gray-300 rounded-full transition-all duration-200">
                        <span className="text-dark">←</span>
                    </div>
                )} */}

                {/* Arrow right */}
                {/* {isScrollable && (
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 cursor-pointer hover:bg-gray-300 rounded-full transition-all duration-200">
                        <span className="text-dark">→</span>
                    </div>
                )} */}
                
                <Products 
                    products={bestSellerSelected}
                    lang={props?.lang}
                    dict={props?.dict}
                    origin={origin}
                    userAgent={props?.userAgent}
                    devicetype={props.devicetype}
                />
            </div>
        </div>
    );
};
