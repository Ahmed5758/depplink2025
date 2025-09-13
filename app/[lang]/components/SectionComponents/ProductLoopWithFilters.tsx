"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  FreeMode,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import "../NewHomePageComp/scrollBar.css";
import { get } from "../../api/ApiCalls";
import { getCookie } from "cookies-next";
import { NewMedia } from "../../api/Api";

const ProductComponent = dynamic(
  () => import("../NewHomePageComp/product_component"),
  { ssr: true }
);

interface TagChild {
  id: number;
  tag_id: number;
  name: string;
  name_arabic: string;
  sort: number;
  status: number;
  icon?: string;
  image_link_app?: string;
}

interface Tag {
  id: number;
  name: string;
  name_arabic: string;
  slug: string;
  sort: number | null;
  icon: string | null;
  image_link_app: string;
  status: string;
  childs: TagChild[];
}

interface Brand {
  id: number;
  name: string;
  name_arabic: string;
  slug: string;
  status: number;
  show_in_front: number;
  brand_media_image: { id: number; image: string; title: string; title_arabic: string };
}

interface ProductTag {
  id: number;
  tag_id: number;
  status: number;
  name: string;
  name_arabic: string;
  pivot: { product_id: string; sub_tag_id: string };
}

interface Product {
  id: number;
  name: string;
  name_arabic: string;
  slug: string;
  sku: string;
  price: number;
  sale_price: number;
  flash_sale_price: number | null;
  quantity: string;
  feature_image: string;
  featured_image: { id: number; image: string };
  brand: { id: number; name: string; name_arabic: string; brand_media_image: { id: number; image: string } };
  promotional_price: string;
  tags?: ProductTag[];  // Updated to match API structure
}

interface ProductLoopFilterComponentProps {
  origin: string;
  isArabic: boolean;
  isMobileOrTablet: boolean;
  productDataSlider: { products?: { data: Product[] }; tags?: Tag[]; brands?: Brand[] };
  gtmColumnItemListId?: string;
  gtmColumnItemListName?: string;
  sliderHeading: string;
  buttonTitle: string;
  buttonLink: string;
  filters: Tag[];
}

export default function ProductLoopFilterComponent({
  origin,
  isArabic,
  isMobileOrTablet,
  productDataSlider,
  gtmColumnItemListId,
  gtmColumnItemListName,
  sliderHeading,
  buttonTitle,
  buttonLink,
  filters = [],
}: ProductLoopFilterComponentProps) {
  const router = useRouter();
  const productData = productDataSlider?.products?.data || [];
  const brands = productDataSlider?.brands || [];
  const [ProExtraData, setProExtraData] = useState<any>({});
  // CHANGED: Track selections by group for per-category OR + cross-category AND
  const [selectedFiltersByGroup, setSelectedFiltersByGroup] = useState<{ [key: number]: string[] }>({});
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [dropdowns, setDropdowns] = useState<{ [key: string]: boolean }>({});
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const containerClass = isMobileOrTablet ? "container" : "px-20";
  const containerClassMobile = isMobileOrTablet
    ? "px-4 sm:px-6"
    : "px-10 md:px-16 lg:px-20";

  // IMPROVED: Simpler normalization to avoid false positives
  const normalizeTag = (tagName: string) => {
    return tagName
      .replace(/[""]/g, '')  // Remove quotes
      .replace(/hz$/i, '')   // Remove Hz suffix
      .replace(/ - \d+hz?/i, '')  // Remove range like " - 60Hz"
      .trim()
      .toLowerCase();
  };

  // Fetch extra product data
  useEffect(() => {
    if (productData.length) {
      (async () => {
        const ids = productData.map((item: Product) => item.id);
        const city = getCookie("selectedCity");
        try {
          const response: any = await get(
            `productextradatamulti-regional-new/${ids.join(",")}/${city}`
          );
          if (
            response &&
            typeof response === "object" &&
            response.data &&
            typeof response.data === "object"
          ) {
            setProExtraData(response.data);
          } else {
            console.warn("Unexpected API response format:", response);
            setProExtraData({});
          }
        } catch (error) {
          console.error("Error fetching extra product data:", error);
          setProExtraData({});
        }
      })();
    }
  }, [productData]);

  // Toggle dropdown for a specific filter or brand
  const toggleDropdown = (id: string) => {
    setDropdowns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // UPDATED: Handle filter change by group (tag_id)
  const handleFilterChange = (filterName: string, filterNameArabic: string, tagId: number) => {
    const nameToUse = isArabic ? filterNameArabic : filterName;
    const normalizedName = normalizeTag(nameToUse);
    setSelectedFiltersByGroup((prev) => {
      const currentGroup = prev[tagId] || [];
      const newGroup = currentGroup.includes(normalizedName)
        ? currentGroup.filter((f) => f !== normalizedName)
        : [...currentGroup, normalizedName];
      const newState = { ...prev, [tagId]: newGroup };
      return newState;
    });
  };

  // Handle brand selection
  const handleBrandChange = (brandName: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName)
        ? prev.filter((b) => b !== brandName)
        : [...prev, brandName]
    );
  };

  // UPDATED: Group-based filtering (OR within group, AND across groups)
  const filteredProducts = productData.filter((product: Product) => {
    const productTagNames = (product.tags?.map(tag => normalizeTag(tag.name)) || [])
      .filter(Boolean);

    // Check tag match: For each group, check if ANY selected filter in that group matches
    const allGroupsMatch = Object.entries(selectedFiltersByGroup).every(([groupIdStr, groupFilters]) => {
      const groupId = parseInt(groupIdStr);
      const groupMatch = groupFilters.length === 0 || groupFilters.some((filter) => productTagNames.includes(filter));
      return groupMatch;
    });

    const tagMatch = Object.keys(selectedFiltersByGroup).length === 0 || allGroupsMatch;

    const brandMatch =
      selectedBrands.length === 0 ||
      selectedBrands.includes(isArabic ? product.brand.name_arabic : product.brand.name);

    const overallMatch = tagMatch && brandMatch;
    return overallMatch;
  });

  // Construct image URL
  const getImageSrc = (image?: string) => {
    if (!image) return "/images/categoryNew/placeholder.png";
    if (/^https?:\/\//.test(image)) return image;
    return `${NewMedia}${image}`;
  };

  return (
    <section className="relative mb-8" dir={isArabic ? "rtl" : "ltr"}>
      <div className={containerClass}>
        <div className="flex justify-between items-start mb-5">
          <h2 className="headingHomeMain">{sliderHeading}</h2>
          {buttonLink && buttonTitle && (
            <button
              className="text-primary text-sm md:text-xl font-medium underline px-1.5 bg-[#EBEBEB] py-1 md:shadow-none rounded-md shadow-sm text-nowrap"
              onClick={() =>
                router.push(buttonLink.startsWith("http") ? buttonLink : `/${buttonLink}`)
              }
            >
              {buttonTitle}
            </button>
          )}
        </div>

        {/* Filter and Brand Buttons */}
        <div className="tamkeenSales_btns flex items-center justify-start gap-x-6 py-3 w-full mb-4 flex-wrap">
          {/* Tag Filters */}
          {filters.map((filter) => (
            <div key={filter.id} className="relative">
              <button
                onClick={() => toggleDropdown(`filter-${filter.id}`)}
                className="bestProButton w-fit whitespace-nowrap px-4 py-2 text-primary fill-primary border-gray hover:text-white hover:fill-white hover:bg-primary flex items-center justify-between gap-3 lg:gap-5"
              >
                <span>{isArabic ? filter.name_arabic : filter.name}</span>
                <svg
                  height="12"
                  viewBox="0 0 24 24"
                  width="12"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`fill-current transform transition duration-150 ease-in-out ${
                    dropdowns[`filter-${filter.id}`] ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="m2.58579 7.58579c.78104-.78105 2.04738-.78105 2.82842 0l6.58579 6.58581 6.5858-6.58581c.781-.78105 2.0474-.78105 2.8284 0 .7811.78104.7811 2.04738 0 2.82841l-8 8c-.781.7811-2.0474.7811-2.8284 0l-8.00001-8c-.78105-.78103-.78105-2.04737 0-2.82841z"
                  />
                </svg>
              </button>
              {dropdowns[`filter-${filter.id}`] && (
                <div className="absolute top-full left-0 z-30 w-max bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] p-4">
                  <ul className="space-y-3">
                    {filter.childs.map((child) => {
                      const childName = isArabic ? child.name_arabic : child.name;
                      const normalizedChild = normalizeTag(childName);
                      const currentGroup = selectedFiltersByGroup[child.tag_id] || [];
                      const isChecked = currentGroup.includes(normalizedChild);
                      return (
                        <li key={child.id} className="flex items-center gap-3">
                          <label
                            htmlFor={`filter-${child.id}`}
                            className="inline-flex justify-center items-center w-5 h-5 rounded border border-gray-300 peer-checked:border-primary cursor-pointer transition-all duration-200"
                          >
                            <input
                              type="checkbox"
                              id={`filter-${child.id}`}
                              className="hidden peer"
                              checked={isChecked}
                              onChange={() => handleFilterChange(child.name, child.name_arabic, child.tag_id)}
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
                                d="M12.5029 0.569855C12.7684 0.569955 13.0232 0.675132 13.2109 0.862823C13.3986 1.05052 13.5038 1.3054 13.5039 1.57083C13.5039 1.83623 13.3985 2.09109 13.2109 2.27884L5.20898 9.2769C5.11608 9.3701 5.00632 9.4452 4.88477 9.4956C4.76325 9.5461 4.63254 9.5718 4.50098 9.5718C4.36962 9.5718 4.2395 9.546 4.11816 9.4956C4.02717 9.4579 3.94204 9.4066 3.86621 9.3443L0.792969 6.77786C0.70008 6.68492 0.62646 6.57407 0.576172 6.45267C0.52595 6.33129 0.5 6.20121 0.5 6.06985C0.50001 5.93848 0.52594 5.80843 0.576172 5.68704C0.62647 5.56562 0.70005 5.4548 0.792969 5.36185C0.885938 5.26888 0.9967 5.19537 1.11816 5.14505C1.23955 5.09477 1.36959 5.06892 1.50098 5.06888C1.63247 5.06888 1.76328 5.09473 1.88477 5.14514C2.00604 5.19533 2.11613 5.26904 2.20898 5.36185L4.50195 7.65482L11.7949 0.862823C11.9827 0.675263 12.2375 0.569855 12.5029 0.569855Z"
                                fill="#004B7A"
                                stroke="#004B7A"
                                strokeWidth="0.5"
                              />
                            </svg>
                          </label>
                          <span className="sm:text-sm text-xs text-primary">
                            {childName}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          ))}
          {/* Brand Filter */}
          {brands.length > 0 && (
            <div className="relative">
              <button
                onClick={() => toggleDropdown("brand")}
                className="bestProButton w-fit whitespace-nowrap px-4 py-2 text-primary fill-primary border-gray hover:text-white hover:fill-white hover:bg-primary flex items-center justify-between gap-3 lg:gap-5"
              >
                <span>{isArabic ? "العلامة التجارية" : "Brand"}</span>
                <svg
                  height="12"
                  viewBox="0 0 24 24"
                  width="12"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`fill-current transform transition duration-150 ease-in-out ${
                    dropdowns["brand"] ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="m2.58579 7.58579c.78104-.78105 2.04738-.78105 2.82842 0l6.58579 6.58581 6.5858-6.58581c.781-.78105 2.0474-.78105 2.8284 0 .7811.78104.7811 2.04738 0 2.82841l-8 8c-.781.7811-2.0474.7811-2.8284 0l-8.00001-8c-.78105-.78103-.78105-2.04737 0-2.82841z"
                  />
                </svg>
              </button>
              {dropdowns["brand"] && (
                <div className="absolute top-full left-0 z-30 w-max bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] p-4">
                  <ul className="space-y-3">
                    {brands.map((brand: Brand) => (
                      <li key={brand.id} className="flex items-center gap-3">
                        <label
                          htmlFor={`brand-${brand.id}`}
                          className="inline-flex justify-center items-center w-5 h-5 rounded border border-gray-300 peer-checked:border-primary cursor-pointer transition-all duration-200"
                        >
                          <input
                            type="checkbox"
                            id={`brand-${brand.id}`}
                            className="hidden peer"
                            checked={selectedBrands.includes(isArabic ? brand.name_arabic : brand.name)}
                            onChange={() => handleBrandChange(isArabic ? brand.name_arabic : brand.name)}
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
                              d="M12.5029 0.569855C12.7684 0.569955 13.0232 0.675132 13.2109 0.862823C13.3986 1.05052 13.5038 1.3054 13.5039 1.57083C13.5039 1.83623 13.3985 2.09109 13.2109 2.27884L5.20898 9.2769C5.11608 9.3701 5.00632 9.4452 4.88477 9.4956C4.76325 9.5461 4.63254 9.5718 4.50098 9.5718C4.36962 9.5718 4.2395 9.546 4.11816 9.4956C4.02717 9.4579 3.94204 9.4066 3.86621 9.3443L0.792969 6.77786C0.70008 6.68492 0.62646 6.57407 0.576172 6.45267C0.52595 6.33129 0.5 6.20121 0.5 6.06985C0.50001 5.93848 0.52594 5.80843 0.576172 5.68704C0.62647 5.56562 0.70005 5.4548 0.792969 5.36185C0.885938 5.26888 0.9967 5.19537 1.11816 5.14505C1.23955 5.09477 1.36959 5.06892 1.50098 5.06888C1.63247 5.06888 1.76328 5.09473 1.88477 5.14514C2.00604 5.19533 2.11613 5.26904 2.20898 5.36185L4.50195 7.65482L11.7949 0.862823C11.9827 0.675263 12.2375 0.569855 12.5029 0.569855Z"
                              fill="#004B7A"
                              stroke="#004B7A"
                              strokeWidth="0.5"
                            />
                          </svg>
                        </label>
                        <span className="sm:text-sm text-xs text-primary">
                          {isArabic ? brand.name_arabic : brand.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        {!isMobileOrTablet && (
          <>
            <button
              ref={prevRef}
              className="absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer fill-white p-2.5 left-1 md:p-3 md:left-7 bg-primary rounded-full"
            >
              <svg
                height="22"
                width="22"
                viewBox="0 0 24 24"
                className={`fill-current ${isArabic ? "-rotate-90" : "rotate-90"}`}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="m2.58579 7.58579c.78104-.78105 2.04738-.78105 2.82842 0l6.58579 6.58581 6.5858-6.58581c.781-.78105 2.0474-.78105 2.8284 0 .7811.78104.7811 2.04738 0 2.82841l-8 8c-.781.7811-2.0474.7811-2.8284 0l-8.00001-8c-.78105-.78103-.78105-2.04737 0-2.82841z"
                />
              </svg>
            </button>
            <button
              ref={nextRef}
              className="absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer fill-white p-2.5 right-1 md:p-3 md:right-7 bg-primary rounded-full"
            >
              <svg
                height="22"
                width="22"
                viewBox="0 0 24 24"
                className={`fill-current ${isArabic ? "rotate-90" : "-rotate-90"}`}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="m2.58579 7.58579c.78104-.78105 2.04738-.78105 2.82842 0l6.58579 6.58581 6.5858-6.58581c.781-.78105 2.0474-.78105 2.8284 0 .7811.78104.7811 2.04738 0 2.82841l-8 8c-.781.7811-2.0474.7811-2.8284 0l-8.00001-8c-.78105-.78103-.78105-2.04737 0-2.82841z"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Product Slider */}
      <div className={containerClassMobile}>
        <Swiper
          spaceBetween={16}
          slidesPerView={5}
          breakpoints={{
            320: { slidesPerView: 2.2, spaceBetween: 10 },
            640: { slidesPerView: 2.2, spaceBetween: 10 },
            768: { slidesPerView: 2.2, spaceBetween: 12 },
            1024: { slidesPerView: 4, spaceBetween: 14 },
            1280: { slidesPerView: 5, spaceBetween: 16 },
          }}
          autoHeight
          centeredSlides={false}
          autoplay={{
            delay: 15000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={false}
          loop={filteredProducts.length > 3}
          mousewheel={{
            forceToAxis: true,
            releaseOnEdges: true,
            sensitivity: 2,
            eventsTarget: ".swiper-wrapper",
          }}
          scrollbar={{
            draggable: true,
            hide: !isMobileOrTablet,
          }}
          freeMode
          modules={[Autoplay, Navigation, Pagination, FreeMode, Scrollbar, Mousewheel]}
          onBeforeInit={(swiper) => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          className="swiperProductSlider !pb-4"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: Product, index: number) => (
              <SwiperSlide key={product.id}>
                <div className="relative h-full">
                  <ProductComponent
                    productData={product}
                    lang={isArabic ? "ar" : "en"}
                    isMobileOrTablet={isMobileOrTablet}
                    origin={origin}
                    ProExtraData={ProExtraData?.[product.id]}
                    gtmColumnItemListId={gtmColumnItemListId}
                    gtmColumnItemListName={gtmColumnItemListName}
                  />
                  {index < filteredProducts.length - 1 && (
                    <span className="absolute top-1/2 right-0 transform -translate-y-1/2 h-[80%] w-px bg-gray-300 opacity-30"></span>
                  )}
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="flex flex-col items-center w-full">
                <p className="text-sm font-medium text-center">
                  {isArabic ? "لا توجد منتجات متاحة" : "No products available"}
                </p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </section>
  );
}