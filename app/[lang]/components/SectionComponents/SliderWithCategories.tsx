"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { NewMedia } from "../../api/Api"; // Import NewMedia for constructing category image URLs

interface Category {
  id: number;
  name_arabic: string;
  slug: string;
  image_link_app?: string;
  name?: string;
}

interface SliderWithCategoriesProps {
  lang: string;
  devicetype?: string;
  categories?: Category[];
  bannerImage?: string;
}

export default function SliderWithCategories({
  lang,
  devicetype,
  categories = [],
  bannerImage,
}: SliderWithCategoriesProps) {
  const router = useRouter();
  const isMobileOrTablet = devicetype === "mobile" || devicetype === "tablet";
  const containerClass = isMobileOrTablet ? "container" : "px-48";
  const isArabic = lang === "ar";
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  // Fallback banner image
  const defaultBannerImage = "/images/categoryNew/categoryBanner.png";

  // Validate and construct image URL
  const getImageSrc = (image?: string, isCategoryImage: boolean = false) => {
    if (!image) return defaultBannerImage;
    // Use image directly if it's a valid URL (starts with http:// or https://)
    if (/^https?:\/\//.test(image)) return image;
    // For category images, prepend NewMedia if it's a relative path
    if (isCategoryImage) {
      return image.startsWith("/") ? image : `${NewMedia}${image}`;
    }
    // For banner image, use default if not a valid URL or path
    return image.startsWith("/") ? image : defaultBannerImage;
  };

  return (
    <section
      className={`bg-cover bg-center bg-no-repeat w-full h-full flex items-end justify-center mb-8 overflow-hidden relative`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <Image
        src={getImageSrc(bannerImage)}
        alt={isArabic ? "بانر الفئة" : "Category Banner"}
        width={0}
        height={0}
        loading="lazy"
        className="w-full h-full object-contain"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
      />
      <div className="w-full shadow-lg absolute bottom-0 left-1/2 -translate-x-1/2 xl:px-56">
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          loop={categories.length > 2}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 20 },
            768: { slidesPerView: 4, spaceBetween: 30 },
            1024: { slidesPerView: 6, spaceBetween: 40 },
          }}
          modules={[Navigation, Pagination]}
          onBeforeInit={(swiper) => {
            if (swiper.params.navigation) {
              const nav = swiper.params.navigation as any;
              nav.prevEl = prevRef.current;
              nav.nextEl = nextRef.current;
            }
          }}
          className="mySwiper !bg-white xl:!py-8 !py-4 xl:!rounded-t-xl"
        >
          {categories.length > 0 ? (
            categories.map((item, index) => (
              <SwiperSlide key={item.slug || index} className="relative group">
                <div
                  className="flex flex-col items-center w-full cursor-pointer"
                  onClick={() => router.push(`/${lang}/category/${item.slug}`)}
                >
                  <div className="relative mx-auto">
                    <Image
                      src={getImageSrc(item.image_link_app, true)}
                      alt={isArabic ? item.name_arabic : item.name || item.name_arabic}
                      title={isArabic ? item.name_arabic : item.name || item.name_arabic}
                      width={0}
                      height={0}
                      loading="lazy"
                      className="object-cover rounded-2xl transition-transform duration-300 hover:scale-105 h-20 w-20"
                      style={{
                        filter: "drop-shadow(0 5px 20px rgba(0, 0, 0, 0.15))",
                      }}
                      sizes="(max-width: 640px) 100px, (max-width: 768px) 100px, (max-width: 1024px) 100px, 100px"
                    />
                  </div>
                  <h2 className="font-bold mt-2 text-[0.65rem] xl:text-xs line-clamp-1 leading-4 text-center">
                    {isArabic ? item.name_arabic : item.name || item.name_arabic}
                  </h2>
                </div>

                {/* Divider (only show if NOT last slide) */}
                {index < categories.length - 1 && (
                  <span className="absolute top-1/2 right-0 transform -translate-y-1/2 w-px h-[80%] bg-gray opacity-30"></span>
                )}
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="flex flex-col items-center w-full">
                <h2 className="font-bold mt-2 text-[0.65rem] xl:text-xs line-clamp-1 leading-4 text-center">
                  {isArabic ? "لا توجد فئات متاحة" : "No categories available"}
                </h2>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </section>
  );
}