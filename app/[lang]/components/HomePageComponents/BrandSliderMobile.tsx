'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NewMedia } from '../../api/Api';

interface Category {
    slug: string;
    name: string;
    name_arabic?: string;
    image_link_app?: string;
}

interface Brand {
    slug: string;
    name: string;
    name_arabic?: string;
    brand_media_image?: { image: string };
    categories?: Category[];
}

interface BrandSliderProps {
    props?: any;
    lang: any;
    dict?: any;
    devicetype?: any;
}

const BrandSliderMobile: React.FC<BrandSliderProps> = ({
    props = [],
    lang = 'ar',
    devicetype = 'desktop',
    dict = [],
}) => {
    const Brandref = useRef<HTMLDivElement>(null);
    const isArabic = lang == 'ar' ? true : false;
    const scrollLeft = () => {
        if (Brandref.current) {
            Brandref.current.scrollLeft -= devicetype ? 200 : 380;
        }
    };
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const showAllLink: any = lang == 'ar' ? props?.sec7_show_all_link_ar : props?.sec7_show_all_link;
    const scrollRight = () => {
        if (Brandref.current) {
            Brandref.current.scrollLeft += devicetype ? 200 : 380;
        }
    };
    const [itemCount, setItemCount] = useState<any>(3)
    useEffect(() => {
        const updateItemCount = () => {
            if (!devicetype) {
                setItemCount(6)
            }
        }

        updateItemCount();
        window.addEventListener("resize", updateItemCount);

        // Clean up the event listener on unmount
        return () => window.removeEventListener("resize", updateItemCount);
    }, []);
    if (!props?.brands || props?.brands.length === 0) {
        return (
            <>
                <div className={`grid grid-cols-3 md:grid-cols-6 gap-3 my-5`}>
                    {[...Array(itemCount)].map((_, i) => (
                        <div
                            key={i}
                            className="relative animate-pulse"
                        >
                            <div className="bg-white p-2 rounded-lg shadow-md mb-1.5 text-sm flex-initial basis-32 sm:basis-40 md:basis-44 lg:basis-58 xl:basis-60 shrink-0 h-36 md:h-72 w-full"></div>
                        </div>
                    ))}
                </div>
            </>
        );
    }

    const renderCategories = (categories: Category[], brandName: string) => (
        categories.map((category, index) => (
            <Link
                key={index}
                href={`${origin}/${isArabic ? "ar" : "en"}/category/${category?.slug}?page=1&brand=${encodeURIComponent(brandName)}`}
                aria-label={isArabic ? category?.name_arabic : category?.name}
                className="text-center p-1 md:p-2 bg-white hover:bg-[#219EBC40] hover:fill-primary rounded-md opacity-50 hover:opacity-100 mx-auto w-full"
            >
                <div className="flex justify-center w-full">
                    <Image
                        src={category?.image_link_app || '/default-image.png'}
                        alt={isArabic ? category?.name_arabic || 'Category image' : category?.name || 'Category image'}
                        title={isArabic ? category?.name_arabic || 'Category' : category?.name || 'Category'}
                        width={22}
                        height={22}
                        className="h-6 w-6 md:h-full lg:w-8"
                        sizes='(max-width: 640px) 24px, 100vw'
                    />
                </div>
                <p className="mt-3 font-semibold text-primary line-clamp-1 text-[0.65rem]">
                    {isArabic ? category?.name_arabic || 'Category' : category?.name || 'Category'}
                </p>
            </Link>
        ))
    );
    const sliderHeading: any = isArabic ? props?.sec7_brand_title_ar : props?.sec7_brand_title
    console.log("langlang",lang)
    return (
        <div className={``}>
            <div className="align__center mb-2">
                <h2 className="headingHomeMobile">{sliderHeading}</h2>
                <Link href={`${origin}/${isArabic ? "ar" : "en"}/${showAllLink}`} className="text-sm underline text-primary font-semibold">{isArabic ? props?.sec7_show_all_title_ar : props?.sec7_show_all_title}</Link>
            </div>
            <div className="relative mt-2">
                <div className="flex items-center overflow-x-scroll scrollbar-hide gap-3 pb-1" ref={Brandref}>
                    {props?.brands.map((brand: any, index: any) => (
                        <div key={index} className="bg-white h-auto p-2 rounded-lg shadow-md mb-1.5 text-sm flex-initial basis-48 shrink-0">
                            <Link
                                href={`${origin}/${isArabic ? "ar" : "en"}/brand/${brand?.slug}`}
                                aria-label={isArabic ? brand?.name_arabic : brand?.name}
                                className="h-[68px] relative"
                            >
                                <Image
                                    src={
                                        brand?.brand_media_image?.image
                                            ? `${NewMedia}${brand?.brand_media_image.image}`
                                            : '/default-image.png'
                                    }
                                    alt={isArabic ? brand?.name_arabic || 'Brand image' : brand?.name || 'Brand image'}
                                    title={isArabic ? brand?.name_arabic || 'Brand' : brand?.name || 'Brand'}
                                    width={80}
                                    height={50}
                                    className="mx-auto w-1/2"
                                    sizes='100vw'
                                />
                            </Link>
                            {brand?.categories && brand?.categories.length > 0 && (
                                <div className="grid grid-cols-2 mt-2 md:mt-8 gap-y-3">
                                    {renderCategories(brand?.categories, isArabic ? brand?.name_arabic : brand?.name)}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default React.memo(BrandSliderMobile);