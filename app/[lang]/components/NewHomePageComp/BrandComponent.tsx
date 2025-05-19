"use client";

import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";

export default function BrandComponent(props: any) {
  const router = useRouter();
  const path = usePathname();
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const lang: any = props?.lang; // Default to 'en' if lang is undefined
  const isArabic = props.lang === "ar" ? true : false;

  const isMobileOrTablet =
    props?.devicetype === "mobile" || props?.devicetype === "tablet"
      ? true
      : false;
  const containerClass = isMobileOrTablet ? "container" : "px-[4.8rem]";
  return (
    <>
      <div
        className="shopByBrands_brands_card bg-white p-2 rounded-lg w-fit flex flex-col gap-2 shadow-md">
        <div className="shopByBrands_brands_card_top flex items-start gap-1 w-fit">
          <div className="brand_logo w-fit px-1">
            <Image
              src={props?.brandLogo}
              alt="GS Blue Logo"
              title="GS Blue Logo"
              width={180}
              height={45}
              style={{ maxWidth: "180px", height: "65px" }}
              className="object-contain"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
            />
          </div>
          {[...Array(props?.topIconLength)].map((_, i) => (
            <div
              key={`brandIcon_${i}`}
              className="brand_item flex items-center flex-col gap-2 text-center p-1 md:p-2 bg-white hover:bg-[#219EBC40] hover:fill-primary rounded-md mx-auto transition-all duration-300 ease-in-out cursor-pointer w-[93px] h-[64px] overflow-hidden"
            >
              <Image
                src="https://images.tamkeenstores.com.sa/assets/new-media/air-conditioner%20(convert.io).webp"
                alt="Air Conditioners"
                title="Air Conditioners"
                width={32}
                height={32}
                className="w-6 h-6"
                loading="lazy"
              />
              <span className="text-xs font-semibold text-primary line-clamp-1 max-md:text-[0.65rem]">
                Air Conditioners
              </span>
            </div>
          ))}
        </div>
        <div className="shopByBrands_brands_card_bottom flex items-start gap-1 w-fit">
          {[...Array(props?.BottomIconLength)].map((_, i) => (
            <div
              key={`brandIcon_${i}`}
              className="brand_item flex items-center flex-col gap-2 text-center p-1 md:p-2 bg-white hover:bg-[#219EBC40] hover:fill-primary rounded-md mx-auto transition-all duration-300 ease-in-out cursor-pointer w-[93px] h-[64px] overflow-hidden"
            >
              <Image
                src="https://images.tamkeenstores.com.sa/assets/new-media/air-conditioner%20(convert.io).webp"
                alt="Air Conditioners"
                title="Air Conditioners"
                width={32}
                height={32}
                className="w-6 h-6"
                loading="lazy"
              />
              <span className="text-xs font-semibold text-primary line-clamp-1 max-md:text-[0.65rem]">
                Air Conditioners
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
