import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

interface CategoriesSliderProps {
    params: any;
    lang: any;
    userAgent: any;
    origin: string;
    NewMedia: string;
}

const CategoriesSlider: React.FC<CategoriesSliderProps> = ({ params, userAgent, origin, NewMedia, lang }) => {
    const categories = params?.sec_three_categories || [];
    const isArabic = lang == 'ar';
    const renderCategoryName = (category: any) => (category.name ? category.name : '');
    const renderHeading = () => (params?.sec_three_title ? params?.sec_three_title : '');
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const isMobileOrTablet = userAgent;

    const showAllLink = userAgent?.isMobileOrTablet
        ? `${origin}/${isArabic ? "ar" : "en"}/categorieslisting`
        : `${origin}/${isArabic ? "ar" : "en"}/categorieslisting`;
    const buttonText = isArabic ? 'عرض الكــل' : 'Show All';
    return (
        <div className={`relative`}>
            <div className="align__center mb-2">
                <h2 className="headingHomeMain">{renderHeading()}</h2>
                <Link prefetch={false} scroll={false} href={`${showAllLink}`} className="text-primary text-xl font-medium underline">
                    {buttonText}
                </Link>
            </div>

            {/* Swiper Section */}
            <div className="">
                <Swiper
                    slidesPerView={8}
                    breakpoints={{
                        350: { slidesPerView: 4.5, spaceBetween: 2 },
                        768: { slidesPerView: 7.2, spaceBetween: 4 },
                        1280: { slidesPerView: 11, spaceBetween: 4 },
                        1440: { slidesPerView: 11, spaceBetween: 4 },
                        1920: { slidesPerView: 12, spaceBetween: 2 },
                    }}
                    spaceBetween={2}
                    pagination={{ clickable: false }}
                    loop={true}
                    modules={[Navigation]}
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
                    className="mySwiper"
                >
                    {categories.length > 0 ? (
                        categories.map((category: any, id: number) => (
                            <SwiperSlide className="p-1" key={id}>
                                <Link prefetch={false} scroll={false} href={`${origin}/${lang}/category/${category.slug}`} className="rounded-2xl">
                                    <Image
                                        src={category?.image ? `${NewMedia}${category?.image?.image}` : '/fallback-image.jpg'}
                                        alt={`${renderCategoryName(category)}-${id + 11}`}
                                        title={renderCategoryName(category)}
                                        width={114}
                                        height={114}
                                        quality={100}
                                        priority={true}
                                        className="mx-auto h-auto w-full max-w-[114px] rounded-2xl bg-white border shadow-md border-[#ff7b345e]"
                                        sizes="(max-width: 640px) 80px, (max-width: 768px) 100px, (max-width: 1024px) 114px, 100vw"
                                    />
                                    <h2 className="font-bold mt-2 text-[0.65rem] xl:text-xs line-clamp-1 md:line-clamp-2 leading-4 text-xs text-center">
                                        {renderCategoryName(category)}
                                    </h2>
                                </Link>
                            </SwiperSlide>
                        ))
                    ) : (
                        // Placeholder Slides
                        Array.from({ length: 16 }).map((_, index) => (
                            <SwiperSlide className="p-0.5" key={index}>
                                <div className="bg-white py-2 px-1 rounded-2xl shadow-md text-center text-primary animate-pulse">
                                    <div className="rounded-2xl bg-dark/10 p-2.5 h-[8.5rem] lg:h-[13.5rem] w-full"></div>
                                </div>
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>

                <button ref={prevRef} className={`absolute top-1/2 translate-middle-y z-10 cursor-pointer fill-white p-2.5 left-1 md:p-3 md:-left-12 bg-primary rounded-full`}>
                    <svg
                        height={isMobileOrTablet ? "18" : "22"}
                        viewBox="0 0 24 24"
                        width={isMobileOrTablet ? "18" : "22"}
                        xmlns="http://www.w3.org/2000/svg"
                        id="fi_10486749"
                        className="fill-current transform transition duration-150 ease-in-out rotate-90"
                    >
                        <path
                            clipRule="evenodd"
                            d="m2.58579 7.58579c.78104-.78105 2.04738-.78105 2.82842 0l6.58579 6.58581 6.5858-6.58581c.781-.78105 2.0474-.78105 2.8284 0 .7811.78104.7811 2.04738 0 2.82841l-8 8c-.781.7811-2.0474.7811-2.8284 0l-8.00001-8c-.78105-.78103-.78105-2.04737 0-2.82841z"
                            fillRule="evenodd"
                        ></path>
                    </svg>
                </button>
                <button ref={nextRef} className={`absolute top-1/2 translate-middle-y z-10 cursor-pointer fill-white p-2.5 right-1 md:p-3 md:-right-12 bg-primary rounded-full`}>
                    <svg
                        height={isMobileOrTablet ? "18" : "22"}
                        viewBox="0 0 24 24"
                        width={isMobileOrTablet ? "18" : "22"}
                        xmlns="http://www.w3.org/2000/svg"
                        id="fi_10486750"
                        className="fill-current transform transition duration-150 ease-in-out -rotate-90"
                    >
                        <path
                            clipRule="evenodd"
                            d="m2.58579 7.58579c.78104-.78105 2.04738-.78105 2.82842 0l6.58579 6.58581 6.5858-6.58581c.781-.78105 2.0474-.78105 2.8284 0 .7811.78104.7811 2.04738 0 2.82841l-8 8c-.781.7811-2.0474.7811-2.8284 0l-8.00001-8c-.78105-.78103-.78105-2.04737 0-2.82841z"
                            fillRule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CategoriesSlider;
