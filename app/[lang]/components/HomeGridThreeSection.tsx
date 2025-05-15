import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import CountDown from "./CountDown";
import HomePageProductThumbnail from "./HomePageProductThumbnail";
import Link from "next/link";
import { NewMedia } from "../api/Api";

const HomePageSection = ({ params, userAgent, origin }: any) => {
    const isMobileOrTablet = userAgent?.isMobile || userAgent?.isTablet;

    const homepageData = params?.homepagepartone?.data || {};
    const {
        homesecaftercat = {},
        afterSecCat,
        afterSecCatSlider1 = [],
        afterSecCatSlider2 = [],
        afterSecCatSlider3 = [],
        afterSecCatSlider4 = [],
    } = homepageData;
    const { afterCatSec } = homesecaftercat; // Extract afterCatSec safely
    // Helper function for rendering banners
    const renderBanner = ({
        heading,
        sliders,
        height,
        isTwoColumn = true, // Default to two-column grid
        indexPrefix,
    }: {
        heading: string;
        sliders: any[];
        height: string;
        isTwoColumn?: boolean;
        indexPrefix: string;
    }) => (
        <div className="bg-white shadow-md rounded-md p-2">
            <h2 className="heading__sm">{heading}</h2>
            <div className={`grid ${isTwoColumn ? "grid-cols-2" : "grid-cols-1"} gap-3 mt-3`}>
                {sliders.map((slider: any[], index: number) => (
                    <div key={index} className="relative">
                        <Swiper
                            autoplay={{
                                delay: 15000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            pagination={true}
                            loop={true}
                            modules={[Autoplay, Navigation, Pagination]}
                            navigation={{
                                nextEl: `.arrow-left-${indexPrefix}-${index}`,
                                prevEl: `.arrow-right-${indexPrefix}-${index}`,
                            }}
                            className="mySwiper"
                        >
                            {slider?.map((slide: any, i: number) => (
                                <SwiperSlide key={i}>
                                    <Link href={`${origin}/${params?.lang}/${slide?.custom_link || ""}`} aria-label={`${origin}/${params?.lang}/${slide?.custom_link || ""}`}>
                                        <div
                                            style={{
                                                backgroundImage: `url(${NewMedia + slide?.featured_image_web?.image || ""})`,
                                            }}
                                            className={`bg-cover bg-no-repeat bg-center w-auto ${isTwoColumn ? "h-[28rem]" : "h-[13.7rem]"} rounded-md`}
                                        ></div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <button
                            aria-label="Next"
                            className={`prevButtonSlider cursor-pointer focus-visible:outline-none fill-white arrow-left-${indexPrefix}-${index}`}
                        >
                            <svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" id="fi_10486749" className="fill-current transform transition duration-150 ease-in-out rotate-90"><path clipRule="evenodd" d="m2.58579 7.58579c.78104-.78105 2.04738-.78105 2.82842 0l6.58579 6.58581 6.5858-6.58581c.781-.78105 2.0474-.78105 2.8284 0 .7811.78104.7811 2.04738 0 2.82841l-8 8c-.781.7811-2.0474.7811-2.8284 0l-8.00001-8c-.78105-.78103-.78105-2.04737 0-2.82841z" fillRule="evenodd"></path></svg>
                        </button>
                        <button
                            aria-label="Previous"
                            className={`nextButtonSlider cursor-pointer focus-visible:outline-none fill-white arrow-right-${indexPrefix}-${index}`}
                        >
                            <svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" id="fi_10486749" className="fill-current transform transition duration-150 ease-in-out -rotate-90"><path clipRule="evenodd" d="m2.58579 7.58579c.78104-.78105 2.04738-.78105 2.82842 0l6.58579 6.58581 6.5858-6.58581c.781-.78105 2.0474-.78105 2.8284 0 .7811.78104.7811 2.04738 0 2.82841l-8 8c-.781.7811-2.0474.7811-2.8284 0l-8.00001-8c-.78105-.78103-.78105-2.04737 0-2.82841z" fillRule="evenodd"></path></svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        (afterCatSec?.products_twelveth_status === 1 ||
            afterSecCat?.banner_first_status === 1 ||
            afterSecCat?.banner_second_status === 1) && (
            <div className={`grid md:grid-cols-3 gap-2 my-5 ${isMobileOrTablet ? "container" : "px-[4.8rem]"}`}>
                {/* Product Section */}
                {afterCatSec?.products_twelveth_status === 1 && (
                    <div className="bg-white shadow-md rounded-md px-2 pt-2">
                        <div className="align__center mb-5 relative">
                            <h2 className="heading__sm">
                                {params?.lang === "ar" ? afterCatSec?.pro_twelveth_heading_arabic : afterCatSec?.pro_twelveth_heading}
                            </h2>
                            {afterCatSec?.products_twelveth_date && (
                                <CountDown timer={afterCatSec?.products_twelveth_date} lang={params?.lang} />
                            )}
                        </div>
                        <HomePageProductThumbnail
                            titleSlider={
                                params?.lang === "ar"
                                    ? afterCatSec?.pro_twelveth_heading_arabic
                                    : afterCatSec?.pro_twelveth_heading
                            }
                            hrefLink={`${origin}/${params?.lang}/${afterCatSec?.pro_twelveth_view_all || ""}`}
                            lang={params?.lang}
                            dict={params?.dict?.products}
                            products={homepageData?.homesecaftercat?.productAfterSectData?.products?.data || []}
                            devicetype={isMobileOrTablet ? "mobile" : "desktop"}
                        />
                    </div>
                )}

                {/* Horizontal Banner Section */}
                {!isMobileOrTablet &&
                    afterSecCat?.banner_first_status === 1 &&
                    renderBanner({
                        heading: params?.lang === "ar" ? afterSecCat?.banner_first_heading_arabic : afterSecCat?.banner_first_heading,
                        sliders: [afterSecCatSlider1, afterSecCatSlider2],
                        height: "448px",
                        isTwoColumn: true,
                        indexPrefix: "horizontal",
                    })}

                {/* Vertical Banner Section */}
                {!isMobileOrTablet &&
                    afterSecCat?.banner_second_status === 1 &&
                    renderBanner({
                        heading: params?.lang === "ar" ? afterSecCat?.banner_second_heading_arabic : afterSecCat?.banner_second_heading,
                        sliders: [afterSecCatSlider3, afterSecCatSlider4],
                        height: "218px",
                        isTwoColumn: false,
                        indexPrefix: "vertical",
                    })}
            </div>
        )
    );
};

export default HomePageSection;
