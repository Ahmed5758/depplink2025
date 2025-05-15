"use client"; // This is a client component 👈🏽

import React, { useEffect, useState, Fragment, useRef, Suspense } from 'react';
import 'swiper/css'
import 'swiper/css/grid'
import Link from 'next/link'
import 'swiper/css/navigation'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { NewMedia, NewMedia2 } from './api/Api'
import { get, post } from "./api/ApiCalls"
import { useUserAgent } from 'next-useragent'
import DeviceDetector from "device-detector-js"
import { EmblaOptionsType } from 'embla-carousel'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Dialog, Transition, Popover } from '@headlessui/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


// Homepage Components
const CategoriesHomeMobile = dynamic(() => import('./components/HomePageComponents/CategoriesHomeMobile'), { ssr: true })
const HomeStyleVideoSectionMobile = dynamic(() => import('./components/HomePageComponents/HomeStyleVideoSectionMobile'), { ssr: true })
const ThreeImageHalfPara = dynamic(() => import('./components/HomePageComponents/ThreeImageHalfPara'), { ssr: true })
const Products = dynamic(() => import('./components/Products'), { ssr: true })
const TamkeenServices = dynamic(() => import('./components/TamkeenServices'), { ssr: true })
const CategoryHomeSection = dynamic(() => import('./components/CategoryHomeSection'), { ssr: true, })
const EmblaCarousel = dynamic(() => import('./components/Slider/EmblaCarousel'), { ssr: true })
const MobileHeader = dynamic(() => import('./components/MobileHeader'), { ssr: true })
const ProductSliderMobile = dynamic(() => import('./components/HomePageComponents/ProductSliderMobile'), { ssr: true })
const BrandSliderMobile = dynamic(() => import('./components/HomePageComponents/BrandSliderMobile'), { ssr: true })
const BestProductsMobile = dynamic(() => import('./components/HomePageComponents/BestProductsMobile'), { ssr: true })
const SpecialProductThumnailMobile = dynamic(() => import('./components/HomePageComponents/SpecialProductThumnailMobile'), { ssr: true })

import { useRouter } from 'next/navigation'

interface UserAgent {
    isMobile: boolean;
    [key: string]: any; // If there are additional dynamic properties
}

export default function Page({ params, searchParams }: { params: any, searchParams: any }) {
    const [checkUser, setCheckUser] = useState<boolean>(false);
    const [searchPop, setSearchPop] = useState<boolean>(false);
    const [downloadApp, setDownloadApp] = useState<boolean>(false);
    const [bestSellerSelected, setBestSellerSelected] = useState<any>(null);
    const [searchInput, setSearchInput] = useState<any>(null);
    const [searchResult, setSearchResult] = useState<any>(null);
    // const OPTIONS: EmblaOptionsType = { loop: true, direction: params?.lang === 'ar' ? 'rtl' : 'ltr', align: 'center' }
    const OPTIONSTHREEMOBILE: EmblaOptionsType = { loop: true, direction: params?.lang === 'ar' ? 'rtl' : 'ltr', align: 'center' }
    const brandData = params?.homepageparttwo?.data?.homesecfour?.brandThirdData;
    const topSliders = params?.homepageparttwo?.data?.topsliders ?? [];
    const [countryCode, setCountryCode] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true); // Loader state
    const brandDataNew: any = params?.homepageparttwoSecTwo?.sec7;
    const sec14Data: any = params?.homepageparttwoSecThree?.sec14;
    const router = useRouter();
    const userAgent: UserAgent | null = typeof window !== 'undefined' ? useUserAgent(window.navigator.userAgent) : null;

    // This is for loading on scroll
    const section1Ref = useRef<HTMLDivElement | null>(null);
    const section2Ref = useRef<HTMLDivElement | null>(null);
    const section3Ref = useRef<HTMLDivElement | null>(null);
    const section4Ref = useRef<HTMLDivElement | null>(null);
    const section5Ref = useRef<HTMLDivElement | null>(null);
    const section6Ref = useRef<HTMLDivElement | null>(null);
    const section7Ref = useRef<HTMLDivElement | null>(null);
    const section8Ref = useRef<HTMLDivElement | null>(null);
    const section9Ref = useRef<HTMLDivElement | null>(null);
    const section10Ref = useRef<HTMLDivElement | null>(null);
    const section11Ref = useRef<HTMLDivElement | null>(null);
    const section12Ref = useRef<HTMLDivElement | null>(null);
    const section13Ref = useRef<HTMLDivElement | null>(null);
    const section14Ref = useRef<HTMLDivElement | null>(null);
    const [isSection1Visible, setIsSection1Visible] = useState(true);
    const [isSection2Visible, setIsSection2Visible] = useState(false);
    const [isSection3Visible, setIsSection3Visible] = useState(false);
    const [isSection4Visible, setIsSection4Visible] = useState(false);
    const [isSection5Visible, setIsSection5Visible] = useState(false);
    const [isSection6Visible, setIsSection6Visible] = useState(false);
    const [isSection7Visible, setIsSection7Visible] = useState(false);
    const [isSection8Visible, setIsSection8Visible] = useState(false);
    const [isSection9Visible, setIsSection9Visible] = useState(false);
    const [isSection10Visible, setIsSection10Visible] = useState(false);
    const [isSection11Visible, setIsSection11Visible] = useState(false);
    const [isSection12Visible, setIsSection12Visible] = useState(false);
    const [isSection13Visible, setIsSection13Visible] = useState(false);
    const [isSection14Visible, setIsSection14Visible] = useState(false);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const lang: any = params?.lang; // Default to 'en' if lang is undefined
    const isArabic = params.lang === 'ar' ? true : false;
    const isMobileOrTablet = params?.devicetype === 'mobile' || params?.devicetype === 'tablet' ? true : false;
    const containerClass = isMobileOrTablet ? 'container' : 'px-[4.8rem]';

    // useEffect(() => {
    //   const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate loading time
    //   return () => clearTimeout(timer); // Cleanup timeout
    // }, []);


    // const InstallmentimageSrc = "https://images.tamkeenstores.com.sa/assets/new-media/baseta%20(1)_09SEPT.webp";
    const OPTIONS: EmblaOptionsType = { loop: true, direction: params?.lang === 'ar' ? 'rtl' : 'ltr', align: 'center' }
    useEffect(() => {
        if (typeof window === "undefined") return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const sectionId = entry.target.getAttribute("data-section");
                    if (entry.isIntersecting) {
                        if (sectionId === "1") setIsSection1Visible(true);
                        if (sectionId === "2") setIsSection2Visible(true);
                        if (sectionId === "3") setIsSection3Visible(true);
                        if (sectionId === "4") setIsSection4Visible(true);
                        if (sectionId === "5") setIsSection5Visible(true);
                        if (sectionId === "6") setIsSection6Visible(true);
                        if (sectionId === "7") setIsSection7Visible(true);
                        if (sectionId === "8") setIsSection8Visible(true);
                        if (sectionId === "9") setIsSection9Visible(true);
                        if (sectionId === "10") setIsSection10Visible(true);
                        if (sectionId === "11") setIsSection11Visible(true);
                        if (sectionId === "12") setIsSection12Visible(true);
                        if (sectionId === "13") setIsSection13Visible(true);
                        if (sectionId === "14") setIsSection14Visible(true);

                        observer.unobserve(entry.target); // Stop observing once loaded
                    }
                });
            },
            { threshold: 1 } // Adjust threshold as needed
        );

        // Observe each section
        if (section1Ref.current) observer.observe(section1Ref.current);
        if (section2Ref.current) observer.observe(section2Ref.current);
        if (section3Ref.current) observer.observe(section3Ref.current);
        if (section4Ref.current) observer.observe(section4Ref.current);
        if (section5Ref.current) observer.observe(section5Ref.current);
        if (section6Ref.current) observer.observe(section6Ref.current);
        if (section7Ref.current) observer.observe(section7Ref.current);
        if (section8Ref.current) observer.observe(section8Ref.current);
        if (section9Ref.current) observer.observe(section9Ref.current);
        if (section10Ref.current) observer.observe(section10Ref.current);
        if (section11Ref.current) observer.observe(section11Ref.current);
        if (section12Ref.current) observer.observe(section12Ref.current);
        if (section13Ref.current) observer.observe(section13Ref.current);
        if (section14Ref.current) observer.observe(section14Ref.current);
        // if (section2Ref.current) observer.observe(section2Ref.current);

        return () => observer.disconnect(); // Cleanup on component unmount
    }, []);

    // Refresh and Check User
    useEffect(() => {
        if (localStorage.getItem("userid")) {
            setCheckUser(true);
        }
        if (searchParams?.notifications?.length) {
            notificationCount();
        }
    }, [params]);

    // Handle Popups and Session Management
    useEffect(() => {
        const handlePopupDisplay = () => {
            const popupShown = localStorage.getItem("popupShown");
            const pageLoaded = sessionStorage.getItem("pageLoaded");
            if (!popupShown) {
                setDownloadApp(true);
                localStorage.setItem("popupShown", "true");
            } else if (pageLoaded === "true") {
                setDownloadApp(true);
            }
            sessionStorage.setItem("pageLoaded", "true");
        };
        // getCountry();
        handlePopupDisplay();

        return () => {
            sessionStorage.removeItem("pageLoaded");
        };
    }, []);

    // Fetch Notifications Count
    const notificationCount = async () => {
        if (searchParams?.notifications?.length) {
            const data = {
                id: searchParams.notifications,
                desktop: true,
            };
            try {
                const responseJson: any = await post("notificationsCounts", data);
                if (responseJson?.success) {
                    // Handle success logic if needed
                }
            } catch (error) {
                console.error("Failed to fetch notification counts:", error);
            }
        }
    };

    const [searchDialoug, setSearchDialoug] = useState(false);
    const SearchData: any = async (e: any) => {
        if (e?.length == 0) {
            setSearchDialoug(false)
        } else {
            setSearchDialoug(true)
            var searchcity = await localStorage.getItem("city")

            get(`search-regional-new?q=${e}&city=${searchcity}`).then((responseJson: any) => {
                setSearchResult(responseJson)
            })
        }
    }
    const imageAlt = `${isArabic ? "data?.name_ar" : "data?.name"}`;

    return (
        <>
        <MobileHeader type="Main" lang={params?.lang} onClick={() => setSearchPop(!searchPop)} devicetype="mobile" />
        <section className='container !pt-[0.71rem]'>
            {params?.homepageparttwonew?.sec1banner?.sec1_status == 1 ?
                <>
                   <Image
                            // src={isArabic ? NewMedia2 + params?.homepageparttwonew?.sec1banner?.sec1_image_ar : NewMedia2 + params?.homepageparttwonew?.sec1banner?.sec1_image}
                            src="https://adminpanelapis.tamkeenstores.com.sa/assets/new-media/top-banner-mob-28Apr.webp"
                            alt="Description of the image"
                            width={1200}  // Natural width
                            height={800}  // Natural height
                            layout="responsive" // Ensures the image adjusts for responsiveness
                            priority // Loads the image earlier for faster rendering
                            className="rounded-md w-full h-auto" // Tailwind for responsive styles
                            sizes='(max-width: 768px) 100vw, 100vw' // Responsive image sizes
                        />
                </>
                : null}
        </section>
        <section className='sectionClass container !pt-[0.71rem]'>
            {params?.homepageparttwonew?.sec2SliderRight?.length >= 1 ?
                <EmblaCarousel delayTimer={6000} slides={params?.homepageparttwonew?.sec2SliderRight} options={OPTIONS} lang={params?.lang} devicetype="mobile" roundedClassName="rounded-md h-auto" />
                : null}
            <div className='grid grid-cols-2 gap-x-3 my-3'>
                {params?.homepageparttwonew?.sec2SliderMiddleBottomLeft?.length >= 1 ?
                    <EmblaCarousel delayTimer={4000} additionalClass={true} slides={params?.homepageparttwonew?.sec2SliderMiddleBottomLeft} options={OPTIONS} lang={params?.lang} devicetype="mobile" roundedClassName="rounded-md h-auto" />
                    : null}
                <div>
                    {params?.homepageparttwonew?.sec2SliderMiddleTop?.length >= 1 ?
                        <EmblaCarousel delayTimer={5000} additionalClass={true} groupImages={false} slides={params?.homepageparttwonew?.sec2SliderMiddleTop} options={OPTIONS} lang={params?.lang} devicetype="mobile" roundedClassName="rounded-md h-auto mb-3" />
                        : null}
                    {params?.homepageparttwonew?.sec2SliderMiddleBottomRight?.length >= 1 ?
                        <EmblaCarousel delayTimer={4500} additionalClass={true} slides={params?.homepageparttwonew?.sec2SliderMiddleBottomRight} options={OPTIONS} lang={params?.lang} devicetype="mobile" roundedClassName="rounded-md h-auto" />
                        : null}
                </div>
            </div>
            {params?.homepageparttwonew?.sec2SliderLeft?.length >= 1 ?
                <div className='mt-3'>
                    <EmblaCarousel delayTimer={7000} additionalClass={true} slides={params?.homepageparttwonew?.sec2SliderLeft} options={OPTIONS} lang={params?.lang} devicetype="mobile" roundedClassName="rounded-md h-auto" />
                </div>
                : null}
        </section>
        {params?.homepageparttwonew?.sectioncategories?.sec3_status == 1
            && params?.homepageparttwonew?.sectioncategories?.categories?.length >= 1 ?
            <section className='mb-3 container !pt-0'>
                <div ref={section1Ref} data-section="1">
                    {isSection1Visible && (
                        <Fragment>
                            <CategoriesHomeMobile
                                lang={lang}
                                params={params?.homepageparttwonew?.sectioncategories}
                                userAgent={userAgent}
                                // origin={origin}
                                NewMedia={NewMedia2}
                                devicetype={isMobileOrTablet}
                            />
                        </Fragment>
                    )}
                </div>
            </section>
            : null}
        {params?.homepageparttwonew?.bsdata?.sec4_status == 1 && Object?.values(params?.homepageparttwonew?.bsdata)?.length >= 1 ?
            <section className={`${containerClass}`}>
                <div ref={section3Ref} data-section="3">
                    {isSection3Visible && (
                        <Fragment>
                            <BestProductsMobile data={params?.homepageparttwonew?.bsdata} headingRequired={true} isArabic={isArabic} lang={params?.lang} dict={params?.dict} origin={origin} userAgent={params?.userAgent} />
                        </Fragment>
                    )}
                </div>
            </section>
            : null}
        {params?.homepageparttwoSecTwo?.sec6?.sec6_status == 1 && params?.homepageparttwoSecTwo?.sec6?.products?.data?.length >= 1 ?
            <section className={`${containerClass} mt-3`}>
                <div ref={section4Ref} data-section="4">
                    {isSection4Visible && (
                        <Fragment>
                            <SpecialProductThumnailMobile
                                lang={lang}
                                bgcolor={true}
                                isArabic={isArabic}
                                typeLeft={true}
                                dict={params?.dict}
                                origin={origin}
                                data={params?.homepageparttwoSecTwo?.sec6}
                                title={isArabic ? params?.homepageparttwoSecTwo?.sec6?.sec6_title_ar : params?.homepageparttwoSecTwo?.sec6?.sec6_title}
                                description={isArabic ? params?.homepageparttwoSecTwo?.sec6?.sec6_description_ar : params?.homepageparttwoSecTwo?.sec6?.sec6_description}
                                buttonTitle={isArabic ? params?.homepageparttwoSecTwo?.sec6?.sec6_button_title_ar : params?.homepageparttwoSecTwo?.sec6?.sec6_button_title}
                                buttonLink={isArabic ? params?.homepageparttwoSecTwo?.sec6?.sec6_button_link_ar : params?.homepageparttwoSecTwo?.sec6?.sec6_button_link}
                            />
                        </Fragment>
                    )}
                </div>
            </section>
            : null}
        {params?.homepageparttwoSecTwo?.sec7?.sec7_status == 1 && brandDataNew?.brands?.length >= 1 ?
            <section className={`${containerClass} mt-3`}>
                <div ref={section5Ref} data-section="5">
                    {isSection5Visible && (
                        <Fragment>
                            <BrandSliderMobile
                                lang={lang}
                                dict={params?.dict?.products}
                                props={brandDataNew}
                                devicetype={isMobileOrTablet}
                            />
                        </Fragment>
                    )}
                </div>
            </section>
            : null}
        {params?.homepageparttwoSecTwo?.sec8?.sec8_status == 1 ?
            <section className={`${containerClass} mt-3 bg-white`}>
                <div ref={section6Ref} data-section="6">
                    {isSection6Visible && (
                        <Fragment>
                            <HomeStyleVideoSectionMobile
                                isArabic={isArabic}
                                lang={lang}
                                dict={params?.dict}
                                origin={origin}
                                data={params?.homepageparttwoSecTwo?.sec8}
                                devicetype={isMobileOrTablet}
                            />
                        </Fragment>
                    )}
                </div>
            </section>
            : null}
        {params?.homepageparttwoSecTwo?.sec9?.sec9_status == 1 && params?.homepageparttwoSecTwo?.sec9?.products?.data?.length >= 1 ?
            <section className={`${containerClass} mt-3`}>
                <div ref={section7Ref} data-section="7">
                    {isSection7Visible && (
                        <Fragment>
                            <ProductSliderMobile
                                classHeading="!hidden"
                                headingRequired={true}
                                products={params?.homepageparttwoSecTwo?.sec9?.products?.data}
                                lang={params?.lang}
                                dict={params?.dict}
                                origin={origin}
                                userAgent={params?.userAgent}
                                title={isArabic ? params?.homepageparttwoSecTwo?.sec9?.sec9_title_ar : params?.homepageparttwoSecTwo?.sec9?.sec9_title}
                                showAllTitle={isArabic ? params?.homepageparttwoSecTwo?.sec9?.sec9_show_all_title_ar : params?.homepageparttwoSecTwo?.sec9?.sec9_show_alltitle}
                                buttonTitle={isArabic ? params?.homepageparttwoSecTwo?.sec9?.sec9_show_alltitle_ar : params?.homepageparttwoSecTwo?.sec9?.sec9_show_alltitle}
                                buttonLink={isArabic ? params?.homepageparttwoSecTwo?.sec9?.sec9_show_all_link_ar : params?.homepageparttwoSecTwo?.sec9?.sec9_show_all_link}
                            />
                        </Fragment>
                    )}
                </div>
            </section>
            : null}
        {params?.homepageparttwoSecTwo?.sec10?.sec10_status == 1 && params?.homepageparttwoSecTwo?.sec10?.products?.data?.length >= 1 ?
            <section className={`${containerClass} mt-3`}>
                <div ref={section8Ref} data-section="8">
                    {isSection8Visible && (
                        <Fragment>
                            <SpecialProductThumnailMobile
                                typeLeft={true}
                                bgcolor={false}
                                lang={lang}
                                isArabic={isArabic}
                                dict={params?.dict}
                                origin={origin}
                                data={params?.homepageparttwoSecTwo?.sec10}
                                title={isArabic ? params?.homepageparttwoSecTwo?.sec10?.sec10_title_ar : params?.homepageparttwoSecTwo?.sec10?.sec10_title}
                                description={isArabic ? params?.homepageparttwoSecTwo?.sec10?.sec10_description_ar : params?.homepageparttwoSecTwo?.sec10?.sec10_description}
                                buttonTitle={isArabic ? params?.homepageparttwoSecTwo?.sec10?.sec10_button_title_ar : params?.homepageparttwoSecTwo?.sec10?.sec10_button_title}
                                buttonLink={isArabic ? params?.homepageparttwoSecTwo?.sec10?.sec10_button_link_ar : params?.homepageparttwoSecTwo?.sec10?.sec10_button_link}
                            />
                        </Fragment>
                    )}
                </div>
            </section>
            : null}
        {params?.homepageparttwoSecThree?.sec11?.sec11_status == 1 && params?.homepageparttwoSecThree?.sec11?.products?.data?.length >= 1 ?
            <section className={`${containerClass} mt-3`}>
                <div ref={section9Ref} data-section="9">
                    {isSection9Visible && (
                        <Fragment>
                            <ProductSliderMobile
                                classHeading="!hidden"
                                headingRequired={true}
                                products={params?.homepageparttwoSecThree?.sec11?.products?.data}
                                lang={params?.lang}
                                dict={params?.dict}
                                origin={origin}
                                userAgent={params?.userAgent}
                                title={isArabic ? params?.homepageparttwoSecThree?.sec11?.sec11_title_ar : params?.homepageparttwoSecThree?.sec11?.sec11_title}
                                showAllTitle={isArabic ? params?.homepageparttwoSecThree?.sec11?.sec11_show_all_title_ar : params?.homepageparttwoSecThree?.sec11?.sec11_show_alltitle}
                                buttonTitle={isArabic ? params?.homepageparttwoSecThree?.sec11?.sec11_show_all_title_ar : params?.homepageparttwoSecThree?.sec11?.sec11_show_alltitle}
                                buttonLink={isArabic ? params?.homepageparttwoSecThree?.sec11?.sec11_show_all_link_ar : params?.homepageparttwoSecThree?.sec11?.sec11_show_all_link}
                            />
                        </Fragment>
                    )}
                </div>
            </section>
            : null}
        {params?.homepageparttwoSecThree?.sec12?.sec12_status == 1 && (params?.homepageparttwoSecThree?.sec12?.sec12_mid_mobile_image_ar || params?.homepageparttwoSecThree?.sec12?.sec12_mid_mobile_image) ?
            <section className={`${containerClass} mt-3`}>
                <div ref={section10Ref} data-section="10" className='overflow-hidden bg-cover bg-no-repeat bg-center pt-60 pb-20 px-3 rounded-md' style={{ backgroundImage: `url('${isArabic ? `${NewMedia2}${params?.homepageparttwoSecThree?.sec12?.sec12_mid_mobile_image_ar}` : `${NewMedia2}${params?.homepageparttwoSecThree?.sec12?.sec12_mid_mobile_image}`}')` }}>
                    <div ref={section10Ref} data-section="10" className='relative'>
                        {isSection10Visible && (
                            <Link href={`${origin}/${lang}/${isArabic ? params?.homepageparttwoSecThree?.sec12?.sec12_mid_image_link_ar : params?.homepageparttwoSecThree?.sec12?.sec12_mid_image_link}`}
                                aria-label={`${origin}/${lang}/${isArabic ? params?.homepageparttwoSecThree?.sec12?.sec12_mid_image_link_ar : params?.homepageparttwoSecThree?.sec12?.sec12_mid_image_link}`}>
                                <div className='gap-3'>
                                    <div className='flex items-center gap-3'>
                                        {params?.homepageparttwoSecThree?.sec12?.sec12_mid_image2_ar || params?.homepageparttwoSecThree?.sec12?.sec12_mid_image2 ?
                                            <div className='overflow-hidden rounded-3xl'>
                                                <Image
                                                    src={isArabic ? NewMedia2 + params?.homepageparttwoSecThree?.sec12?.sec12_mid_image2_ar : NewMedia2 + params?.homepageparttwoSecThree?.sec12?.sec12_mid_image2}
                                                    alt={isArabic ? params?.homepageparttwoSecThree?.sec12?.sec12_title_ar : params?.homepageparttwoSecThree?.sec12?.sec12_title}
                                                    title={isArabic ? params?.homepageparttwoSecThree?.sec12?.sec12_title_ar : params?.homepageparttwoSecThree?.sec12?.sec12_title}
                                                    height={0}
                                                    width={0}
                                                    priority={true}
                                                    className="h-auto w-full mx-auto rounded-3xl hover:scale-105 transition-transform duration-500 ease-in-out"
                                                    sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw'
                                                />
                                            </div>
                                            : null}
                                        <div>
                                            {params?.homepageparttwoSecThree?.sec12?.sec12_mid_image3_ar || params?.homepageparttwoSecThree?.sec12?.sec12_mid_image3 ?
                                                <div className='overflow-hidden rounded-3xl'>
                                                    <Image
                                                        src={isArabic ? NewMedia2 + params?.homepageparttwoSecThree?.sec12?.sec12_mid_image3_ar : NewMedia2 + params?.homepageparttwoSecThree?.sec12?.sec12_mid_image3}
                                                        alt={isArabic ? params?.homepageparttwoSecThree?.sec12?.sec12_title_ar : params?.homepageparttwoSecThree?.sec12?.sec12_title}
                                                        title={isArabic ? params?.homepageparttwoSecThree?.sec12?.sec12_title_ar : params?.homepageparttwoSecThree?.sec12?.sec12_title}
                                                        height={0}
                                                        width={0}
                                                        priority={true}
                                                        className="h-auto w-full mx-auto rounded-3xl hover:scale-105 transition-transform duration-500 ease-in-out"
                                                        sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw'
                                                    />
                                                </div>
                                                : null}
                                            {params?.homepageparttwoSecThree?.sec12?.sec12_mid_image4_ar || params?.homepageparttwoSecThree?.sec12?.sec12_mid_image4 ?
                                                <div className='overflow-hidden rounded-3xl'>
                                                    <Image
                                                        src={isArabic ? NewMedia2 + params?.homepageparttwoSecThree?.sec12?.sec12_mid_image4_ar : NewMedia2 + params?.homepageparttwoSecThree?.sec12?.sec12_mid_image4}
                                                        alt={isArabic ? params?.homepageparttwoSecThree?.sec12?.sec12_title_ar : params?.homepageparttwoSecThree?.sec12?.sec12_title}
                                                        title={isArabic ? params?.homepageparttwoSecThree?.sec12?.sec12_title_ar : params?.homepageparttwoSecThree?.sec12?.sec12_title}
                                                        height={0}
                                                        width={0}
                                                        priority={true}
                                                        className="h-auto w-full mx-auto rounded-3xl mt-3 hover:scale-105 transition-transform duration-500 ease-in-out"
                                                        sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw'
                                                    />
                                                </div>
                                                : null}
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </section>
            : null}
        {params?.homepageparttwoSecThree?.sec13?.sec13_status == 1 && params?.homepageparttwoSecThree?.sec13?.products?.data?.length >= 1 ?
            <section className={`${containerClass} mt-3`}>
                <div ref={section11Ref} data-section="11">
                    {isSection11Visible && (
                        <Fragment>
                            <ProductSliderMobile
                                classHeading="!hidden"
                                headingRequired={true}
                                products={params?.homepageparttwoSecThree?.sec13?.products?.data}
                                lang={params?.lang}
                                dict={params?.dict}
                                origin={origin}
                                userAgent={params?.userAgent}
                                title={isArabic ? params?.homepageparttwoSecThree?.sec13?.sec13_title_ar : params?.homepageparttwoSecThree?.sec13?.sec13_title}
                                showAllTitle={isArabic ? params?.homepageparttwoSecThree?.sec13?.sec13_show_all_title_ar : params?.homepageparttwoSecThree?.sec13?.sec13_show_alltitle}
                                buttonTitle={isArabic ? params?.homepageparttwoSecThree?.sec13?.sec13_show_all_title_ar : params?.homepageparttwoSecThree?.sec13?.sec13_show_alltitle}
                                buttonLink={isArabic ? params?.homepageparttwoSecThree?.sec13?.sec13_show_all_link_ar : params?.homepageparttwoSecThree?.sec13?.sec13_show_all_link}
                            />
                        </Fragment>
                    )}
                </div>
            </section>
            : null}
        {params?.homepageparttwoSecThree?.sec14?.sec14_status == 1 ?
            <section className={`${containerClass}  mt-3 bg-white`}>
                <div ref={section12Ref} data-section="12">
                    {isSection12Visible && (
                        <Fragment>
                            <ThreeImageHalfPara
                                isArabic={isArabic}
                                props={sec14Data}
                                lang={lang}
                                isMobile={isMobileOrTablet}
                            />
                        </Fragment>
                    )}
                </div>
            </section>
            : null}
        {params?.homepageparttwoSecThree?.sec15?.sec15_status == 1 && params?.homepageparttwoSecThree?.sec15?.products?.data?.length >= 1 ?
            <section className={`${containerClass}  mt-3`}>
                <div ref={section13Ref} data-section="13">
                    {isSection13Visible && (
                        <Fragment>
                            <ProductSliderMobile
                                classHeading="!hidden"
                                headingRequired={true}
                                products={params?.homepageparttwoSecThree?.sec15?.products?.data}
                                lang={params?.lang}
                                dict={params?.dict}
                                origin={origin}
                                userAgent={params?.userAgent}
                                title={isArabic ? params?.homepageparttwoSecThree?.sec15?.sec15_title_ar : params?.homepageparttwoSecThree?.sec15?.sec15_title}
                                showAllTitle={isArabic ? params?.homepageparttwoSecThree?.sec15?.sec15_show_all_title_ar : params?.homepageparttwoSecThree?.sec15?.sec15_show_alltitle}
                                buttonTitle={isArabic ? params?.homepageparttwoSecThree?.sec15?.sec15_show_all_title_ar : params?.homepageparttwoSecThree?.sec15?.sec15_show_alltitle}
                                buttonLink={isArabic ? params?.homepageparttwoSecThree?.sec15?.sec15_show_all_link_ar : params?.homepageparttwoSecThree?.sec15?.sec15_show_all_link}
                            />
                        </Fragment>
                    )}
                </div>
            </section>
            : null}
        {params?.homepageparttwoSecThree?.sec16?.sec16_status == 1 && params?.homepageparttwoSecThree?.sec16?.products?.data?.length >= 1 ?
            <section className={`${containerClass} sectionClass`}>
                <div ref={section14Ref} data-section="14">
                    {isSection14Visible && (
                        <Fragment>
                            <ProductSliderMobile
                                classHeading="!hidden"
                                headingRequired={true}
                                products={params?.homepageparttwoSecThree?.sec16.products?.data}
                                lang={params?.lang}
                                dict={params?.dict}
                                origin={origin}
                                userAgent={params?.userAgent}
                                title={isArabic ? params?.homepageparttwoSecThree?.sec16.sec16_title_ar : params?.homepageparttwoSecThree?.sec16.sec16_title}
                                showAllTitle={isArabic ? params?.homepageparttwoSecThree?.sec16.sec16_show_all_title_ar : params?.homepageparttwoSecThree?.sec16.sec16_show_alltitle}
                                buttonTitle={isArabic ? params?.homepageparttwoSecThree?.sec16.sec16_show_all_title_ar : params?.homepageparttwoSecThree?.sec16.sec16_show_alltitle}
                                buttonLink={isArabic ? params?.homepageparttwoSecThree?.sec16.sec16_show_all_link_ar : params?.homepageparttwoSecThree?.sec16.sec16_show_all_link}
                            />
                        </Fragment>
                    )}
                </div>
            </section>
            : null
        }
        <section className={`${containerClass} bg-[#F3F9FC] border-t border-b border-primary py-3 ${userAgent?.isMobile || userAgent?.isTablet ? 'mt-3' : ''}`}>
            <div ref={section1Ref} data-section="1">
                {isSection1Visible && (
                    <Fragment>
                        <TamkeenServices isArabic={isArabic} userAgent={""} />
                    </Fragment>
                )}
            </div>
        </section>
        <Transition appear show={searchPop} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={() => setSearchPop(false)}>
                <div className="fixed inset-0 overflow-y-auto">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom={isArabic ? "translate-x-full" : "-translate-x-full"}
                        enterTo={isArabic ? "-translate-x-0" : "translate-x-0"}
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom={isArabic ? "-translate-x-0" : "translate-x-0"}
                        leaveTo={isArabic ? "translate-x-full" : "-translate-x-full"}
                    >
                        <Dialog.Panel className="w-full h-[-webkit-fill-available] container transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all">
                            <div className="align__center py-3.5 border-b mb-3 border-[#9CA4AB50]">
                                <Dialog.Title
                                    as="h4"
                                    className="text-lg font-bold leading-6 text-gray-900"
                                >
                                    {isArabic ? "البحث" : "Search Here ..."}
                                </Dialog.Title>
                                <button onClick={() => setSearchPop(false)} className="focus-visible:outline-none">
                                    <svg height="16" viewBox="0 0 329.26933 329" width="16" xmlns="http://www.w3.org/2000/svg" id="fi_1828778"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"></path></svg>
                                </button>
                            </div>
                            <div className="border rounded px-2 flex items-center border-[#004B7A] focus::border-[#000] h-10 gap-2 relative z-20 bg-white" onChange={(e: any) => SearchData(e.target.value)}>
                                <input id="productSearch" type="text" name="shipping-charge" className="form-input focus-visible:outline-none focus:ring-transparent text-sm h-9 border-none w-full"
                                    value={searchInput}
                                    placeholder={isArabic ? "البحث" : "Search Here ..."}
                                    onChange={(e: any) => {
                                        setSearchInput(e.target.value)
                                    }}
                                    onPaste={(e: any) => {
                                        const pastedText = e.clipboardData.getData('text')
                                        setSearchInput(e.target.value)
                                        SearchData(pastedText)
                                    }}
                                />
                                <button
                                    className={`focus-visible:outline-none underline text-xs text-[#DC4E4E] font-semibold ${searchInput?.length ? "block" : "hidden"}`}
                                    onClick={() => { setSearchInput(''), setSearchResult([]) }}
                                >
                                    {isArabic ? 'مسح' : 'Clear'}
                                </button>
                            </div>
                            <div className="overflow-y-auto h-[-webkit-fill-available] pb-40 mt-4">
                                <div className="mb-6 flex flex-wrap gap-2">
                                    {searchResult?.cats?.map((d: any, i: any) => (
                                        <button onClick={() => {
                                            router.push(`/${params?.lang}/category/${d?.slug}`)
                                            router.refresh()
                                        }} className="text-[#5D686F] text-xs font-medium bg-[#F0F5FA] py-2 px-3.5 rounded-full hover:bg-[#004B7A] hover:text-white">{isArabic ? d.name_arabic : d.name}</button>
                                    ))}
                                    {searchResult?.brands?.map((d: any, i: any) => (
                                        <button onClick={() => {
                                            router.push(`/${params?.lang}/brand/${d?.slug}`)
                                            router.refresh()
                                        }} className="text-[#5D686F] text-xs font-medium bg-[#F0F5FA] py-2 px-3.5 rounded-full hover:bg-[#004B7A] hover:text-white">{isArabic ? d.name_arabic : d.name}</button>
                                    ))}
                                </div>
                                {searchResult?.cats?.length ?
                                    <div className="mb-4">
                                        <h2 className='heading__bsm'>{params.isArabic ? 'فئات ذات صلة' : 'Related Categories'}</h2>
                                        <div className='flex flex-wrap items-center gap-3'>
                                            {searchResult?.cats?.map((d: any, i: any) => (
                                                <Link href={`${origin}/${params?.lang}/category/${d.slug}`} onClick={() => { setSearchDialoug(false), setSearchInput('') }}
                                                    className="bg-[#F0F5FA] border border-[#D9D9D920] flex items-center gap-2 p-2.5 text-xs rounded-md hover:border-[#004B7A] hover:text-[#004B7A] hover:bg-white font-semibold">
                                                    <Image
                                                        src={d?.image_link_app ? d?.image_link_app : "https://images.tamkeenstores.com.sa/assets/new-media/3f4a05b645bdf91af2a0d9598e9526181714129744.png"}
                                                        height={18} width={18} alt={params.isArabic ? d?.name_arabic : d?.name}
                                                        sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw'
                                                    />
                                                    {isArabic ? d.name_arabic : d.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                    : null}
                                {searchResult?.brands?.length ?
                                    <div className="mb-4">
                                        <h2 className='heading__bsm'>{params.isArabic ? 'العلامة التجارية' : "Brands"}</h2>
                                        <div className='grid grid-cols-4 gap-3'>
                                            {searchResult?.brands?.map((data: any) => {
                                                return (
                                                    <Link key={data?.id}
                                                        href={`${origin}/${params.lang}/brand/${data?.slug}`}
                                                        onClick={() => { setSearchDialoug(false), setSearchInput('') }}

                                                        className="py-2 rounded shadow-md transition-shadow duration-300 ease-in-out border border-[#9CA4AB50]">
                                                        {data?.brand_media_image?.image ?
                                                            <Image
                                                                src={NewMedia + data?.brand_media_image?.image}
                                                                alt={`${params.isArabic ? data?.name_arabic : data?.name}-${data?.id + 17}`}
                                                                title={params.isArabic ? data?.name_arabic : data?.name}
                                                                loading="lazy"
                                                                width={60}
                                                                height={50}
                                                                className="mx-auto"
                                                                sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw'
                                                            />
                                                            : null}
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    : null}

                                {searchResult?.products?.length == 0 && searchInput != '' ?
                                    <div className={`w-full`}>
                                        <h2 className='heading__bsm'>{isArabic ? 'قائمة المنتجات' : 'no products found!'}</h2>
                                    </div>
                                    :
                                    null
                                }
                                {searchResult?.products?.length ?
                                    <div className={`w-full`}>
                                        <h2 className='heading__bsm'>{isArabic ? "العلامة التجارية" : "Products"}</h2>
                                        <div className='pb-16'>
                                            {/* <Product className="!min-w-44" lang={params?.lang} dict={params?.dict?.products} products={searchResult?.products} devicetype={userAgent?.isMobile || userAgent?.isTablet ? 'mobile' : 'dekstop'} /> */}
                                            <Products grid={!isMobileOrTablet ? '4' : '2'} devicetype={isMobileOrTablet} lang={params?.lang} dict={params?.dict?.products} products={searchResult?.products} />
                                        </div>
                                    </div>
                                    : null}
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
        </>
    )
}
