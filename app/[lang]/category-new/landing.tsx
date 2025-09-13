"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { useHomepage } from "../context/HomepageContext";

// Dynamic Imports
const TamkeenServices = dynamic(() => import("../components/TamkeenServices"), { ssr: true });
const ProductLoopComponent = dynamic(() => import("../components/SectionComponents/ProductLoop"), { ssr: true });
const BrandCategories = dynamic(() => import("../components/SectionComponents/BrandCategories"), { ssr: true });
const GridImagesOne = dynamic(() => import("../components/SectionComponents/GridImagesOne"), { ssr: true });
const GridImagesTwo = dynamic(() => import("../components/SectionComponents/GridImagesTwo"), { ssr: true });
const GridImagesThree = dynamic(() => import("../components/SectionComponents/GridImagesThree"), { ssr: true });
const GridImagesFour = dynamic(() => import("../components/SectionComponents/GridImagesFour"), { ssr: true });
const GridImagesFive = dynamic(() => import("../components/SectionComponents/GridImagesFive"), { ssr: true });
const GridImagesSix = dynamic(() => import("../components/SectionComponents/GridImagesSix"), { ssr: true });
const ProductLoopTimerComponent = dynamic(() => import("../components/SectionComponents/ProductLoopWithTimer"), { ssr: true });
const GridImagesFourWithHeading = dynamic(() => import("../components/SectionComponents/GridImagesFourWithHeading"), { ssr: true });
const ProductLoopFilterComponent = dynamic(() => import("../components/SectionComponents/ProductLoopWithFilters"), { ssr: true });
const Testimonial = dynamic(() => import("../components/SectionComponents/Testimonial"), { ssr: true });
const Newsletter = dynamic(() => import("../components/NewHomePageComp/Newsletter"), { ssr: true });
const Popup = dynamic(() => import("../components/NewHomePageComp/Popup"), { ssr: true });
const SliderWithCategories = dynamic(() => import("../components/SectionComponents/SliderWithCategories"), { ssr: true });

export default function NewCategory({
  params,
  searchParams,
}: {
  params: { lang: string; slug: string; data: any; devicetype: any };
  searchParams: any;
}) {
  const isMobileOrTablet = params?.devicetype === "mobile" || params?.devicetype === "tablet";
  const containerClass = isMobileOrTablet ? "container" : "px-20";
  const isArabic = params.lang === "ar";
  const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";
  
  // Extract landing page elements from API data
  const landingPageElements = params?.data?.landing_page?.elements || [];
  
  // Sort elements by 'sort' field to maintain order
  const sortedElements = [...landingPageElements].sort((a: any, b: any) => a.sort - b.sort);

  // Fallback for homepage products if needed
  const homepageProps = useHomepage();
  const homepageparttwolatest = homepageProps?.homepageparttwolatest;
  const sec9Products = homepageparttwolatest?.six_eleven_sec?.section_nine || [];

  // Function to get heading based on language
  const getHeading = (element: any) => isArabic ? element?.headingAr || element?.heading || "" : element?.headingEn || element?.heading || "";

  return (
    <>
      {sortedElements.map((element: any, index: number) => {
        switch (element.type) {
          case "category":
            return (
              <section key={index} className="relative mb-8">
                <SliderWithCategories
                    lang={params.lang}
                    categories={element.data} // Pass category data
                    bannerImage={element.banner_image} // Pass banner image
                    devicetype={params.devicetype}
                />
              </section>
            );

          case "brand":
            return (
              <section key={index} className="relative mb-8">
                <div className={containerClass}>
                  <BrandCategories
                    origin={origin}
                    isMobileOrTablet={isMobileOrTablet}
                    isArabic={isArabic}
                    lang={params.lang}
                    brands={element.data} // Pass brand data
                  />
                </div>
              </section>
            );

          case "product":
            return (
              <section key={index} className="relative mb-8">
                <ProductLoopComponent
                  sliderHeading={getHeading(element)}
                  buttonTitle={isArabic ? "عرض الكل" : "View All"}
                  buttonLink={element.data.redirection_link || ""}
                  productDataSlider={element.data || sec9Products}
                  isArabic={isArabic}
                  isMobileOrTablet={isMobileOrTablet}
                  origin={origin}
                />
              </section>
            );

          case "imageswithheading":
            return (
              <section key={index} className="relative mb-8">
                <div className={containerClass}>
                  <GridImagesFourWithHeading
                    isMobileOrTablet={isMobileOrTablet}
                    isArabic={isArabic}
                    bgSecColor={element.data.backgroundColorCode || "#8DD2EF"}
                    sectionHeading={getHeading(element.data)}
                    images={element.data.images} // Pass image data
                    links={element.data.links} // Pass link data
                  />
                </div>
              </section>
            );

          case "productwithfilters":
            return (
              <section key={index} className="relative mb-8">
                <ProductLoopFilterComponent
                  sliderHeading={getHeading(element)}
                  buttonTitle={isArabic ? "عرض الكل" : "View All"}
                  buttonLink={element.data.redirection_link || ""}
                  productDataSlider={element.data || sec9Products}
                  isArabic={isArabic}
                  isMobileOrTablet={isMobileOrTablet}
                  origin={origin}
                  filters={element.data.tags} // Pass filter tags
                />
              </section>
            );

          case "productflashtimer":
            return (
              <section key={index} className="relative mb-8">
                <ProductLoopTimerComponent
                  sliderHeading={getHeading(element)}
                  buttonTitle={isArabic ? "عرض الكل" : "View All"}
                  buttonLink={element.redirection_link || ""}
                  productDataSlider={element.data || sec9Products}
                  isArabic={isArabic}
                  isMobileOrTablet={isMobileOrTablet}
                  origin={origin}
                  timerHeading={element.timer_heading || ""}
                  day={element.day || ""}
                  date={element.date || ""}
                />
              </section>
            );

          case "oneimage":
            return (
              <section className="relative mb-8">
                <div className={containerClass}>
                  <GridImagesOne
                    isMobileOrTablet={isMobileOrTablet}
                    isArabic={isArabic}
                    images={element.data.images} // Pass image data
                    links={element.data.links} // Pass link data
                  />
                </div>
              </section>
            );

          case "twoimages":
            return (
              <section className="relative mb-8">
                <div className={`${containerClass} grid md:grid-cols-2 grid-cols-1 gap-4`}>
                  <GridImagesTwo
                    isMobileOrTablet={isMobileOrTablet}
                    isArabic={isArabic}
                    images={element.data.images} // Pass image data
                    links={element.data.links} // Pass link data
                  />
                </div>
              </section>
            );

          case "threeimages":
            return (
              <section className="relative mb-8">
                <div className={containerClass}>
                  <GridImagesThree
                    isMobileOrTablet={isMobileOrTablet}
                    isArabic={isArabic}
                    images={element.data.images} // Pass image data
                    links={element.data.links} // Pass link data
                  />
                </div>
              </section>
            );

          case "fourimages":
            return (
              <section className="relative mb-8">
                <div className={containerClass}>
                    <div className="banner_slider_bottom grid md:grid-cols-4 grid-cols-2 gap-4">
                        <GridImagesFour
                            isMobileOrTablet={isMobileOrTablet}
                            isArabic={isArabic}
                            images={element.data.images} // Pass image data
                            links={element.data.links} // Pass link data
                        />
                    </div>
                </div>
              </section>
            );

            case "fiveimages":
              return (
                <section className="relative mb-8">
                  <div className={containerClass}>
                    <div className="banner_slider_bottom">
                      <GridImagesFive
                        isMobileOrTablet={isMobileOrTablet}
                        isArabic={isArabic}
                        images={element.data.images} // Pass image data
                        links={element.data.links} // Pass link data
                      />
                    </div>
                  </div>
                </section>
              );

            case "siximages":
              return (
                <section className="relative mb-8">
                  <div className={containerClass}>
                    <div className="banner_slider_bottom grid md:grid-cols-6 grid-cols-2 gap-4">
                      <GridImagesSix
                        isMobileOrTablet={isMobileOrTablet}
                        isArabic={isArabic}
                        images={element.data.images} // Pass image data
                        links={element.data.links} // Pass link data
                      />
                    </div>
                  </div>
                </section>
              );

            default:
                return null;
        }
      })}

      <section className="relative mb-8">
        <Testimonial
          isArabic={isArabic}
          isMobileOrTablet={isMobileOrTablet}
          origin={origin}
        />
      </section>

      <section className={`${containerClass} bg-[#F3F9FC] border-t border-b border-primary py-3 relative`}>
        <div data-section="18">
          <TamkeenServices isArabic={isArabic} userAgent={""} />
        </div>
      </section>

      <Newsletter isMobileOrTablet={isMobileOrTablet} isArabic={isArabic} />
      <Popup isMobileOrTablet={isMobileOrTablet} lang={isArabic} />
    </>
  );
}