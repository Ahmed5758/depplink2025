import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

interface CategoriesSliderProps {
    params: any;
    userAgent: any;
    origin: string;
    NewMedia: string;
}

const CategoriesSlider: React.FC<CategoriesSliderProps> = ({ params, userAgent, origin, NewMedia }) => {
    if (params?.homepagepartone?.data?.homesecone?.first_sec_fields?.categories_top_status !== 1) {
        return null;
    }

    const categories = params?.homepagepartone?.data?.homesecone?.first_sec_categories || [];
    const lang = params.lang;

    const renderCategoryName = (category: any) => (lang === 'ar' ? category.name_arabic : category.name);
    const renderHeading = () =>
        lang === 'ar'
            ? params?.homepagepartone?.data?.homesecone?.first_sec_fields?.cat_heading_arabic
            : params?.homepagepartone?.data?.homesecone?.first_sec_fields?.cat_heading;

    const showAllLink = userAgent?.isMobile || userAgent?.isTablet
        ? `${origin}/${lang}/categorieslisting`
        : `${origin}/${lang}/${params?.homepagepartone?.data?.homesecone?.first_sec_fields?.cat_view_all}`;

    return (
        <div className={`${userAgent?.isMobile || userAgent?.isTablet ? 'container' : 'px-[4.8rem]'} my-5`}>
            {/* Section Heading */}
            <div className="align__center font-bold mb-2">
                <h2 className="text-sm xl:text-base">{renderHeading()}</h2>
                <Link href={showAllLink} className="text-[#219EBC] hover:underline text-sm">
                    {lang === 'ar' ? 'عـرض الكــل' : 'Show All'}
                </Link>
            </div>

            {/* Swiper Section */}
            <div className="relative">
                <Swiper
                    slidesPerView={8}
                    breakpoints={{
                        350: { slidesPerView: 4.5, spaceBetween: 2 },
                        768: { slidesPerView: 7.2, spaceBetween: 2 },
                        1280: { slidesPerView: 12, spaceBetween: 2 },
                        1440: { slidesPerView: 14, spaceBetween: 2 },
                        1650: { slidesPerView: 16, spaceBetween: 2 },
                        // 1920: { slidesPerView: 12, spaceBetween: 2 },
                    }}
                    spaceBetween={2}
                    pagination={{ clickable: true }}
                    modules={[Navigation]}
                    navigation={{
                        nextEl: ".arrow-left-categories",
                        prevEl: ".arrow-right-categories",
                    }}
                    className="mySwiper"
                >
                    {categories.length > 0 ? (
                        categories.map((category: any, id: number) => (
                            <SwiperSlide className="p-1" key={id}>
                                <Link href={`${origin}/${lang}/category/${category.slug}`} className="rounded-md">
                                    <Image
                                        src={category?.web_media_image ? NewMedia + category.web_media_image.image : ''}
                                        alt={`${renderCategoryName(category)}-${id + 11}`}
                                        title={renderCategoryName(category)}
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        priority={true}
                                        className="mx-auto h-auto w-full rounded-md"
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
                                <div className="bg-white py-2 px-1 rounded-lg shadow-md text-center text-primary animate-pulse">
                                    <div className="rounded-md bg-dark/10 p-2.5 h-[8.5rem] lg:h-[13.5rem] w-full"></div>
                                </div>
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>

                {/* Navigation Buttons */}
                <button
                    aria-label={lang === 'ar' ? 'السابق' : 'Previous'}
                    className="proPrevButtonSlider cursor-pointer focus-visible:outline-none fill-white arrow-left-categories"
                >
                    <svg
                        height="20"
                        viewBox="0 0 24 24"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-current transform transition duration-150 ease-in-out -rotate-90"
                    >
                        <path
                            clipRule="evenodd"
                            d="m2.58579 7.58579c.78104-.78105 2.04738-.78105 2.82842 0l6.58579 6.58581 6.5858-6.58581c.781-.78105 2.0474-.78105 2.8284 0 .7811.78104.7811 2.04738 0 2.82841l-8 8c-.781.7811-2.0474.7811-2.8284 0l-8.00001-8c-.78105-.78103-.78105-2.04737 0-2.82841z"
                            fillRule="evenodd"
                        />
                    </svg>
                </button>
                <button
                    aria-label={lang === 'ar' ? 'التالي' : 'Next'}
                    className="proNextButtonSlider cursor-pointer focus-visible:outline-none fill-white arrow-right-categories"
                >
                    <svg
                        height="20"
                        viewBox="0 0 24 24"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-current transform transition duration-150 ease-in-out rotate-90"
                    >
                        <path
                            clipRule="evenodd"
                            d="m2.58579 7.58579c.78104-.78105 2.04738-.78105 2.82842 0l6.58579 6.58581 6.5858-6.58581c.781-.78105 2.0474-.78105 2.8284 0 .7811.78104.7811 2.04738 0 2.82841l-8 8c-.781.7811-2.0474.7811-2.8284 0l-8.00001-8c-.78105-.78103-.78105-2.04737 0-2.82841z"
                            fillRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CategoriesSlider;
