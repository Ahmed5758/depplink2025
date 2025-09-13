"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import dynamic from "next/dynamic";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { getDictionary } from "../dictionaries";
import Swal from "sweetalert2";
import { useRouter } from "next-nprogress-bar";
import { NewMedia } from "../api/Api";
import { post } from "../api/ApiCalls";
import { object } from "prop-types";

// Import Images
const MobileHeader = dynamic(() => import("../components/MobileHeader"), {
  ssr: true,
});

const FilterVertical = dynamic(
  () => import("../components/SectionComponents/FilterVertical"),
  {
    ssr: true,
  }
);

const MobileFilterNew = dynamic(
  () => import("../components/SectionComponents/MobileFilterNew"),
  {
    ssr: true,
  }
);

const FilterHorizontal = dynamic(
  () => import("../components/SectionComponents/FilterHorizontal"),
  {
    ssr: true,
  }
);

const ProductLoop = dynamic(
  () => import("../components/NewHomePageComp/ProductLoop"),
  {
    ssr: true,
  }
);

const ProductLoopList = dynamic(
  () => import("../components/NewHomePageComp/productListLoop"),
  {
    ssr: true,
  }
);

const Pagination = dynamic(() => import("../components/NewPagination"), {
  ssr: true,
});

export default function SubCategoryNew({
  params,
  searchParams,
}: {
  params: { lang: string; slug: string; data: any; devicetype: any };
  searchParams: any;
}) {
  const router = useRouter();
  const [dict, setDict] = useState<any>([]);
  const [CatData, setCatData] = useState<any>(params?.data);
  const [brandData, setBrandData] = useState<any>(params?.data?.productData?.brands);
  const [loaderStatus, setLoaderStatus] = useState<any>(false);
  const [currentPage, setcurrentPage] = useState<any>(
    params?.data?.productData?.products?.current_page
  );
  const [BrandfilterHide, setBrandfilterHide] = useState<any>(false);
  const [selectedbrands, setselectedbrands] = useState<any>({});
  const [filterHide, setFilterHide] = useState<any>(false);
  const [selectedcats, setselectedcats] = useState<any>({});
  const [RatingfilterHide, setRatingfilterHide] = useState<any>(false);
  const [selectedrating, setselectedrating] = useState<any>({});
  const [selectedtags, setselectedtags] = useState<any>({});
  const [sort, setsort] = useState<any>(false);
  const [products, setproducts] = useState<any>([]);
  const [view, setview] = useState<any>("grid");
  const [min, setMin] = useState<any>(params?.data?.productData?.min || 0); // Adjust default as needed
  const [max, setMax] = useState<any>(params?.data?.productData?.max || 0); // Adjust default as needed
  const SortingProduct = [
    { value: "", label: params?.lang == "ar" ? "الأكثر تطابقاً" : "Relevance" },
    {
      value: "sale_price-asc",
      label:
        params?.lang == "ar"
          ? "السعر (من الأقل إلى الأعلى)"
          : "Price (Low to High)",
    },
    {
      value: "sale_price-desc",
      label:
        params?.lang == "ar"
          ? "السعر (من الأعلى إلى الأقل)"
          : "Price (Hight to Low)",
    },
  ];
  useEffect(() => {
    if (!params?.devicetype) {
      router.refresh();
    }
    googleGTMList();
  }, [params]);
  function calculateTimeLeft(endTime: any) {
    const now: any = new Date();
    const end: any = new Date(endTime);
    const difference: any = end - now;

    if (difference <= 0) {
      return { expired: true };
    }

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    };
  }

  function detectPlatform() {
    if (window.Android) return "Android-WebView";
    if (window.webkit?.messageHandlers?.iosBridge) return "iOS-WebView";
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) return "Android-Mobile-WebView";
    if (/iPad|iPhone|iPod/.test(userAgent)) return "iOS-Mobile-WebView";
    return "Web";
  }
  const googleGTMList = () => {
    // Push to GTM's dataLayer
    const productDataGTM = params?.data?.productData?.products?.data;
    if (
      typeof window !== "undefined" &&
      window.dataLayer &&
      productDataGTM?.length
    ) {
      // Clear previous ecommerce object
      window.dataLayer.push({ ecommerce: null });
      const totalPrice = productDataGTM.reduce(
        (
          sum: number,
          item: {
            flash_sale_price?: number;
            sale_price?: number;
            price: number;
          }
        ) => {
          const itemPrice =
            item.flash_sale_price ?? item.sale_price ?? item.price;
          return sum + (itemPrice || 0);
        },
        0
      );
      // Push GTM-compatible event
      window.dataLayer.push({
        event: "view_item_list",
        value: totalPrice,
        currency: "SAR",
        platform: detectPlatform(),
        item_list_name: isArabic
          ? params?.data?.category?.name_arabic
          : params?.data?.category?.name,
        item_list_id: String(params?.data?.category?.id ?? ""), // Added item_list_id
        ecommerce: {
          items: productDataGTM.map((item: any, index: number) => {
            const getOriginalPrice = () => {
              if (!item?.flash_sale_price && !item?.sale_price)
                return item?.price;
              return item?.price;
            };
            const getDiscountedPrice = () => {
              let salePrice =
                item?.sale_price > 0 ? item?.sale_price : item?.price;
              if (item?.promotional_price > 0) {
                salePrice = Math.max(
                  0,
                  Number(salePrice) - Number(item?.promotional_price)
                );
              }
              if (item?.flash_sale_expiry && item?.flash_sale_price) {
                const timer = calculateTimeLeft(item?.flash_sale_expiry);
                if (!timer?.expired) {
                  salePrice = item?.flash_sale_price;
                }
              }

              return salePrice;
            };

            const discountPrice = item?.price - getDiscountedPrice();
            return {
              item_id: item?.sku,
              item_name: isArabic ? item?.name_arabic : item?.name,
              price: Number(getDiscountedPrice()),
              shelf_price: Number(getOriginalPrice()),
              discount: Number(discountPrice ?? 0),
              currency: "SAR",
              item_brand: isArabic
                ? item?.brand?.name_arabic
                : item?.brand?.name,
              item_image_link: `${NewMedia}${item?.featured_image?.image}`,
              item_link: `${origin}/${isArabic ? "ar" : "en"}/product/${
                item?.slug
              }`,
              item_availability: "in stock",
              index: index,
              quantity: 1,
              id: item?.sku,
            };
          }),
        },
      });
    }
  };
  useEffect(() => {
    const handlePopState = () => {
      // Called on browser back/forward
      router.refresh();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);
  useEffect(() => {
    (async () => {
      const translationdata = await getDictionary(params?.lang);
      setDict(translationdata);
      if (searchParams?.brand) {
        setBrandfilterHide(true);
        var br = searchParams?.brand.split(",");
        var brandnames: any = {};
        for (var b = 0; b < br.length; b++) {
          if (!brandnames[br[b]]) {
            brandnames[br[b]] = true;
          }
        }
        setselectedbrands(brandnames);
        if (params?.devicetype == "mobile") {
          window.scrollTo(0, 250);
        } else {
          window.scrollTo(0, 350);
        }
      }

      if (searchParams?.cats) {
        setFilterHide(true);
        var cats = searchParams?.cats.split(",");
        var scats: any = {};
        for (var c = 0; c < cats.length; c++) {
          if (!scats[cats[c]]) {
            scats[cats[c]] = true;
          }
        }
        setselectedcats(scats);
      }

      if (searchParams?.rating) {
        setRatingfilterHide(true);
        var rates = searchParams?.rating.split(",");
        var srate: any = {};
        for (var r = 0; r < rates.length; r++) {
          if (!srate[rates[r]]) {
            srate[rates[r]] = true;
          }
        }
        setselectedrating(srate);
        if (params?.devicetype == "mobile") {
          window.scrollTo(0, 250);
        } else {
          window.scrollTo(0, 350);
        }
      }

      if (searchParams?.tags) {
        var tagdata = searchParams?.tags.split(",");
        var shitems: any = {};
        //var maintag = itemsToShowTag
        for (var t = 0; t < tagdata.length; t++) {
          if (!shitems[tagdata[t]]) shitems[tagdata[t]] = true;
          for (
            let index = 0;
            index < CatData?.productData?.tags?.length;
            index++
          ) {
            const element = CatData?.productData?.tags[index];
            const relatetype = element?.childs?.filter(
              (item: any) => item?.name == tagdata[t]
            );
          }
        }
        setselectedtags({ ...shitems });
        if (params?.devicetype == "mobile") {
          window.scrollTo(0, 250);
        } else {
          window.scrollTo(0, 350);
        }
      }
    })();
    // var prodata = products
    // if (params?.data?.productData?.products?.current_page == 1)
    //   prodata = []
    // prodata = prodata.concat(params?.data?.productData?.products?.data)
    var prodata = params?.data?.productData?.products?.data;
    setproducts([...prodata]);
    setLoaderStatus(false);
    if (typeof window !== "undefined") {
      var load = true;
      window.onscroll = function () {
        var elem: any = document.getElementById("loadmore");
        if (elem?.offsetTop - 700 <= window?.pageYOffset && load) {
          load = false;
          elem.click();
          setTimeout(function () {
            load = true;
          }, 1500);
        }
      };
    }
    if (searchParams?.notifications?.length) {
      notificationCount();
    }
  }, [params]);
  const notificationCount = () => {
    if (searchParams?.notifications?.length) {
      var data = {
        id: searchParams?.notifications,
        desktop: true,
      };
      post("notificationsCounts", data).then((responseJson: any) => {
        if (responseJson?.success) {
        }
      });
    }
  };
  const filter = () => {
    setLoaderStatus(true);
    var filterdata: any = {};
    if (
      currentPage &&
      currentPage != params?.data?.productData?.products?.current_page
    )
      filterdata["page"] = currentPage;
    // if (min)
    //   filterdata['min'] = min
    // if (max)
    //   filterdata['max'] = max
    if (Object.keys(selectedcats).length)
      filterdata["cats"] = Object.keys(selectedcats).join(",");
    if (Object.keys(selectedbrands).length)
      filterdata["brand"] = Object.keys(selectedbrands).join(",");
    if (Object.keys(selectedrating).length)
      filterdata["rating"] = Object.keys(selectedrating).join(",");
    if (Object.keys(selectedtags).length)
      filterdata["tags"] = Object.keys(selectedtags).join(",");
    if (sort) filterdata["sort"] = sort;
    const result = "?" + new URLSearchParams(filterdata).toString();
    if (
      Object.keys(filterdata).length == 3 &&
      Object.keys(searchParams).length <= 3 &&
      filterdata["page"] &&
      currentPage == params?.data?.productData?.products?.current_page &&
      min == params?.data?.productData?.min &&
      max == params?.data?.productData?.max
    )
      return false;
    router.push(`/${params?.lang}/category-new/${params?.slug}${result}`, {
      scroll: false,
    });
    router.refresh();
  };

  useEffect(() => {
    if (sort != searchParams?.sort && sort) filter();
  }, [sort]);

  // useEffect(() => {
  //   if (pricefilter) {
  //     setcurrentPage(1)
  //     filter()
  //   }
  // }, [pricefilter])

  useEffect(() => {
    if (currentPage != params?.data?.productData?.products?.current_page)
      filter();
  }, [currentPage]);
  const isMobileOrTablet =
    params?.devicetype === "mobile" || params?.devicetype === "tablet"
      ? true
      : false;
  const containerClass = isMobileOrTablet ? "container" : "px-20";
  const isArabic = params.lang === "ar" ? true : false;

  // Const For Bottom Text
  const titleHeadingText =
    params?.data?.productData?.products?.total +
    (isArabic ? " منتج" : " Products");
  const subHeadingOneText = isArabic ? "الكل" : "All";
  const subHeadingTwoText = isArabic ? "باب واحد" : "One Door";
  const subHeadingThreeText = isArabic ? "بابين" : "Two Doors";
  const subHeadingFourText = isArabic ? "باب جانب باب" : "Side-by-Side Door";
  const subHeadingFiveText = isArabic ? "ترتيب حسب" : "Sort by";
  const applyFiltersText = isArabic ? "تطبيق الفلاتر" : "Apply Filters";
  const searchInEnableText = isArabic
    ? "ابــحــث في تمكين ...."
    : "Search in Tamkeen....";
  const locationText = isArabic
    ? "التوصيل إلى: حي مشرفة, جدة, المملكة العربية السعودية"
    : "Delivery to: Mishrifah District, Jeddah, Saudi Arabia";
  const helloText = isArabic ? "مرحبا" : "Hello";
  const imgAbsoluteTextOne = isArabic ? "سعة: 430 لتر" : "Capacity: 430 Liters";
  const imgAbsoluteTextTwo = isArabic ? "عرض: 83.9 سم" : "Width: 83.9 cm";
  const imgAbsoluteTextThree = isArabic
    ? "إرتفاع: 176.3 سم"
    : "Height: 176.3 cm";
  const imgAbsoluteTextFour = isArabic ? "عمق: 63.7 سم" : "Depth: 63.7 cm";
  const subOneText = isArabic ? "هدية" : "Gift";
  const subTwoText = isArabic ? "غير متوفر" : "Not Available";
  const subThreeText = isArabic ? "الأكثر مبيعا" : "Best Seller";
  const subFourText = isArabic ? "عروض ميجا" : "Mega Offers";
  const subFiveText = isArabic
    ? "التسليم خلال 24 ساعة"
    : "Delivery within 24 hours";
  const brandNameText = isArabic ? "جنرال سوبريم" : "General Supreme";
  const brandDetailText = isArabic
    ? "ثلاجة باب بجانب باب 15.2قدم ,430 لتر ,انفرتر."
    : "Side-by-side refrigerator, 15.2 cu.ft, 430 liters, inverter";
  const brandCodeText = isArabic ? "كود:" : "Code:";
  const brandCodeNoText = isArabic ? "GS806SSI" : "GS806SSI";
  const priceText = isArabic ? "659" : "659";
  const priceDiscountedText = isArabic ? "1499" : "1499";
  const priceSaveText = isArabic ? "وفر 800" : "Save 800";
  const priceAdditionalDiscountText = isArabic
    ? "السعر بعد خصم الاسترداد النقدي"
    : "Price Included Additional Discount";
  const buyNowText = isArabic
    ? "إشتري الأن وإدفع لاحقا "
    : "Buy now and pay later";
  const ratingText = isArabic ? "4.7 ( تقيم )" : "4.7 ( Rating )";
  const timerText = isArabic ? "09 : 31 : 07" : "09 : 31 : 07";
  const btnCheckoutText = isArabic ? "شراء الأن " : "Checkout Now";
  const btndiscoverText = isArabic ? "اكتشف المزيد" : "Discover More";

  const [isImageLoaded, setImageLoaded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(brandCodeNoText);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Copy Text Popup
  const handleCopyPopup = async (type: any) => {
    if (type === brandCodeNoText) {
      const toast = Swal.mixin({
        toast: true,
        position: isArabic ? "top-start" : "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      toast.fire({
        icon: "success",
        title: "Copied to clipboard!",
        padding: "10px 20px",
        background: "#20831E",
        color: "#FFFFFF",
      });
    }
  };
  const [sortPopup, setSortPopup] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filterModal, setFilterModal] = useState(false);

  const handleFilterChange = (filterName: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterName)
        ? prev.filter((f) => f !== filterName)
        : [...prev, filterName]
    );
  };

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  return (
    <>
      {isMobileOrTablet ? (
        <>
          <MobileHeader
            type="Secondary"
            lang={params?.lang}
            dict={dict}
            pageTitle={
              isArabic
                ? CatData?.category?.name_arabic
                : CatData?.category?.name
            }
            onClick={() => setFilterModal(true)}
          />
        </>
      ) : null}

      <div className={`${isMobileOrTablet ? "mt-32" : "mt-24"}`}></div>

      {/* Section 1 */}
      {!isMobileOrTablet ? (
        <section className={`filter_sec relative`}>
          <div className="xl:px-20 lg:px-10 px-4 py-5">
            <FilterHorizontal
              isArabic={isArabic}
              isMobileOrTablet={isMobileOrTablet}
              devicetype={params?.devicetype}
              tags={CatData?.productData?.tags}
              selectedtags={selectedtags}
              onChangetags={(tagchild: any) => {
                var tagnames = selectedtags;
                if (!tagnames[tagchild.name]) {
                  tagnames[tagchild.name] = true;
                } else {
                  delete tagnames[tagchild.name];
                  window.scrollTo(0, 0);
                }
                setselectedtags({ ...tagnames });
                setcurrentPage(1);
                filter();
              }}
              brands={CatData?.productData?.brands}
              selectedbrands={selectedbrands}
              setBrandData={(id: any, name: string) => {
                var bdata = selectedbrands;
                if (!bdata[name]) {
                  bdata[name] = true;
                } else {
                  delete bdata[name];
                }
                setselectedbrands({ ...bdata });
                setcurrentPage(1);
                filter();
              }}
              setClear={() => {
                setselectedbrands({});
                setselectedrating({});
                setselectedcats({});
                setcurrentPage(1);
                setselectedtags({});
                // setFilterMobile(false)
                window.scrollTo(0, 0);
                router.push(`/${params?.lang}/category-new/${params?.slug}`, {
                  scroll: true,
                });
                router.refresh();
              }}
            />
          </div>
        </section>
      ) : null}

      {/* Section 2 */}
      <section
        className={`relative md:mt-16 mt-4 ${
          isMobileOrTablet ? "mb-24" : "mb-8"
        }`}
      >
        <div className="xl:px-20 lg:px-10 px-4 flex md:flex-row flex-col items-start lg:gap-10 gap-4">
          {!isMobileOrTablet ? (
            <div className={`${!isMobileOrTablet ?'w-[24%]' : 'w-full' }`}>
              <FilterVertical
                isArabic={isArabic}
                isMobileOrTablet={isMobileOrTablet}
                devicetype={params?.devicetype}
                tags={CatData?.productData?.tags}
                selectedtags={selectedtags}
                onChangetags={(tagchild: any) => {
                  var tagnames = selectedtags;
                  if (!tagnames[tagchild.name]) {
                    tagnames[tagchild.name] = true;
                  } else {
                    delete tagnames[tagchild.name];
                    window.scrollTo(0, 0);
                  }
                  setselectedtags({ ...tagnames });
                  setcurrentPage(1);
                  filter();
                }}
                brands={CatData?.productData?.brands}
                selectedbrands={selectedbrands}
                setBrandData={(id: any, name: string) => {
                  var bdata = selectedbrands;
                  if (!bdata[name]) {
                    bdata[name] = true;
                  } else {
                    delete bdata[name];
                  }
                  setselectedbrands({ ...bdata });
                  setcurrentPage(1);
                  filter();
                }}
                setClear={() => {
                  setselectedbrands({});
                  setselectedrating({});
                  setselectedcats({});
                  setcurrentPage(1);
                  setselectedtags({});
                  // setFilterMobile(false)
                  window.scrollTo(0, 0);
                  router.push(`/${params?.lang}/category-new/${params?.slug}`, {
                    scroll: true,
                  });
                  router.refresh();
                }}
              />
            </div>
          ) : null}
          <div className={`${!isMobileOrTablet ?'w-[76%]' : 'w-full' } pb-2 overflow-hidden`}>
            {isMobileOrTablet ? (
              <div className="mb-5">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="relative inline-block">
                    <button
                      onClick={() => setSortPopup(!sortPopup)}
                      className="bestProButton shadow-md !text-base flex gap-2 items-center w-fit whitespace-nowrap selected lg:!py-2.5 !py-1 !px-4 !text-primary !border-0 hover:!text-white hover:bg-primary transition-all"
                    >
                      {subHeadingFiveText}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M11.0039 1.36035V11.6592L12.582 10.2119L12.6191 10.1777L12.6533 10.2148L13.3291 10.9512L13.3623 10.9883L13.3262 11.0225L10.4883 13.625L10.4541 13.6562L10.4199 13.625L7.58203 11.0225L7.5459 10.9883L7.5791 10.9512L8.25488 10.2148L8.28906 10.1777L8.32617 10.2119L9.9043 11.6602V1.36035H11.0039ZM3.53418 0.992188L6.37207 3.5957L6.40918 3.62891L6.375 3.66602L5.69922 4.40332L5.66504 4.44043L5.62793 4.40625L4.0498 2.95703V13.5508H2.9502V2.95703L1.37207 4.40625L1.33496 4.44043L1.30078 4.40332L0.625 3.66602L0.591797 3.62891L0.62793 3.5957L3.4668 0.992188L3.5 0.961914L3.53418 0.992188Z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="0.1"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                      >
                        <path
                          d="M0 5L5 0L10 5H0Z"
                          fill="currentColor"
                          fillOpacity="0.7"
                        />
                      </svg>
                    </button>

                    {sortPopup && (
                      <div
                        className="absolute top-full left-0 mt-2 z-30 w-max bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] p-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ul className="space-y-3">
                          {SortingProduct.map((filter) => (
                            <li
                              key={filter?.value}
                              className="flex items-center gap-3"
                            >
                              <label
                                htmlFor={filter?.label
                                  .toLowerCase()
                                  .replace(" ", "_")}
                                className="inline-flex justify-center items-center w-5 h-5 rounded border border-gray-300 peer-checked:border-primary cursor-pointer transition-all duration-200"
                              >
                                <input
                                  type="checkbox"
                                  id={filter?.label
                                    .toLowerCase()
                                    .replace(" ", "_")}
                                  className="hidden peer"
                                  checked={sort == filter?.value}
                                  onChange={() => setsort(filter?.value)}
                                />
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="10"
                                  viewBox="0 0 14 10"
                                  fill="none"
                                  className="hidden peer-checked:block"
                                >
                                  <path
                                    d="M12.5029 0.569855C12.7684 0.569955 13.0232 0.675132 13.2109 0.862823C13.3986 1.05052 13.5038 1.3054 13.5039 1.57083C13.5039 1.83623 13.3985 2.09109 13.2109 2.27884L5.20898 9.2769C5.11608 9.3701 5.00632 9.4452 4.88477 9.4956C4.76325 9.5461 4.63254 9.5718 4.50098 9.5718C4.36962 9.5718 4.2395 9.546 4.11816 9.4956C4.02717 9.4579 3.94204 9.4066 3.86621 9.3443L0.792969 6.77786C0.70008 6.68492 0.62646 6.57407 0.576172 6.45267C0.52595 6.33129 0.5 6.20121 0.5 6.06985C0.50001 5.93848 0.52594 5.80843 0.576172 5.68704C0.62647 5.56562 0.70005 5.4548 0.792969 5.36185C0.885938 5.26888 0.9967 5.19537 1.11816 5.14505C1.23955 5.09477 1.36959 5.06892 1.50098 5.06888C1.63247 5.06888 1.76328 5.09473 1.88477 5.14505C2.00604 5.19533 2.11613 5.26904 2.20898 5.36185L4.50195 7.65482L11.7949 0.862823C11.9827 0.675263 12.2375 0.569855 12.5029 0.569855Z"
                                    fill="#004B7A"
                                    stroke="#004B7A"
                                    strokeWidth="0.5"
                                  />
                                </svg>
                              </label>
                              <span className="sm:text-sm text-xs text-primary">
                                {filter?.label}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setFilterModal(!filterModal);
                    }}
                    className="bestProButton bg-white shadow-md !text-sm !rounded-[.625rem] !font-semibold flex gap-2 items-center !w-fit whitespace-nowrap selected !py-1 !px-4 !text-[000] !border-0 hover:text-white hover:fill-white hover:bg-primary"
                  >
                    {applyFiltersText}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="16"
                      viewBox="0 0 15 16"
                      fill="none"
                    >
                      <path
                        d="M14.1111 1.38889H0.888916L5.94447 8.51851V14.6111L9.05558 12.537V8.51851L14.1111 1.38889Z"
                        stroke="currentcolor"
                        stroke-opacity="0.7"
                        stroke-width="1.18056"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="headingHomeMain !text-sm text-nowrap order-0">
                    {titleHeadingText}
                  </h2>
                  {/* Pagination Section */}
                  {params?.data?.productData?.products && (
                    <>
                      {params?.data?.productData?.products?.last_page > 1 && (
                        <Pagination
                          setCurrentPage={(newpage) => {
                            setLoaderStatus(true);
                            window.scrollTo(0, 0);
                            setcurrentPage(newpage);
                          }}
                          isMobileOrTablet={isMobileOrTablet}
                          isArabic={isArabic}
                          currentPage={
                            params?.data?.productData?.products?.current_page
                          }
                          lastPage={
                            params?.data?.productData?.products?.last_page
                          }
                        />
                      )}
                    </>
                  )}
                </div>
                <hr className="w-full h-px border border-gray my-2.5 opacity-40"></hr>
              </div>
            ) : (
              <div className="mb-10">
                <div className="flex items-start justify-between xl:gap-10 lg-gap-5 gap-4 p-2">
                  <h2 className="headingHomeMain lg:!text-[1.375rem] !text-sm text-nowrap self-center">
                    {titleHeadingText}
                  </h2>
                  <div className="flex items-center 2xl:w-[36.25rem] lg:w-[30.25rem] w-full overflow-x-auto hide_scrollbar pb-1">
                    <div className="flex flex-nowrap gap-2 min-w-max">
                      <button
                        className={`bestProButton flex gap-2 items-center w-fit whitespace-nowrap 
      !text-xs !rounded-2xl !py-1 !px-4 md:!font-bold border-gray 
      ${
        Object.keys(selectedcats).length === 0
          ? "!text-white fill-white bg-primary"
          : "text-primary hover:text-white hover:fill-white hover:bg-primary"
      }`}
                        onClick={() => {
                          setFilterHide(false);
                          setselectedcats({});
                          setcurrentPage(1);
                          filter();
                        }}
                      >
                        {subHeadingOneText}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: CatData?.category?.icon,
                          }}
                        />
                      </button>

                      {CatData?.category?.child.map(
                        (child: any, tc: number) => (
                          <div
                            key={tc}
                            className="flex items-center gap-2 shrink-0"
                          >
                            <div className="h-[20px] w-px mx-2.5 border border-gray opacity-20"></div>
                            <button
                              className={`bestProButton flex gap-2 items-center w-fit whitespace-nowrap 
          !text-xs !rounded-2xl !py-1 !px-4 md:!font-bold border-gray h-full 
          ${
            selectedcats[child?.name]
              ? "!text-white fill-white bg-primary"
              : "text-primary hover:text-white hover:fill-white hover:bg-primary"
          }`}
                              onClick={() => {
                                const bdata: any = {};
                                if (!bdata[child?.name]) {
                                  bdata[child?.name] = true;
                                } else {
                                  delete bdata[child?.name];
                                }
                                setselectedcats({ ...bdata });
                                setcurrentPage(1);
                                filter();
                              }}
                            >
                              {isArabic ? child?.name_arabic : child?.name}
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: child?.icon,
                                }}
                              />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-full py-1 px-2 shadow-md">
                      <button
                        className={`bestProButton w-fit whitespace-nowrap test !border-0 lg:!py-2 !py-1 !px-2 
                          ${
                            view === "grid"
                              ? "selected !text-white !fill-white bg-primary" // active state
                              : "text-primary hover:text-white hover:bg-primary" // default + hover
                          }`}
                        onClick={() => setview("grid")}
                      >
                        <svg
                          width="18"
                          height="18"
                          className="lg:w-[18px] lg:h-[18px] w-4 h-4 shrink-0"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.5"
                            y="1"
                            width="7"
                            height="7"
                            stroke="#004B7A"
                            fill="currentColor"
                          />
                          <rect
                            x="10.5"
                            y="1"
                            width="7"
                            height="7"
                            stroke="#004B7A"
                            fill="currentColor"
                          />
                          <rect
                            x="0.5"
                            y="11"
                            width="7"
                            height="7"
                            stroke="#004B7A"
                            fill="currentColor"
                          />
                          <rect
                            x="10.5"
                            y="11"
                            width="7"
                            height="7"
                            stroke="#004B7A"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                      <button
                        className={`bestProButton w-fit whitespace-nowrap test !border-0 lg:!py-2 !py-1 !px-2 
                          ${
                            view === "list"
                              ? "selected !text-white !fill-white bg-primary" // active state
                              : "text-primary hover:text-white hover:bg-primary" // default + hover
                          }`}
                        onClick={() => setview("list")}
                      >
                        <svg
                          width="18"
                          height="18"
                          className="lg:w-[18px] lg:h-[18px] w-4 h-4 shrink-0"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            y="0.5"
                            width="18"
                            height="18"
                            rx="4"
                            fill="white"
                          />
                          <rect
                            x="0.5"
                            y="1"
                            width="17"
                            height="7"
                            stroke="#004B7A"
                          />
                          <rect
                            x="0.5"
                            y="11"
                            width="17"
                            height="7"
                            stroke="#004B7A"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="relative inline-block">
                      <button
                        onClick={() => setSortPopup(!sortPopup)}
                        className="bestProButton shadow-md !text-base flex gap-2 items-center w-fit whitespace-nowrap selected lg:!py-2.5 !py-1 !px-4 !text-primary !border-0 hover:!text-white hover:bg-primary transition-all"
                      >
                        {subHeadingFiveText}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M11.0039 1.36035V11.6592L12.582 10.2119L12.6191 10.1777L12.6533 10.2148L13.3291 10.9512L13.3623 10.9883L13.3262 11.0225L10.4883 13.625L10.4541 13.6562L10.4199 13.625L7.58203 11.0225L7.5459 10.9883L7.5791 10.9512L8.25488 10.2148L8.28906 10.1777L8.32617 10.2119L9.9043 11.6602V1.36035H11.0039ZM3.53418 0.992188L6.37207 3.5957L6.40918 3.62891L6.375 3.66602L5.69922 4.40332L5.66504 4.44043L5.62793 4.40625L4.0498 2.95703V13.5508H2.9502V2.95703L1.37207 4.40625L1.33496 4.44043L1.30078 4.40332L0.625 3.66602L0.591797 3.62891L0.62793 3.5957L3.4668 0.992188L3.5 0.961914L3.53418 0.992188Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0.1"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="5"
                          viewBox="0 0 10 5"
                          fill="none"
                        >
                          <path
                            d="M0 5L5 0L10 5H0Z"
                            fill="currentColor"
                            fillOpacity="0.7"
                          />
                        </svg>
                      </button>

                      {sortPopup && (
                        <div
                          className="absolute top-full left-0 mt-2 z-30 w-max bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] p-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ul className="space-y-3">
                            {SortingProduct.map((filter) => (
                              <li
                                key={filter?.value}
                                className="flex items-center gap-3"
                              >
                                <label
                                  htmlFor={filter?.label
                                    .toLowerCase()
                                    .replace(" ", "_")}
                                  className="inline-flex justify-center items-center w-5 h-5 rounded border border-gray-300 peer-checked:border-primary cursor-pointer transition-all duration-200"
                                >
                                  <input
                                    type="checkbox"
                                    id={filter?.label
                                      .toLowerCase()
                                      .replace(" ", "_")}
                                    className="hidden peer"
                                    checked={sort == filter?.value}
                                    onChange={() => setsort(filter?.value)}
                                  />
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="10"
                                    viewBox="0 0 14 10"
                                    fill="none"
                                    className="hidden peer-checked:block"
                                  >
                                    <path
                                      d="M12.5029 0.569855C12.7684 0.569955 13.0232 0.675132 13.2109 0.862823C13.3986 1.05052 13.5038 1.3054 13.5039 1.57083C13.5039 1.83623 13.3985 2.09109 13.2109 2.27884L5.20898 9.2769C5.11608 9.3701 5.00632 9.4452 4.88477 9.4956C4.76325 9.5461 4.63254 9.5718 4.50098 9.5718C4.36962 9.5718 4.2395 9.546 4.11816 9.4956C4.02717 9.4579 3.94204 9.4066 3.86621 9.3443L0.792969 6.77786C0.70008 6.68492 0.62646 6.57407 0.576172 6.45267C0.52595 6.33129 0.5 6.20121 0.5 6.06985C0.50001 5.93848 0.52594 5.80843 0.576172 5.68704C0.62647 5.56562 0.70005 5.4548 0.792969 5.36185C0.885938 5.26888 0.9967 5.19537 1.11816 5.14505C1.23955 5.09477 1.36959 5.06892 1.50098 5.06888C1.63247 5.06888 1.76328 5.09473 1.88477 5.14505C2.00604 5.19533 2.11613 5.26904 2.20898 5.36185L4.50195 7.65482L11.7949 0.862823C11.9827 0.675263 12.2375 0.569855 12.5029 0.569855Z"
                                      fill="#004B7A"
                                      stroke="#004B7A"
                                      strokeWidth="0.5"
                                    />
                                  </svg>
                                </label>
                                <span className="sm:text-sm text-xs text-primary">
                                  {filter?.label}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <hr className="w-full h-px border border-gray my-3 opacity-40"></hr>
              </div>
            )}
            {view === "list" ? (
              <div className="tamkeenSales_cardss relative grid grid-cols-1 xl:gap-10 gap-5 items-start justify-center mb-10 p-1">
                <ProductLoopList
                  productData={(products?.length
                    ? products?.slice(0, 5)
                    : params?.data?.productData?.products?.data
                  )?.slice(0, 5)}
                  lang={isArabic}
                  isMobileOrTablet={isMobileOrTablet}
                  origin={origin}
                />
              </div>
            ) : (
              <div className="tamkeenSales_cardss relative grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-y-10 lg:gap-x-3 gap-3 items-start justify-center">
                <ProductLoop
                  productData={
                    products?.length
                      ? products
                      : params?.data?.productData?.products?.data
                  }
                  lang={isArabic}
                  isMobileOrTablet={isMobileOrTablet}
                  origin={origin}
                />
              </div>
            )}
            {isMobileOrTablet ? null : (
              <hr className="w-2/3 h-px border border-gray my-3 opacity-40 mx-auto"></hr>
            )}
            {/* Pagination Section */}
            {!isMobileOrTablet ? (
              <>
                {params?.data?.productData?.products && (
                  <>
                    {params?.data?.productData?.products?.last_page > 1 && (
                      <Pagination
                        setCurrentPage={(newpage) => {
                          setLoaderStatus(true);
                          window.scrollTo(0, 0);
                          setcurrentPage(newpage);
                        }}
                        isMobileOrTablet={isMobileOrTablet}
                        isArabic={isArabic}
                        currentPage={
                          params?.data?.productData?.products?.current_page
                        }
                        lastPage={
                          params?.data?.productData?.products?.last_page
                        }
                      />
                    )}
                  </>
                )}
              </>
            ) : null}
          </div>
        </div>
      </section>

      {/* Mobile Filter Modal */}
      <section
        className={`fixed inset-0 bg-white z-50 p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out
    ${filterModal ? "translate-x-0" : "-translate-x-full"}`}
      >
        <MobileFilterNew
          filterModal={filterModal}
          setFilterModal={setFilterModal}
          tags={CatData?.productData?.tags}
          isArabic={isArabic}
          devicetype={params?.devicetype}
          isMobileOrTablet={isMobileOrTablet}
          selectedtags={selectedtags}
          onChangetags={(tagchild: any) => {
            var tagnames = selectedtags;
            if (!tagnames[tagchild.name]) {
              tagnames[tagchild.name] = true;
            } else {
              delete tagnames[tagchild.name];
              window.scrollTo(0, 0);
            }
            setselectedtags({ ...tagnames });
            setcurrentPage(1);
            filter();
          }}
          brands={CatData?.productData?.brands}
          selectedbrands={selectedbrands}
          setBrandData={(id: any, name: string) => {
            var bdata = selectedbrands;
            if (!bdata[name]) {
              bdata[name] = true;
            } else {
              delete bdata[name];
            }
            setselectedbrands({ ...bdata });
            setcurrentPage(1);
            filter();
          }}
          setClear={() => {
            setselectedbrands({});
            setselectedrating({});
            setselectedcats({});
            setcurrentPage(1);
            setselectedtags({});
            // setFilterMobile(false)
            window.scrollTo(0, 0);
            router.push(`/${params?.lang}/category-new/${params?.slug}`, {
              scroll: true,
            });
            router.refresh();
          }}
        />
      </section>

      {/* Section 3 */}
      {/* <section className="px-20 py-10">
        <Accordion isArabic={isArabic} isMobileOrTablet={isMobileOrTablet} />
      </section> */}
    </>
  );
}
