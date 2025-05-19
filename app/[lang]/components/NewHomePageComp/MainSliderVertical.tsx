'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { NewMedia2 } from '../../api/Api';


interface MainSliderVerticalProps {
  data: any;
  lang: any;
  origin: any;
}

const MainSliderVertical: React.FC<MainSliderVerticalProps> = ({
  data,
  lang = 'ar',
  origin
}) => {
  // const sortedData: any = data?.map((item: any) => ({...item,sorting: item?.sorting ?? 0, })).sort((a: any, b: any) => a.sorting - b.sorting);

  return (
    <div className="left_banner_slider rounded-2xl lg:basis-[30%] basis-[100%] overflow-hidden">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{
          delay: 15000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        loop={true}
        modules={[Autoplay, Navigation, Pagination]}
        className="mySwiper mx-auto h-auto w-full"
      >
        {data?.map((item: any) => {
          const sliderLink: any = item?.redirection_link ? origin + '/' + lang + '/' + item?.redirection_link : '';
          return(
          <SwiperSlide key={item?.id}>
            <Link
              prefetch={false}
              scroll={false}
              href={sliderLink}
              aria-label={`Go to ${sliderLink}`}
            >
              <div className="relative w-full rounded-2xl">
                <Image
                  // src={item?.image}
                  src={item?.image ? NewMedia2 + item?.image : ''}
                  alt={`${item?.title ? item?.title : ''}-${item?.id ? item?.id : ''}`}
                  title={item?.title ? item?.title : ''}
                  width={0}
                  height={0}
                  quality={100}
                  loading="eager"
                  className="object-cover object-center shadow-lg rounded-2xl h-auto"
                  sizes='100vw'
                  priority={true}
                  style={{
                    width: "100%",
                    // height: "440px",
                    height: "100%",
                  }}
                />
              </div>
            </Link>
          </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default MainSliderVertical;
