"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NewMedia } from "../../api/Api";

interface GridImagesFourWithHeadingProps {
  isMobileOrTablet: boolean;
  isArabic: boolean;
  bgSecColor: string;
  sectionHeading: string;
  images: string[];
  links: string[];
}

export default function GridImagesFourWithHeading({
  isMobileOrTablet,
  isArabic,
  bgSecColor = "#f0f0f0",
  sectionHeading = isArabic ? "عنوان القسم" : "Section Heading",
  images = [],
  links = [],
}: GridImagesFourWithHeadingProps) {
  const router = useRouter();
  const containerClass = isMobileOrTablet ? "container" : "px-20";

  // Fallback image
  const defaultImage = "/images/categoryNew/card-4.png";

  // Construct image URL
  const getImageSrc = (image?: string) => {
    if (!image) return defaultImage;
    if (/^https?:\/\//.test(image)) return image; // Use full URL if provided
    return `${NewMedia}${image}`; // Prepend NewMedia for relative paths
  };

  return (
    <section className={`relative mb-8`} style={{ backgroundColor: bgSecColor }}>
      <div className={`${containerClass} pt-10`} dir={isArabic ? "rtl" : "ltr"}>
        <h2 className="headingHomeMain !text-2xl mb-6">
          {sectionHeading}
        </h2>

        <Swiper
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 28 },
          }}
          loop={images.length > 1} // Enable loop only if enough images
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="lowerPrice_cards !pb-10"
        >
          {images.length > 0 ? (
            images.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className="lowerPrice_card !rounded-2xl overflow-hidden cursor-pointer"
                  onClick={() => {
                    const link = links[index];
                    if (link && /^https?:\/\//.test(link)) {
                      window.location.href = link; // External link
                    } else if (link) {
                      router.push(`/${link}`); // Internal link
                    }
                  }}
                >
                  <Image
                    src={getImageSrc(image)}
                    alt={isArabic ? `صورة ${index + 1}` : `Image ${index + 1}`}
                    title={isArabic ? `صورة ${index + 1}` : `Image ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    quality={100}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="flex flex-col items-center w-full">
                <p className="text-sm font-medium text-center">
                  {isArabic ? "لا توجد صور متاحة" : "No images available"}
                </p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </section>
  );
}