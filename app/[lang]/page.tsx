"use client"; // This is a client component 👈🏽

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { NewMedia2 } from "./api/Api";
import { userAgent } from "next/server";
import { get } from "./api/ApiCalls";

const ProductLoopSpecialProducts = dynamic(() => import("./components/NewHomePageComp/ProductLoopSpecialProducts"), { ssr: true });
const MainSliderVertical = dynamic(() => import("./components/NewHomePageComp/MainSliderVertical"), { ssr: false });
const MainSliderHorizental = dynamic(() => import("./components/NewHomePageComp/MainSliderHorizental"), { ssr: false });
const ProductSliderComponent = dynamic(() => import("./components/NewHomePageComp/ProductSlider"), { ssr: false });
const BadgeProductSlider = dynamic(() => import("./components/NewHomePageComp/BadgeProductSlider"), { ssr: false });
const PriceSection = dynamic(() => import("./components/NewHomePageComp/PriceSection"), { ssr: false });
const BrandSlider = dynamic(() => import("./components/NewHomePageComp/BrandSlider"), { ssr: false });
const CategoryHomeSectionNew = dynamic(() => import("./components/NewHomePageComp/CategoryHomeSectionNew"), { ssr: false });
const BadgeProductLoopComponent = dynamic(() => import("./components/NewHomePageComp/BadgeProductLoop"), { ssr: false });
const MainSliderMobile = dynamic(() => import("./components/NewHomePageComp/MainSliderMobile"), { ssr: false });
const CategoriesHomeMobile = dynamic(() => import("./components/NewHomePageComp/CategoriesHomeMobile"), { ssr: false });
const ProductLoopMobile = dynamic(() => import("./components/NewHomePageComp/ProductLoopMobile"), { ssr: false });
const TamkeenServices = dynamic(() => import("./components/TamkeenServices"), { ssr: true, });
const MobileHeaderNew = dynamic(() => import("./components/MobileHeaderNew"), { ssr: true, });
const Newsletter = dynamic(() => import("./components/NewHomePageComp/Newsletter"), { ssr: true });
import { useHomepage } from "./context/HomepageContext";

export default function Homepage({ params }: { params: any }) {
  const homepageProps = useHomepage()
  const router = useRouter();
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const lang: any = params?.lang; // Default to 'en' if lang is undefined
  const isArabic = params.lang === "ar" ? true : false;
  const homepageparttwonew = homepageProps?.homepageparttwoSecTwo;
  const homepagepartonelatest = homepageProps?.homepagepartonelatest;
  const homepageparttwolatest = homepageProps?.homepageparttwolatest;
  const homepagepartthreelatest = homepageProps?.homepagepartthreelatest;
  const containerClass = "container";
  const containerClassMobile = "ltr:pl-4 rtl:pr-4";
  const [sec4SelectedIndex, setSec4SelectedIndex] = useState(0);
  const [sec4SelectedCategory, setSec4SelectedCategory] = useState<any>(null);
  const [sec4SelectedProducts, setSec4SelectedProducts] = useState<any>([]);

  const [sec6SelectedIndex, setSec6SelectedIndex] = useState(0);
  const [sec6SelectedCategory, setSec6SelectedCategory] = useState<any>(null);
  const [sec6SelectedProducts, setSec6SelectedProducts] = useState<any>([]);

  useEffect(() => {
    if (
      params &&
      homepagepartonelatest?.first_five_sec?.section_four?.length > 0
    ) {
      const firstSection: any =
        homepagepartonelatest.first_five_sec.section_four[0];
      setSec4SelectedCategory(firstSection?.category);
      setSec4SelectedProducts(firstSection?.products || []);
      setSec4SelectedIndex(0);
    }
    if (
      params &&
      homepageparttwolatest?.six_eleven_sec?.section_six?.length > 0
    ) {
      const secondSection: any =
        homepageparttwolatest?.six_eleven_sec?.section_six[0];
      setSec6SelectedCategory(secondSection?.category);
      setSec6SelectedProducts(secondSection?.products || []);
      setSec6SelectedIndex(0);
    }
  }, [params, homepagepartonelatest, homepageparttwolatest]);

  const [isSection4Visible, setIsSection4Visible] = useState(false);
  const [isSection6NewVisible, setIsSection6NewVisible] = useState(false);
  const updateCategoryProducts = async (
    rowId: any,
    categoryIndex: any,
    type: any
  ) => {
    try {
      if (type == 1) setIsSection4Visible(true);
      if (type == 2) setIsSection6NewVisible(true);
      const city: any = localStorage.getItem("globalcity") || "Jeddah";
      const response: any = await get(
        `getlatestcategoryproducts/${type}/${rowId}&city=${city}`
      );
      const data = response;
      const selectedProducts = data?.[0]?.products || [];
      if (type == 2) {
        setSec6SelectedIndex(categoryIndex);
        setSec6SelectedProducts(selectedProducts);
        setIsSection6NewVisible(false);
      } else {
        setSec4SelectedIndex(categoryIndex);
        setSec4SelectedProducts(selectedProducts);
        setIsSection4Visible(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsSection4Visible(false);
      setIsSection6NewVisible(false);
    }
  };

  //sec 1
  const sec1Image: any = homepagepartonelatest?.first_five_sec?.sec_one_image
    ? NewMedia2 + homepagepartonelatest?.first_five_sec?.sec_one_image
    : "";
  const sec1Link: any = homepagepartonelatest?.first_five_sec?.sec_one_link
    ? homepagepartonelatest?.first_five_sec?.sec_one_link
    : "#";
  //sec 2
  const sec2SliderLeftImage: any = homepagepartonelatest?.first_five_sec
    ?.section_two_slider_left?.slider_image
    ? homepagepartonelatest?.first_five_sec?.section_two_slider_left
      ?.slider_image
    : "";
  const sec2SliderTopImage: any = homepagepartonelatest?.first_five_sec
    ?.section_two_slider_top?.slider_image
    ? homepagepartonelatest?.first_five_sec?.section_two_slider_top
      ?.slider_image
    : "";
  const sec2BottomImage1: any = homepagepartonelatest?.first_five_sec
    ?.sec_two_bottom_image_one
    ? NewMedia2 +
    homepagepartonelatest?.first_five_sec?.sec_two_bottom_image_one
    : "https://images.tamkeenstores.com.sa/assets/new-media/Main04-BNR2-16Apr.webp";
  const sec2BottomLink1: any = homepagepartonelatest?.first_five_sec
    ?.sec_two_bottom_link_one
    ? homepagepartonelatest?.first_five_sec?.sec_two_bottom_link_one
    : "";
  const sec2BottomImage2: any = homepagepartonelatest?.first_five_sec
    ?.sec_two_bottom_image_two
    ? NewMedia2 +
    homepagepartonelatest?.first_five_sec?.sec_two_bottom_image_two
    : "https://images.tamkeenstores.com.sa/assets/new-media/samsung-tv--Website-24Apr.webp";
  const sec2BottomLink2: any = homepagepartonelatest?.first_five_sec
    ?.sec_two_bottom_link_two
    ? homepagepartonelatest?.first_five_sec?.sec_two_bottom_link_two
    : "";
  const sec2BottomImage3: any = homepagepartonelatest?.first_five_sec
    ?.sec_two_bottom_image_three
    ? NewMedia2 +
    homepagepartonelatest?.first_five_sec?.sec_two_bottom_image_three
    : "https://images.tamkeenstores.com.sa/assets/new-media/Banner-5Discount-Re.webp";
  const sec2BottomLink3: any = homepagepartonelatest?.first_five_sec
    ?.sec_two_bottom_link_three
    ? homepagepartonelatest?.first_five_sec?.sec_two_bottom_link_three
    : "";
  //sec 3
  const secCategoryData: any = homepagepartonelatest?.first_five_sec
    ? homepagepartonelatest?.first_five_sec
    : null;
  //sec 4
  const sec4Title: any = homepagepartonelatest?.first_five_sec?.sec_four_title
    ? homepagepartonelatest?.first_five_sec?.sec_four_title
    : "Section 4";
  //sec 5
  const sec5Slider: any = homepagepartonelatest?.first_five_sec
    ?.section_five_slider?.slider_image
    ? homepagepartonelatest?.first_five_sec?.section_five_slider?.slider_image
    : "";
  const sec5Link1: any = homepagepartonelatest?.first_five_sec
    ?.sec_five_link_one
    ? homepagepartonelatest?.first_five_sec?.sec_five_link_one
    : "";
  const sec5Image1: any = homepagepartonelatest?.first_five_sec
    ?.sec_five_image_one
    ? NewMedia2 + homepagepartonelatest?.first_five_sec?.sec_five_image_one
    : "";
  const sec5Link2: any = homepagepartonelatest?.first_five_sec
    ?.sec_five_link_two
    ? homepagepartonelatest?.first_five_sec?.sec_five_link_two
    : "";
  const sec5Image2: any = homepagepartonelatest?.first_five_sec
    ?.sec_five_image_two
    ? NewMedia2 + homepagepartonelatest?.first_five_sec?.sec_five_image_two
    : "";
  const sec5Link3: any = homepagepartonelatest?.first_five_sec
    ?.sec_five_link_three
    ? homepagepartonelatest?.first_five_sec?.sec_five_link_three
    : "";
  const sec5Image3: any = homepagepartonelatest?.first_five_sec
    ?.sec_five_image_three
    ? NewMedia2 + homepagepartonelatest?.first_five_sec?.sec_five_image_three
    : "";
  const sec5Link4: any = homepagepartonelatest?.first_five_sec
    ?.sec_five_link_four
    ? homepagepartonelatest?.first_five_sec?.sec_five_link_four
    : "";
  const sec5Image4: any = homepagepartonelatest?.first_five_sec
    ?.sec_five_image_four
    ? NewMedia2 + homepagepartonelatest?.first_five_sec?.sec_five_image_four
    : "";
  //sec6
  const sec6Title: any = homepageparttwolatest?.six_eleven_sec?.sec_six_title
    ? homepageparttwolatest?.six_eleven_sec?.sec_six_title
    : "Section 6";
  //sec 7
  //sec 8
  const sec8Link: any = homepageparttwolatest?.six_eleven_sec?.sec_eight_link
    ? homepageparttwolatest?.six_eleven_sec?.sec_eight_link
    : "";
  const sec8MobileLink2: any = homepageparttwolatest?.six_eleven_sec
    ?.sec_eight_second_mobile_link
    ? homepageparttwolatest?.six_eleven_sec?.sec_eight_second_mobile_link
    : "";
  const sec8Image: any = homepageparttwolatest?.six_eleven_sec?.sec_eight_image
    ? NewMedia2 + homepageparttwolatest?.six_eleven_sec?.sec_eight_image
    : "https://images.tamkeenstores.com.sa/assets/new-media/27-4-2025-web-ac.webp";
  const sec8Video: any = homepageparttwolatest?.six_eleven_sec?.sec_eight_video
    ? NewMedia2 + homepageparttwolatest?.six_eleven_sec?.sec_eight_video
    : "https://images.tamkeenstores.com.sa/assets/new-media/7de85ade39cc1ac50224613b396b5fff1745748611.mp4";
  const sec8Heading: any = homepageparttwolatest?.six_eleven_sec
    ?.sec_eight_heading
    ? isArabic
      ? homepageparttwolatest?.six_eleven_sec?.sec_eight_heading
      : "Fresh Air, Fresh Savings!"
    : "";
  const sec8Para: any = homepageparttwolatest?.six_eleven_sec
    ?.sec_eight_paragraph
    ? isArabic
      ? homepageparttwolatest?.six_eleven_sec?.sec_eight_paragraph
      : "High Performance Cooling, Low Energy Consumption."
    : "";
  const sec8ButtonTitle: any = homepageparttwolatest?.six_eleven_sec
    ?.sec_eight_button_title
    ? isArabic
      ? homepageparttwolatest?.six_eleven_sec?.sec_eight_button_title
      : "View More"
    : "";
  //sec 9
  const Sec9Heading: any = homepageparttwolatest?.six_eleven_sec?.sec_nine_title
    ? homepageparttwolatest?.six_eleven_sec?.sec_nine_title
    : "Tamkeen Exclusive Sales";
  const Sec9ButtonTitle: any = homepageparttwolatest?.six_eleven_sec
    ?.sec_nine_button_title
    ? homepageparttwolatest?.six_eleven_sec?.sec_nine_button_title
    : "View All";
  const Sec9ButtonLink: any = homepageparttwolatest?.six_eleven_sec
    ?.sec_nine_button_link
    ? homepageparttwolatest?.six_eleven_sec?.sec_nine_button_link
    : "";
  const sec9Products: any = homepageparttwolatest?.six_eleven_sec?.section_nine
    ? homepageparttwolatest?.six_eleven_sec?.section_nine
    : [];
  //sec 10
  const Sec10Heading: any = homepageparttwolatest?.six_eleven_sec?.sec_ten_title
    ? homepageparttwolatest?.six_eleven_sec?.sec_ten_title
    : "Tamkeen Exclusive Sales";
  const Sec10ButtonTitle: any = homepageparttwolatest?.six_eleven_sec
    ?.sec_ten_button_title
    ? homepageparttwolatest?.six_eleven_sec?.sec_ten_button_title
    : "View All";
  const Sec10ButtonLink: any = homepageparttwolatest?.six_eleven_sec
    ?.sec_ten_button_link
    ? homepageparttwolatest?.six_eleven_sec?.sec_ten_button_link
    : "";
  const sec10Products: any = homepageparttwolatest?.six_eleven_sec?.section_ten
    ? homepageparttwolatest?.six_eleven_sec?.section_ten
    : "";
  //sec 11
  const sec11Slider: any = homepageparttwolatest?.six_eleven_sec?.section_eleven
    ?.slider_image
    ? homepageparttwolatest?.six_eleven_sec?.section_eleven?.slider_image
    : "";
  //sec 12
  const Sec12Heading: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_twelve_title
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_twelve_title
    : "Tamkeen Exclusive Sales";
  const Sec12ButtonTitle: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_twelve_button_title
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_twelve_button_title
    : "View All";
  const Sec12ButtonLink: any = homepageparttwolatest?.six_eleven_sec
    ?.sec_ten_button_link
    ? homepageparttwolatest?.six_eleven_sec?.sec_ten_button_link
    : "";
  const sec12Products: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_twelve_products
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_twelve_products
    : "";
  //sec 13
  const sec13BgImage: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_thirteen_bg_image
    ? `url(${NewMedia2 +
    homepagepartthreelatest.twelve_seventeen_sec.sec_thirteen_bg_image
    })`
    : "none";
  const sec13Link1: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_thirteen_link_one
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_thirteen_link_one
    : "";
  const sec13Image1: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_thirteen_image_one
    ? NewMedia2 +
    homepagepartthreelatest?.twelve_seventeen_sec?.sec_thirteen_image_one
    : "";
  const sec13Link2: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_thirteen_link_two
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_thirteen_link_two
    : "";
  const sec13Image2: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_thirteen_image_two
    ? NewMedia2 +
    homepagepartthreelatest?.twelve_seventeen_sec?.sec_thirteen_image_two
    : "";
  const sec13Link3: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_thirteen_link_three
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_thirteen_link_three
    : "";
  const sec13Image3: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_thirteen_image_three
    ? NewMedia2 +
    homepagepartthreelatest?.twelve_seventeen_sec?.sec_thirteen_image_three
    : "";
  const sec13ButtonLink: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_thirteen_button_link
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_thirteen_button_link
    : "";
  const sec13ButtonTitle: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_thirteen_button_title
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_thirteen_button_title
    : "View More";
  //sec 14
  const sec14Slider: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.section_fourteen?.slider_image
    ? homepagepartthreelatest?.twelve_seventeen_sec?.section_fourteen
      ?.slider_image
    : "";
  // const sec14Heading: any = isArabic ? "اطبخ بأناقة و دقة!" : 'Cook with elegance and precision!';
  // const sec14Paragraph: any = isArabic ? "تسوق الآن افران الطبخ و الأجهزة المدمجة بأفضل الأسعار مع  تخفيضات تمكين الحصرية" : 'Shop now Cooking Ovens and Built-in Appliances at the best prices with Exclusive Tamkeen Sales';
  // const sec14ButtonTitle: any = isArabic ? "عرض المزيد" : 'View More';
  //sec 15
  const Sec15Heading: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_fifteen_title
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_fifteen_title
    : "Tamkeen Exclusive Sales";
  const Sec15ButtonTitle: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_fifteen_button_title
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_fifteen_button_title
    : "View All";
  const Sec15ButtonLink: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_fifteen_button_link
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_fifteen_button_link
    : "";
  const sec15Products: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_fifteen_products
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_fifteen_products
    : "";
  //sec 16
  const Sec16Heading: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_sixteen_title
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_sixteen_title
    : "Tamkeen Exclusive Sales";
  const Sec16ButtonTitle: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_sixteen_button_title
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_sixteen_button_title
    : "View All";
  const Sec16ButtonLink: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_sixteen_button_link
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_sixteen_button_link
    : "";
  const sec16Products: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_sixteen_products
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_sixteen_products
    : "";
  //sec 17
  const Sec17Heading: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_seventeen_title
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_seventeen_title
    : "Tamkeen Exclusive Sales";
  const Sec17ButtonTitle: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_seventeen_button_title
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_seventeen_button_title
    : "View All";
  const Sec17ButtonLink: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_seventeen_button_link
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_seventeen_button_link
    : "";
  const sec17Products: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_seventeen_products
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_seventeen_products
    : "";
  //sec 18
  const sec18Heading: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_eighteen_heading
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_eighteen_heading
    : "Cook with elegance and precision!";
  const sec18Paragraph: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_eighteen_sub_heading
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_eighteen_sub_heading
    : "Shop now Cooking Ovens and Built-in Appliances at the best prices with Exclusive Tamkeen Sales";
  const sec18ButtonTitle: any = isArabic ? "عرض المزيد" : "View More";
  const sec18ButtonLink: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_eighteen_button_link
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_eighteen_button_link
    : "";
  const sec18Image1: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_eighteen_image_one
    ? NewMedia2 +
    homepagepartthreelatest?.twelve_seventeen_sec?.sec_eighteen_image_one
    : "";
  const sec18Link1: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_eighteen_link_one
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_eighteen_link_one
    : "";
  const sec18Image2: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_eighteen_image_two
    ? NewMedia2 +
    homepagepartthreelatest?.twelve_seventeen_sec?.sec_eighteen_image_two
    : "";
  const sec18Link2: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_eighteen_link_two
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_eighteen_link_two
    : "";
  const sec18Image3: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_eighteen_image_three
    ? NewMedia2 +
    homepagepartthreelatest?.twelve_seventeen_sec?.sec_eighteen_image_three
    : "";
  const sec18Link3: any = homepagepartthreelatest?.twelve_seventeen_sec
    ?.sec_eighteen_link_three
    ? homepagepartthreelatest?.twelve_seventeen_sec?.sec_eighteen_link_three
    : "";

  const brandHeading: any = isArabic
    ? "تـصـفـح بالعـلامـات التـجـاريـــة"
    : "Shop by Brands";
  const brandButtonTitle: any = isArabic ? "عـرض الكــل" : "View All";
  const brandButtonLink: any = "brandslisting";

  // This is for loading on scroll
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
  const section15Ref = useRef<HTMLDivElement | null>(null);
  const section16Ref = useRef<HTMLDivElement | null>(null);
  const section17Ref = useRef<HTMLDivElement | null>(null);
  const section18Ref = useRef<HTMLDivElement | null>(null);
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
  const [isSection15Visible, setIsSection15Visible] = useState(false);
  const [isSection16Visible, setIsSection16Visible] = useState(false);
  const [isSection17Visible, setIsSection17Visible] = useState(false);
  const [isSection18Visible, setIsSection18Visible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute("data-section");
          if (entry.isIntersecting) {
            if (sectionId == "5") setIsSection5Visible(true);
            if (sectionId == "6") setIsSection6Visible(true);
            if (sectionId == "7") setIsSection7Visible(true);
            if (sectionId == "8") setIsSection8Visible(true);
            if (sectionId == "9") setIsSection9Visible(true);
            if (sectionId == "10") setIsSection10Visible(true);
            if (sectionId == "11") setIsSection11Visible(true);
            if (sectionId == "12") setIsSection12Visible(true);
            if (sectionId == "13") setIsSection13Visible(true);
            if (sectionId == "14") setIsSection14Visible(true);
            if (sectionId == "15") setIsSection15Visible(true);
            if (sectionId == "16") setIsSection16Visible(true);
            if (sectionId == "17") setIsSection17Visible(true);
            if (sectionId == "18") setIsSection18Visible(true);

            observer.unobserve(entry.target); // Stop observing once loaded
          }
        });
      },
      { threshold: 1 } // Adjust threshold as needed
    );

    // Observe each section
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
    if (section15Ref.current) observer.observe(section15Ref.current);
    if (section16Ref.current) observer.observe(section16Ref.current);
    if (section17Ref.current) observer.observe(section17Ref.current);
    if (section18Ref.current) observer.observe(section18Ref.current);

    return () => observer.disconnect(); // Cleanup on component unmount
  }, []);

  const [bannerOneVisible, setBannerOneVisible] = useState(true);

  return (
    <>
        {/* Section 1 Start */}
        <div className="sticky top-0 z-40 bg-white">
            {bannerOneVisible ? (
                <>
                <div className="relative">
                    <Link
                    prefetch={false}
                    scroll={false}
                    href={sec1Link}
                    aria-label={sec1Link}
                    className="absolute top-1/2 -translate-y-1/2 left-4 rounded bg-primary px-[15px] py-[5px] text-white text-[11px] leading-[14px] shadow-md"
                    >
                    {isArabic ? "تحميل" : "Open"}
                    </Link>
                    <Image
                    alt="Description of the image"
                    title="Description of the image"
                    src={sec1Image}
                    width={0}
                    height={0}
                    decoding="async"
                    data-nimg="1"
                    sizes="100vw"
                    quality={100}
                    loading="lazy"
                    className={`w-full h-auto object-center object-fit-cover`}
                    />
                    <button
                    onClick={() => setBannerOneVisible(false)}
                    className="absolute top-1/2 -translate-y-1/2 right-2 w-4 h-8 fill-primary cursor-pointer"
                    style={{ border: "none", outline: "none" }}
                    >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 11 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g filter="url(#filter0_d_463_1862)">
                        <path
                            d="M8.80267 2.81407L8.18362 2.19501L5.72934 4.64929L3.27506 2.19501L2.65601 2.81407L5.11028 5.26835L2.65601 7.72262L3.27506 8.34168L5.72934 5.88741L8.18362 8.34168L8.80267 7.72262L6.3484 5.26835L8.80267 2.81407Z"
                            fill="#004B7A"
                        />
                        </g>
                        <defs>
                        <filter
                            id="filter0_d_463_1862"
                            x="1.65601"
                            y="1.19501"
                            width="8.14661"
                            height="8.14667"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                            />
                            <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                            />
                            <feOffset />
                            <feGaussianBlur stdDeviation="0.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                            />
                            <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_463_1862"
                            />
                            <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_463_1862"
                            result="shape"
                            />
                        </filter>
                        </defs>
                    </svg>
                    </button>
                </div>
                </>
            ) : null}
            <MobileHeaderNew
                type="Main"
                lang={params?.lang}
                dict={params?.dict}
                devicetype={true}
            />
        </div>
        <div className="pt-4"></div>
        <section>
        <MainSliderMobile
            data={sec2SliderTopImage}
            lang={lang}
            origin={origin}
        />
        <div className={containerClass}>
            <CategoriesHomeMobile
            lang={lang}
            params={secCategoryData}
            userAgent={userAgent}
            NewMedia={NewMedia2}
            devicetype={true}
            />
        </div>
        </section>

          {/* TSection 2 Start */}
          <section className="tamkeenSales_sec w-full mb-8" data-section="2">
            <div className={`ltr:pl-4 rtl:pr-4`}>
              <h2 className="headingHomeMain mb-4">{sec4Title}</h2>
              <div className="tamkeenSales_btns overflow-x-auto scrollbar-hide flex items-center lg:justify-evenly 2xl:justify-start gap-x-3 md:gap-x-5 pb-3 mb-4 w-full">
                {homepagepartonelatest?.first_five_sec?.section_four?.map(
                  (item: any, index: any) => {
                    return (
                      <button
                        key={index}
                        onClick={() =>
                          updateCategoryProducts(item?.category?.id, index, 1)
                        }
                        className={`bestProButton w-fit whitespace-nowrap px-4 py-2 selected
                                                ${index == sec4SelectedIndex
                            ? "bg-primary !text-white border-primary"
                            : " text-primary border-gray"
                          } 
                                            hover:text-white hover:bg-primary`}
                      >
                        {item?.category?.name ? item?.category?.name : ""}
                      </button>
                    );
                  }
                )}
              </div>
              {!isSection4Visible ? (
              <>
                <ProductLoopMobile
                  productData={sec4SelectedProducts}
                  lang={isArabic}
                  isMobileOrTablet={true}
                  origin={origin}
                />
              </>
              ) : (
                <div className="animate-pulse">
                  <div className="tamkeenSales_cardss grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 xl:gap-x-3 xl:gap-y-0 gap-x-4 gap-y-8 items-center justify-center h-[380px] md:h-[550px] lg:h-[440px] overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                      <div className="bg-white h-[380px] md:h-[550px] lg:h-[440px] rounded-2xl" key={i}></div>
                    ))}
                  </div>
                </div>
              )}
              {/* New Price Section */}
              <div className="py-8">
                <PriceSection isArabic={isArabic} isMobileOrTablet={true} origin={origin} />
              </div>
              {/* New Price Section */}
            </div>
          </section>
          {/* Section 2 End */}
          <MainSliderMobile data={sec5Slider} lang={lang} origin={origin} />

      {/* Section 4 Start */}
      <section
        className="bg-primary py-8 rounded-b-[3rem] lg:mb-14 mb-8  relative shadow-lg overflow-hidden"
        data-section="6"
      >
        <div ref={section6Ref} className={`${containerClassMobile}`} data-section="6">
          {isSection6Visible ? (
            <>
              <h2 className="headingHomeMain bg-white mb-2 w-fit p-3 rounded-bl-lg rounded-br-lg -mt-8">
                {sec6Title}
              </h2>
              <div className="tamkeenSales_btns overflow-x-auto scrollbar-hide flex items-center lg:justify-evenly 2xl:justify-start gap-x-5 py-3 mb-4 w-full">
                {homepageparttwolatest?.six_eleven_sec?.section_six?.map(
                  (item: any, index: any) => (
                    <button
                      key={index}
                      onClick={() =>
                        updateCategoryProducts(item?.category?.id, index, 2)
                      }
                      className={`bestProButton tamkeenBtns w-fit whitespace-nowrap px-4 py-2
                                    ${index == sec6SelectedIndex
                          ? "selected"
                          : "bg-white text-primary border-gray"
                        } `}
                    >
                      {item?.category?.name ? item?.category?.name : ""}
                    </button>
                  )
                )}
              </div>
              {!isSection6NewVisible ? (
                <>
                  {sec6SelectedProducts?.length > 0 && (
                    <BadgeProductSlider
                      productDataSlider={sec6SelectedProducts}
                      isArabic={isArabic}
                      isMobileOrTablet={true}
                      origin={origin}
                    />
                  )}
                </>
              ) : (
                <div className="animate-pulse">
                  <div className="tamkeenSales_cardss flex items-center xl:justify-between justify-start xl:gap-4 gap-x-4 gap-y-8 overflow-hidden">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="relative w-full flex rtl:flex-row-reverse items-start mt-[1.2rem] md:mt-6"
                      >
                        <div className="bg-white h-[410px] sm:h-[500px] lg:h-[420px] 2xl:h-[500px] relative rounded-2xl w-[200px] sm:w-[280px] lg:w-[190px] xl:w-[210px] 2xl:w-[280px]"></div>
                        <div className="pl-[2rem] bg-white shadow-xl rounded-tr-lg rounded-br-lg w-fit -ml-[10px]">
                          <span className="text-[7rem] lg:text-[10rem] -mr-[1.6rem] font-bold text-primary opacity-0">
                            {i + 1}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="animate-pulse w-full mb-8">
              <div className="tamkeenSales_btns flex flex-nowrap gap-4 py-3 mb-2 w-auto max-w-auto overflow-x-hidden">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white h-[38px] rounded-full w-[108px] shrink-0"
                  ></div>
                ))}
              </div>
              <div className="tamkeenSales_cardss flex items-center xl:justify-between justify-start xl:gap-4 gap-x-4 gap-y-8 overflow-hidden">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="relative w-full flex rtl:flex-row-reverse items-start mt-[1.2rem] md:mt-6"
                  >
                    <div className="bg-white h-[410px] sm:h-[500px] lg:h-[420px] 2xl:h-[500px] relative rounded-2xl w-[200px] sm:w-[280px] lg:w-[190px] xl:w-[210px] 2xl:w-[280px]"></div>
                    <div className="pl-[2rem] bg-white shadow-xl rounded-tr-lg rounded-br-lg w-fit -ml-[10px]">
                      <span className="text-[7rem] lg:text-[10rem] -mr-[1.6rem] font-bold text-primary opacity-0">
                        {i + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      {/*Section 4 End */}

      {/* Section 5 Start */}
      <section
        className="w-full lg:mb-14 mb-8 overflow-hidden relative pb-4"
        data-section="7"
      >
        <div ref={section7Ref} className={`${containerClass}`} data-section="7">
          {isSection7Visible ? (
            <>
              <div className="flex justify-between items-start">
                <h2 className="headingHomeMain mb-2">{brandHeading}</h2>
                <Link
                  prefetch={false}
                  scroll={false}
                  href={`${origin}/${lang}/${brandButtonLink}`}
                  className="text-primary text-sm md:text-xl font-medium underline px-1.5 md:bg-white bg-[#EBEBEB] py-1 rounded-md md:shadow-none shadow-sm"
                >
                  {brandButtonTitle}
                </Link>
              </div>
              <BrandSlider
                data={homepageparttwolatest?.six_eleven_sec?.section_seven}
                origin={origin}
                isArabic={isArabic}
                isMobileOrTablet={true}
              />
            </>
          ) : (
            <div className="animate-pulse w-full mb-8">
              <div className="shopByBrands_cards_wrapper flex items-center gap-4 mb-4 overflow-hidden">
                <div className="shopByBrands_brands_card bg-white px-4 py-2 rounded-lg w-[990px] h-[150px]"></div>
                <div className="shopByBrands_brands_card bg-white px-4 py-2 rounded-lg flex w-[310px] h-[150px]"></div>
              </div>
              <div className="shopByBrands_cards_wrapper flex items-center gap-4 overflow-hidden">
                <div className="shopByBrands_brands_card bg-white px-4 py-2 rounded-lg flex w-[610px] h-[150px]"></div>
                <div className="shopByBrands_brands_card bg-white px-4 py-2 rounded-lg flex w-[320px] h-[150px]"></div>
                <div className="shopByBrands_brands_card bg-white px-4 py-2 rounded-lg flex w-[320px] h-[150px]"></div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Section 5 End */}

      {/* Section 6 Start */}
      <section
        className="section_6 xl:mb-14 mb-md-8 mb-4  relative bg-white md:bg-transparent py-4 md:py-0"
        data-section="8"
      >
        <div ref={section8Ref} className={`${containerClass}`} data-section="8">
          {isSection8Visible ? (
            <>
                <div className="">
                  <Link
                    prefetch={false}
                    scroll={false}
                    href={`${origin}/${lang}/${sec8Link}`}
                  >
                    <Image
                      alt={sec8Image}
                      title={sec8Image}
                      width={0}
                      height={0}
                      quality={100}
                      decoding="async"
                      data-nimg="1"
                      loading="lazy"
                      className="h-auto w-full mx-auto rounded-2xl mb-4"
                      src={sec8Image}
                      style={{ color: "transparent" }}
                      sizes="100vw"
                    />
                  </Link>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="headingHomeMobile">{sec8Heading}</h2>
                      <p className="md:paraHomeMain text-xs mt-1 md:mt-2 line-clamp-2">
                        {sec8Para}
                      </p>
                    </div>
                    <button className="btnPrimarySpecial transition-all duration-300 ease-in-out">
                      {sec8ButtonTitle}
                    </button>
                  </div>
                </div>
            </>
          ) : (
            <div className="animate-pulse w-full mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2 bg-white h-[400px] rounded-md"></div>
                <div className="bg-white w-full h-[400px] rounded-md"></div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Section 6 End */}

      {/* Section 7 Start */}
      <section
        ref={section9Ref}
        className="tamkeenSales_sec w-full xl:mb-10 mb-8 relative overflow-hidden"
        data-section="9"
      >
        {isSection9Visible ? (
          <>
            <ProductSliderComponent
              sliderHeading={Sec9Heading}
              buttonTitle={Sec9ButtonTitle}
              buttonLink={Sec9ButtonLink}
              productDataSlider={sec9Products}
              isArabic={isArabic}
              isMobileOrTablet={true}
              origin={origin}
            />
          </>
        ) : (
          <div className={`${containerClass}`}>
            <div className="animate-pulse">
              <div className="tamkeenSales_cardss grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 xl:gap-x-3 xl:gap-y-0 gap-x-4 gap-y-8 items-center justify-center h-[380px] md:h-[550px] lg:h-[440px] overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <div className="bg-white h-[380px] md:h-[550px] lg:h-[440px] rounded-2xl" key={i}></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
      {/* Section 7 End */}

      {/* Section 8 Start */}
      <section
        ref={section10Ref}
        className="bg-[#F2FAFF] xl:pb-8 lg:pb-5 pb-3 mb-8 relative overflow-hidden"
        data-section="10"
      >
        {isSection10Visible ? (
          <>
            <BadgeProductLoopComponent
              sliderHeading={Sec10Heading}
              buttonTitle={Sec10ButtonTitle}
              buttonLink={Sec10ButtonLink}
              productDataSlider={sec10Products}
              isArabic={isArabic}
              isMobileOrTablet={true}
              origin={origin}
            />
          </>
        ) : (
          <div className={`${containerClass}`}>
            <div className="animate-pulse">
              <div className="tamkeenSales_cardss grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 xl:gap-x-3 xl:gap-y-0 gap-x-4 gap-y-8 items-center justify-center h-[380px] md:h-[550px] lg:h-[440px] overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <div className="bg-white h-[380px] md:h-[550px] lg:h-[440px] rounded-2xl" key={i}></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
      {/* Section 8 End */}

      {/* Section 9 Start */}
      <section
        className="rounded-b-[3rem] xl:mb-14 md:mb-10 mb-8"
        data-section="11"
      >
        <div
          ref={section11Ref}
          data-section="11"
        >
          {isSection11Visible ? (
            <>
              <div className="main_banner flex gap-4 w-full">
                <div className="banner_slider w-full overflow-hidden">
                    <MainSliderMobile
                      data={sec11Slider}
                      lang={lang}
                      origin={origin}
                    />
                </div>
              </div>
            </>
          ) : (
            <div className="animate-pulse">
              <div className="banner_slider_top bg-white h-[212px] mb-4 rounded-2xl w-full"></div>
            </div>
          )}
        </div>
      </section>
      {/* Section 9 End */}

      {/* Section 10 Start */}
      <section
        ref={section12Ref}
        className="tamkeenSales_sec w-full xl:mb-10 mb-8 relative overflow-hidden"
        data-section="12"
      >
        {isSection12Visible ? (
          <>
            <ProductSliderComponent
              sliderHeading={Sec12Heading}
              buttonTitle={Sec12ButtonTitle}
              buttonLink={Sec12ButtonLink}
              productDataSlider={sec12Products}
              isArabic={isArabic}
              isMobileOrTablet={true}
              origin={origin}
            />
          </>
        ) : (
          <div className={`${containerClass}`}>
            <div className="animate-pulse">
              <div className="tamkeenSales_cardss grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 xl:gap-x-3 xl:gap-y-0 gap-x-4 gap-y-8 items-center justify-center h-[380px] md:h-[550px] lg:h-[440px] overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <div className="bg-white h-[380px] md:h-[550px] lg:h-[440px] rounded-2xl" key={i}></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
      {/* Section 10 End */}

      {/* Section 11 Start */}
      <section
        className="builtInAppliances_sec xl-mb-14 lg:mb-12 mb-8 relative"
        data-section="13"
      >
        <div
          ref={section13Ref}
          className={`${containerClass} relative`}
          data-section="13"
        >
          {isSection13Visible ? (
            <>
              <div
                className={`w-full flex ltr:flex-row rtl:flex-row-reverse items-center gap-4 overflow-hidden bg-center bg-no-repeat max-md:pt-56 max-md:pb-24 md:py-24 px-3 md:px-6 rounded-2xl bg-cover`}
                style={{
                  backgroundImage: sec13BgImage,
                }}
              >
                <div className="felx flex-col space-y-3 sm:w-auto w-full">
                    <div className="overflow-hidden rounded-2xl">
                        <Link
                            prefetch={false}
                            scroll={false}
                            href={`${origin}/${lang}/${sec13Link2}`}
                            aria-label={`${origin}/${lang}`}
                        >
                            <Image
                            alt="Built in Appliances"
                            title="Built in Appliances"
                            width={0}
                            height={0}
                            decoding="async"
                            loading="lazy"
                            sizes="100vw"
                            quality={100}
                            data-nimg="1"
                            className="h-auto w-[27rem] mx-auto rounded-2xl hover:scale-110 transform transition-transform duration-500 ease-in-out"
                            src={sec13Image2}
                            style={{ color: "transparent" }}
                            />
                        </Link>
                    </div>
                    <div className="overflow-hidden rounded-2xl">
                        <Link
                            prefetch={false}
                            scroll={false}
                            href={`${origin}/${lang}/${sec13Link3}`}
                            aria-label={`${origin}/${lang}`}
                        >
                            <Image
                            alt="Built in Appliances"
                            title="Built in Appliances"
                            width={0}
                            height={0}
                            decoding="async"
                            loading="lazy"
                            sizes="100vw"
                            quality={100}
                            data-nimg="1"
                            className="h-auto w-[27rem] mx-auto rounded-2xl hover:scale-110 transform transition-transform duration-500 ease-in-out"
                            src={sec13Image3}
                            style={{ color: "transparent" }}
                            />
                        </Link>
                    </div>
                </div>
                <div className="overflow-hidden rounded-2xl sm:w-auto md:w-auto">
                    <Link
                    prefetch={false}
                    scroll={false}
                    href={`${origin}/${lang}/${sec13Link1}`}
                    aria-label={`${origin}/${lang}`}
                    >
                        <Image
                            alt="Built in Appliances"
                            title="Built in Appliances"
                            width={0}
                            height={0}
                            decoding="async"
                            sizes="100vw"
                            quality={100}
                            loading="lazy"
                            data-nimg="1"
                            className="h-auto w-64 mx-auto rounded-2xl hover:scale-110 transform transition-transform duration-500 ease-in-out"
                            src={sec13Image1}
                            style={{ color: "transparent" }}
                        />
                    </Link>
                </div>
                <button className="btnPrimarySpecial absolute ltr:left-8 rtl:right-8 bottom-4 !py-[0.5rem] !px-[1.5rem]">
                    <Link
                    prefetch={false}
                    scroll={false}
                    href={`${origin}/${lang}/${sec13ButtonLink}`}
                    aria-label={`${origin}/${lang}`}
                    >
                    {sec13ButtonTitle}
                    </Link>
                </button>
              </div>
            </>
          ) : (
            <div className="animate-pulse">
              <div className="w-full flex sm:flex-row flex-col items-center gap-4 bg-center rounded-3xl sm:py-8 py-8 px-3 bg-white">
                <div className="rounded-3xl w-[220px] h-[240px] bg-white border-[#f0f1f2] border"></div>
                <div className="felx flex-col space-y-3">
                  <div className="rounded-3xl w-[310px] h-[120px] bg-white border-[#f0f1f2] border"></div>
                  <div className="rounded-3xl w-[310px] h-[120px] bg-white border-[#f0f1f2] border"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Section 11 End */}

      {/* Section 13 Start */}
      <section
        ref={section15Ref}
        className="tamkeenSales_sec w-full lg:mb-10 mb-8 relative overflow-hidden"
        data-section="15"
      >
        {isSection15Visible ? (
          <>
            <ProductSliderComponent
              sliderHeading={Sec15Heading}
              buttonTitle={Sec15ButtonTitle}
              buttonLink={Sec15ButtonLink}
              productDataSlider={sec15Products}
              isArabic={isArabic}
              isMobileOrTablet={true}
              origin={origin}
            />
          </>
        ) : (
          <div className={`${containerClass}`}>
            <div className="animate-pulse">
              <div className="tamkeenSales_cardss grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 xl:gap-x-3 xl:gap-y-0 gap-x-4 gap-y-8 items-center justify-center h-[380px] md:h-[550px] lg:h-[440px] overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <div className="bg-white h-[380px] md:h-[550px] lg:h-[440px] rounded-2xl" key={i}></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
      {/*Section 13 End */}

      {/* Section 14 Start */}
      <section
        className="cookingElegance_sec lg:mb-8 mb-6 relative bg-white py-4 lg:px-4"
        data-section="18"
      >
        <div
          ref={section18Ref}
          className={`${containerClass}`}
          data-section="18"
        >
          {isSection18Visible ? (
            <>
              <div className="flex items-center lg:flex-row md:flex-col flex-col-reverse gap-4">
                <div className="flex lg:flex-col lg:gap-0 gap-2 flex-row items-start justify-between w-full">
                  <div>
                    <h2 className="headingHomeMain lg:!text-[2.5rem] lg:!leading-[3.5rem] !text-[18px] !leading-[24px]">
                      {sec18Heading
                        .split(/،|,/)
                        .map((part: any, index: any, arr: any) => {
                          const comma: any = isArabic ? "،" : ",";
                          return (
                            <span key={index}>
                              {part.trim()}
                              {index < arr.length - 1 && comma}
                              {index < arr.length - 1 && <br />}
                            </span>
                          );
                        })}
                    </h2>
                    <p className="paraHomeMain mt-2 line-clamp-2 lg:!text-[18px] lg:!leading-[25px] !text-[11px] !leading-[15px]">
                      {sec18Paragraph}
                    </p>
                  </div>
                  <div className="lg:mt-8">
                    <button className="btnPrimarySpecial !rounded-2xl lg:!text-[18px] lg:!leading-[20px] !text-[11px] !leading-[15px] transition-all duration-300 ease-in-out text-nowrap">
                      <Link
                        prefetch={false}
                        scroll={false}
                        href={`${origin}/${lang}/${sec18ButtonLink}`}
                        aria-label={`${origin}/${lang}`}
                      >
                        {sec18ButtonTitle}
                      </Link>
                    </button>
                  </div>
                </div>
                <div className="w-full flex items-center justify-center md:gap-4 gap-2">
                  <div className="overflow-hidden rounded-md">
                    <Link
                      prefetch={false}
                      scroll={false}
                      href={`${origin}/${lang}/${sec18Link1}`}
                      aria-label={`${origin}/${lang}`}
                    >
                      <Image
                        alt="oven-stg-25FEB.webp"
                        title="oven-stg-25FEB.webp"
                        width={0}
                        height={0}
                        quality={100}
                        decoding="async"
                        data-nimg="1"
                        className="h-auto w-[300px]  mx-auto rounded-2xl hover:scale-110 transform transition-transform duration-500 ease-in-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                        src={sec18Image1}
                        style={{ color: "transparent" }}
                      />
                    </Link>
                  </div>
                  <div className="overflow-hidden rounded-md">
                    <Link
                      prefetch={false}
                      scroll={false}
                      href={`${origin}/${lang}/${sec18Link2}`}
                      aria-label={`${origin}/${lang}`}
                    >
                      <Image
                        alt="oven-stg-25FEB.webp"
                        title="oven-stg-25FEB.webp"
                        width={0}
                        height={0}
                        quality={100}
                        decoding="async"
                        data-nimg="1"
                        className="h-auto w-[300px] mx-auto rounded-2xl hover:scale-110 transform transition-transform duration-500 ease-in-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                        src={sec18Image2}
                        style={{ color: "transparent" }}
                      />
                    </Link>
                  </div>
                  <div className="overflow-hidden rounded-md">
                    <Link
                      prefetch={false}
                      scroll={false}
                      href={`${origin}/${lang}/${sec18Link3}`}
                      aria-label={`${origin}/${lang}`}
                    >
                      <Image
                        alt="oven-stg-25FEB.webp"
                        title="oven-stg-25FEB.webp"
                        width={0}
                        height={0}
                        quality={100}
                        decoding="async"
                        data-nimg="1"
                        className="h-auto w-[300px] mx-auto rounded-2xl hover:scale-110 transform transition-transform duration-500 ease-in-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                        src={sec18Image3}
                        style={{ color: "transparent" }}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="animate-pulse">
              <div className="flex items-center lg:flex-row flex-col gap-4">
                <div className="w-full lg:text-left text-center"></div>
                <div className="w-full flex items-center justify-center md:gap-4 gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white h-[250px] rounded-2xl w-[200px] border-[#f0f1f2] border"></div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Section 14 End */}

      {/* Section 15 Start */}
      <section
        ref={section16Ref}
        className="tamkeenSales_sec w-full lg:mb-10 mb-8 relative overflow-hidden"
        data-section="16"
      >
        {isSection16Visible ? (
          <>
            <ProductSliderComponent
              sliderHeading={Sec16Heading}
              buttonTitle={Sec16ButtonTitle}
              buttonLink={Sec16ButtonLink}
              productDataSlider={sec16Products}
              isArabic={isArabic}
              isMobileOrTablet={true}
              origin={origin}
            />
          </>
        ) : (
          <div className={`${containerClass}`}>
            <div className="animate-pulse">
              <div className="tamkeenSales_cardss grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 xl:gap-x-3 xl:gap-y-0 gap-x-4 gap-y-8 items-center justify-center h-[380px] md:h-[550px] lg:h-[440px] overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <div className="bg-white h-[380px] md:h-[550px] lg:h-[440px] rounded-2xl" key={i}></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
      {/* Section 15 End */}

      {/* Section 12 Start */}
      <section
        className="rounded-b-[3rem] xl:mb-14 md:mb-10 mb-8"
        data-section="14"
      >
        <div
          ref={section14Ref}
          data-section="14"
        >
          {isSection14Visible ? (
            <div className="main_banner flex gap-4 w-full">
              <div className="banner_slider w-full overflow-hidden">
                <MainSliderMobile
                    data={sec14Slider}
                    lang={lang}
                    origin={origin}
                />
              </div>
            </div>
          ) : (
            <div className="animate-pulse">
              <div className="banner_slider_top bg-white h-[212px] mb-4 rounded-2xl w-full"></div>
            </div>
          )}
        </div>
      </section>
      {/* Section 12 End */}

      {/* Section 16 Start */}
      <section
        ref={section17Ref}
        className="tamkeenSales_sec w-full lg:mb-10 mb-8 relative overflow-hidden"
        data-section="17"
      >
        {isSection17Visible ? (
          <>
            <ProductSliderComponent
              sliderHeading={Sec17Heading}
              buttonTitle={Sec17ButtonTitle}
              buttonLink={Sec17ButtonLink}
              productDataSlider={sec17Products}
              isArabic={isArabic}
              isMobileOrTablet={true}
              origin={origin}
            />
          </>
        ) : (
          <div className={`${containerClass}`}>
            <div className="animate-pulse">
              <div className="tamkeenSales_cardss grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 xl:gap-x-3 xl:gap-y-0 gap-x-4 gap-y-8 items-center justify-center h-[380px] md:h-[550px] lg:h-[440px] overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <div className="bg-white h-[380px] md:h-[550px] lg:h-[440px] rounded-2xl" key={i}></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
      {/* Section 16 End */}

      <section
        className={`${containerClass} bg-[#F3F9FC] border-t border-b border-primary py-3`}
      >
        <div data-section="18">
          <TamkeenServices isArabic={isArabic} userAgent={""} />
        </div>
      </section>
      <Newsletter isMobileOrTablet={true} isArabic={isArabic} />
      {/* <div className="pb-20 md:pb-0"></div> */}
    </>
  );
}