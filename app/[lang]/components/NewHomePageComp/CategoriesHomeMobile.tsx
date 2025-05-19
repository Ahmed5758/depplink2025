import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Scrollbar, Mousewheel, Grid, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import './scrollBar.css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
// import './styles.css';
import { NewMedia } from '../../api/Api';

export default function CategoriesHomeMobile(props: any) {
    const categories = props?.params?.sec_three_categories || [];
    const isArabic = props?.lang == 'ar' ? true : false;
    const renderCategoryName = (category: any) => (category.name ? category.name : '');
    const renderHeading = () => (props?.params?.sec_three_title ? props?.params?.sec_three_title : '');
    const origin = typeof window !== 'undefined' ? window.location.origin : '';

    const showAllLink = props?.userAgent?.isMobile || props?.userAgent?.isTablet
        ? `${origin}/${isArabic ? "ar" : "en"}/categorieslisting`
        : `${origin}/${isArabic ? "ar" : "en"}/categorieslisting`;

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    return (
        <div className="overflow-hidden w-full mb-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="headingHomeMobile">{renderHeading()}</h2>
                <Link prefetch={false} scroll={false} href={showAllLink} className="text-sm text-primary font-semibold bg-[#EBEBEB] px-1.5 py-1 rounded-md shadow-sm">
                    {isArabic ? 'عـرض الكــل' : 'Show All'}
                </Link>
            </div>
            {isClient && (
                <>
                    <Swiper
                        direction="horizontal"
                        slidesPerView={5}  // 2 slides per row
                        spaceBetween={8}  // Space between slides
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
                        grid={{
                            rows: 2,
                            fill: "row",
                        }}
                        freeMode={true}
                        // speed={5000} // Smooth transition speed for slide changes
                        modules={[Scrollbar, Mousewheel, Grid, FreeMode]}  // Use only Scrollbar, Mousewheel, and Grid
                        className="mySwiper !pb-6"
                    >
                        {categories.length > 0 ? (
                            categories.map((category: any, i: number) => (
                                <SwiperSlide key={i} className="">
                                    <div>
                                        <div className=''>
                                            <Link prefetch={false} scroll={false} href={`${origin}/${props?.lang}/category/${category?.slug}`} className="rounded-md">
                                                <Image
                                                    src={category?.image ? NewMedia + category?.image?.image : ''}
                                                    alt={`${renderCategoryName(category)}-${i + 11}`}
                                                    title={renderCategoryName(category)}
                                                    width={0}
                                                    height={0}
                                                    quality={100}
                                                    sizes='(max-width: 140px) 100vw, (max-width: 1068px) 1150px, (max-width: 1024px) 1, 100vw'
                                                    priority={true}
                                                    className="mx-auto h-[4.8rem] w-full border rounded-xl shadow-sm border-[#ff7b345e]"
                                                />
                                                <h2 className="font-bold mt-2 text-[0.65rem] xl:text-xs line-clamp-1 md:line-clamp-2 leading-4 text-xs text-center">
                                                    {renderCategoryName(category)}
                                                </h2>
                                            </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        ) : (
                            Array.from({ length: 16 }).map((_, index) => (
                                <SwiperSlide className="p-0.5" key={index}>
                                    <div className="bg-white rounded-lg shadow-md text-center text-primary animate-pulse w-full">
                                        <div className="rounded-md bg-dark/10 p-2.5 h-28 lg:h-[13.5rem] w-full"></div>
                                    </div>
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>
                </>
            )}
        </div>
    );
}
