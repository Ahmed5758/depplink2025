"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import GlobalContext from "../GlobalContext";
import { getCartCount } from "../cartstorage/cart";
import React, { useState, useEffect, useContext } from "react";

export default function MobileFooterNew(props: any) {
  const router = useRouter();
  const path = usePathname();
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const isArabic = props?.lang == "ar" ? "ar" : "en";
  const [cartCount, setCartCount] = useState(0);
  const { updateCart, setUpdateCart } = useContext(GlobalContext);
  const isMobileOrTablet =
    props?.devicetype === "mobile" || props?.devicetype === "tablet"
      ? true
      : false;
  const containerClass = isMobileOrTablet ? "container" : "px-[4.8rem]";

  //   Active Footer Nav Item
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const index = navItems.findIndex((item) => item.href == `${origin}${path}`);
    if (index !== -1) setActiveIndex(index);
  }, [path]);

  const DataLocalStorage = async () => {
    setCartCount(getCartCount());
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cartData") {
        setUpdateCart((prev: any) => (prev == 0 ? 1 : 0));
      }
    };

    const handleCustomCartChange = (e: CustomEvent) => {
      setUpdateCart((prev: any) => (prev == 0 ? 1 : 0));
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartDataChanged", handleCustomCartChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartDataChanged", handleCustomCartChange);
    };
  }, []);

  useEffect(() => {
    DataLocalStorage();
  }, [updateCart]);

  //   Home  Svg Icon
  const homeIcon: any = (
    <svg
      width="35"
      height="24"
      viewBox="0 0 41 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36.0213 9.29194C30.9637 6.6491 28.1281 5.16736 23.0706 2.52452C21.349 1.62446 19.1873 1.63578 17.4772 2.55282L4.92578 9.28486C3.34989 10.1297 2.39258 11.6185 2.39258 13.2219V19.511C2.39258 22.0696 4.78995 24.1429 7.74863 24.1429H33.2508C36.2095 24.1429 38.6069 22.0696 38.6069 19.511V13.2573C38.6069 11.6355 37.6266 10.1297 36.0213 9.29194ZM36.6121 14.3611C36.5139 15.3136 35.9771 16.1612 35.1802 16.7712C34.3832 17.3826 33.3245 17.7491 32.179 17.7491H29.3463L29.3086 22.3852C29.3086 22.7192 29.0681 23.0192 28.7146 23.1424C28.6852 23.1551 28.6508 23.165 28.6164 23.1749L28.5903 23.182L27.5986 23.1749C27.5609 23.165 27.5266 23.1551 27.4938 23.1424C27.4644 23.1325 27.4382 23.1225 27.412 23.107C27.3335 23.0744 27.2647 23.0291 27.2058 22.9796C27.0225 22.8268 26.9129 22.6159 26.9129 22.3852L26.9505 15.6957L27.1567 15.6758H32.318C32.8515 15.6758 33.3654 15.4777 33.7303 15.1367C34.0985 14.7885 34.272 14.3371 34.2229 13.8658C34.1361 13.0209 33.2541 12.3643 32.21 12.3643H8.61921C8.08573 12.3643 7.57189 12.5554 7.20697 12.9007C6.83877 13.2488 6.66203 13.7031 6.71113 14.1715C6.80113 15.0135 7.68808 15.6758 8.72885 15.6758H24.3977L24.4157 15.8584L24.4239 19.5945C24.4239 21.1116 23.3128 22.4532 21.727 22.9796C21.457 23.0702 21.1674 23.1381 20.8712 23.1777L18.662 23.1806L18.6326 23.1707C18.6064 23.1608 18.5802 23.1551 18.5573 23.1409C18.2234 23.0107 18.0009 22.7192 18.0009 22.3937V21.972C18.0009 21.5206 18.4296 21.1469 18.9517 21.1469H20.233C21.2247 21.1469 22.0282 20.4521 22.0282 19.5945V17.7491H8.61921C7.41316 17.7491 6.25293 17.3075 5.43798 16.5334C4.61158 15.7537 4.2172 14.7333 4.32684 13.6818C4.52158 11.7784 6.47221 10.2939 8.75994 10.2939H32.3213C33.5274 10.2939 34.6876 10.7326 35.5025 11.5053C36.3289 12.2879 36.7217 13.3054 36.6121 14.3611ZM14.6118 13.9663C14.6118 14.4899 14.1193 14.9145 13.5154 14.9145C12.9116 14.9145 12.419 14.4885 12.419 13.9663C12.419 13.4441 12.9116 13.0181 13.5154 13.0181C14.1193 13.0181 14.6118 13.4441 14.6118 13.9663ZM11.7006 13.9663C11.7006 14.4899 11.208 14.9145 10.6042 14.9145C10.0004 14.9145 9.50779 14.4885 9.50779 13.9663C9.50779 13.4441 10.0004 13.0181 10.6042 13.0181C11.208 13.0181 11.7006 13.4441 11.7006 13.9663Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.5154 14.9145C14.1193 14.9145 14.6118 14.4899 14.6118 13.9663C14.6118 13.4441 14.1193 13.0181 13.5154 13.0181C12.9116 13.0181 12.419 13.4441 12.419 13.9663C12.419 14.4885 12.9116 14.9145 13.5154 14.9145Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.6042 14.9145C11.208 14.9145 11.7006 14.4899 11.7006 13.9663C11.7006 13.4441 11.208 13.0181 10.6042 13.0181C10.0004 13.0181 9.50779 13.4441 9.50779 13.9663C9.50779 14.4885 10.0004 14.9145 10.6042 14.9145Z"
        fill="currentColor"
      />
      <path
        d="M35.1802 16.7712C35.9771 16.1612 36.5139 15.3136 36.6121 14.3611C36.7217 13.3054 36.3289 12.2879 35.5025 11.5053C34.6876 10.7326 33.5274 10.2939 32.3213 10.2939H8.75994C6.47221 10.2939 4.52158 11.7784 4.32684 13.6818C4.2172 14.7333 4.61158 15.7537 5.43798 16.5334C6.25293 17.3075 7.41316 17.7491 8.61921 17.7491H22.0282V19.5945C22.0282 20.4521 21.2247 21.1469 20.233 21.1469H18.9517C18.4296 21.1469 18.0009 21.5206 18.0009 21.972V22.3937C18.0009 22.7192 18.2234 23.0107 18.5573 23.1409C18.5731 23.1507 18.5906 23.1565 18.6085 23.1624C18.6165 23.165 18.6245 23.1676 18.6326 23.1707L18.662 23.1806L20.8712 23.1777C21.1674 23.1381 21.457 23.0702 21.727 22.9796C23.3128 22.4532 24.4239 21.1116 24.4239 19.5945L24.4157 15.8584L24.3977 15.6758H8.72885C7.68808 15.6758 6.80113 15.0135 6.71113 14.1715C6.66203 13.7031 6.83877 13.2488 7.20697 12.9007C7.57189 12.5554 8.08573 12.3643 8.61921 12.3643H32.21C33.2541 12.3643 34.1361 13.0209 34.2229 13.8658C34.272 14.3371 34.0985 14.7885 33.7303 15.1367C33.3654 15.4777 32.8515 15.6758 32.318 15.6758H27.1567L26.9505 15.6957L26.9129 22.3852C26.9129 22.6159 27.0225 22.8268 27.2058 22.9796C27.2647 23.0291 27.3335 23.0744 27.412 23.107C27.4382 23.1225 27.4644 23.1325 27.4938 23.1424C27.5266 23.1551 27.5609 23.165 27.5986 23.1749L28.5903 23.182L28.6164 23.1749C28.6508 23.165 28.6852 23.1551 28.7146 23.1424C29.0681 23.0192 29.3086 22.7192 29.3086 22.3852L29.3463 17.7491H32.179C33.3245 17.7491 34.3832 17.3826 35.1802 16.7712Z"
        fill="currentColor"
      />
      <path
        d="M17.0381 1.73413C19.0194 0.671645 21.5071 0.65943 23.501 1.7019C28.5582 4.34455 31.3939 5.82585 36.4512 8.46851L36.7939 8.66089C38.4673 9.66963 39.5352 11.3697 39.5352 13.2576V19.5115C39.5349 22.7047 36.5911 25.071 33.251 25.071H7.74902C4.40888 25.071 1.46417 22.7048 1.46387 19.5115V13.2214C1.46405 11.2306 2.65217 9.4504 4.4873 8.46655L17.0381 1.73413Z"
        stroke="currentColor"
        stroke-width="1.85714"
      />
    </svg>
  );

  //   Heart  Svg Icon
  const categoriesIcon: any = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.902778"
        y="0.902778"
        width="9.75"
        height="9.75"
        stroke="currentColor"
        stroke-width="1.80556"
      />
      <rect
        x="15.3471"
        y="0.902778"
        width="9.75"
        height="9.75"
        stroke="currentColor"
        stroke-width="1.80556"
      />
      <rect
        x="0.902778"
        y="15.3471"
        width="9.75"
        height="9.75"
        stroke="currentColor"
        stroke-width="1.80556"
      />
      <rect
        x="15.3471"
        y="15.3471"
        width="9.75"
        height="9.75"
        stroke="currentColor"
        stroke-width="1.80556"
      />
    </svg>
  );

  //   Cart  Svg Icon
  const cartIcon: any = (
    <svg
      width="30"
      height="26"
      viewBox="0 0 30 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1_21779)">
        <path
          d="M9.04883 22.564C9.6936 22.564 10.2344 23.1006 10.2344 23.7847C10.2344 24.4688 9.69361 25.0054 9.04883 25.0054C8.40421 25.0052 7.86328 24.4686 7.86328 23.7847C7.8633 23.1007 8.40422 22.5642 9.04883 22.564Z"
          fill="white"
          stroke="currentColor"
          stroke-width="1.06122"
        />
        <path
          d="M19.4756 22.564C20.1204 22.564 20.6611 23.1006 20.6611 23.7847C20.6611 24.4688 20.1204 25.0054 19.4756 25.0054C18.831 25.0052 18.29 24.4686 18.29 23.7847C18.2901 23.1007 18.831 22.5642 19.4756 22.564Z"
          fill="white"
          stroke="currentColor"
          stroke-width="1.06122"
        />
        <path
          d="M1.62305 2.51575C1.73982 2.50445 1.85767 2.51677 1.96973 2.55188L5.09668 3.53235C5.23395 3.57509 5.35905 3.65165 5.46094 3.75403C5.53719 3.8307 5.59906 3.9203 5.64355 4.01868L5.68262 4.12024V4.12122L9.14062 15.2941H20.3896L22.3711 6.2052H8.0498L8.02246 6.11829L7.52637 4.56165L7.47461 4.39856H23.5273C23.6587 4.39951 23.788 4.43044 23.9062 4.4884C24.0237 4.54598 24.1269 4.629 24.209 4.73157L24.2705 4.81262C24.3268 4.89762 24.3683 4.99236 24.3936 5.09192C24.4271 5.2245 24.4301 5.36304 24.4033 5.49719V5.50012L21.9854 16.3956C21.9404 16.5986 21.8276 16.7797 21.666 16.9083C21.505 17.0365 21.3054 17.1031 21.1006 17.0988V17.0997H9.37012L7.58789 18.6085C7.56013 18.6641 7.5441 18.7254 7.54395 18.7882C7.54385 18.8567 7.5611 18.924 7.59375 18.9835C7.62646 19.0431 7.67389 19.0929 7.73047 19.1281C7.78697 19.1631 7.85128 19.1824 7.91699 19.1847H20.7646C21.0009 19.1847 21.2273 19.2807 21.3936 19.4503C21.5597 19.6199 21.6523 19.8493 21.6523 20.088C21.6523 20.3267 21.5597 20.5561 21.3936 20.7257C21.2273 20.8954 21.0009 20.9913 20.7646 20.9913H8.04102L7.91113 20.9943C7.60812 20.9915 7.30807 20.9253 7.03027 20.7999C6.71303 20.6567 6.43291 20.4391 6.21289 20.1661L6.21191 20.1642C5.90209 19.7631 5.7392 19.2649 5.75098 18.755C5.76277 18.2451 5.94832 17.7551 6.27637 17.3693L6.28223 17.3624L6.38184 17.2609L6.39062 17.2521L7.57715 16.2628L4.12012 5.12024L1.44531 4.28528C1.2189 4.21429 1.03014 4.0541 0.919922 3.84192C0.80975 3.62978 0.786432 3.38169 0.855469 3.15247C0.924523 2.92346 1.08032 2.73128 1.28906 2.61829C1.39256 2.56233 1.50622 2.52705 1.62305 2.51575Z"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="0.25"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_21779">
          <rect
            width="24.4082"
            height="23.3469"
            fill="white"
            transform="translate(0.407227 2.18884)"
          />
        </clipPath>
      </defs>
    </svg>
  );
  //   Cart  Svg Icon
  const generalSupreme: any = (
    <svg
      width="40"
      height="25"
      viewBox="0 0 42 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.839 4.61175L41.59 0.119263H23.7173L21.9619 4.61175H39.839Z"
        fill="currentColor"
      />
      <path
        d="M39.8968 4.70016H21.834L23.6602 0.00427246H41.7451L39.8968 4.70016ZM22.0905 4.52329H39.7775L41.4621 0.203243H23.7751L22.0905 4.52329Z"
        fill="currentColor"
      />
      <path
        d="M4.73938 13.0262C4.73938 8.37449 8.48456 4.60275 13.1053 4.60275H20.3967L22.1478 0.105835H13.3264C13.2733 0.105835 13.2158 0.105835 13.1628 0.105835C6.10125 0.105835 0.357422 5.88948 0.357422 13.0041C0.357422 20.1186 6.10125 25.9023 13.1628 25.9023C13.9852 25.9023 14.7856 25.8227 15.5638 25.6724L17.7658 20.0214C16.4349 20.9234 14.8298 21.454 13.1009 21.454C8.48014 21.454 4.73496 17.6823 4.73496 13.0306L4.73938 13.0262Z"
        fill="currentColor"
      />
      <path
        d="M13.1629 25.9998C6.04832 25.9998 0.255859 20.1676 0.255859 12.9999C0.255859 5.83228 6.04389 0 13.1629 0C13.1939 0 13.2248 0 13.2602 0C13.269 0 13.2735 0 13.2823 0H13.3309H22.2982L20.4676 4.69589H13.1098C8.55103 4.69589 4.8412 8.43227 4.8412 13.022C4.8412 17.6118 8.55102 21.3482 13.1054 21.3482C14.7547 21.3482 16.351 20.8574 17.7129 19.9332L17.9782 19.7519L15.6391 25.7567L15.586 25.7655C14.7901 25.9203 13.9765 25.9954 13.1629 25.9954V25.9998ZM13.1629 0.207822C6.15886 0.207822 0.459242 5.94725 0.459242 13.0043C0.459242 20.0615 6.15886 25.8009 13.1629 25.8009C13.9411 25.8009 14.7238 25.7301 15.4932 25.5842L17.5626 20.2737C16.2228 21.1094 14.6884 21.5516 13.1054 21.5516C8.43606 21.5516 4.64219 17.7268 4.64219 13.0265C4.64219 8.32614 8.44048 4.50133 13.1054 4.50133H20.3306L22.002 0.207822H13.3928H13.3221C13.3 0.207822 13.2735 0.207822 13.2514 0.207822C13.2204 0.207822 13.1894 0.207822 13.1629 0.207822Z"
        fill="currentColor"
      />
      <path
        d="M34.9176 25.9114L36.6686 21.4189H18.7959L17.0449 25.9114H34.9176Z"
        fill="currentColor"
      />
      <path
        d="M34.9799 26H16.917L18.7387 21.3307H36.8016L34.9799 26ZM17.1735 25.8232H34.8605L36.5451 21.5031H18.8581L17.1735 25.8232Z"
        fill="currentColor"
      />
      <path
        d="M37.3273 10.7231H19.4502L21.2057 15.2156H35.5852L37.3318 19.7125L39.0783 15.2156L37.3273 10.7231Z"
        fill="currentColor"
      />
      <path
        d="M37.3326 19.9862L35.5197 15.3169H21.1402L19.3096 10.621H37.3989L39.1897 15.2152L37.337 19.9862H37.3326ZM21.2729 15.1179H35.6567L37.337 19.4379L38.9775 15.2196L37.2663 10.8244H19.6058L21.2772 15.1179H21.2729Z"
        fill="currentColor"
      />
      <rect
        x="10.0195"
        y="11.5498"
        width="9.00267"
        height="9.00267"
        fill="url(#pattern0_1_22120)"
      />
      <defs>
        <pattern
          id="pattern0_1_22120"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use transform="scale(0.00100705 0.000999001)" />
        </pattern>
      </defs>
    </svg>
  );
  //   Profile  Svg Icon
  const profiletIcon: any = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1_21805)">
        <path
          d="M17.0344 8.06878C17.0344 12.5515 14.3448 16.1377 11.6551 16.1377C8.96545 16.1377 6.2758 12.5515 6.2758 8.06878C6.2758 3.58602 8.0689 0.896362 11.6551 0.896362C15.2413 0.896362 17.0344 3.58602 17.0344 8.06878ZM0.896484 25.1033H22.4137C22.4137 17.0343 17.0344 16.1377 11.6551 16.1377C6.2758 16.1377 0.896484 17.0343 0.896484 25.1033Z"
          stroke="currentColor"
          stroke-width="2.09195"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_21805">
          <rect width="23.3103" height="26" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
  const navItems = [
    {
      label: props?.lang == "ar" ? "الرئيسية" : "Home",
      href: `${origin}/${isArabic}`,
      icon: homeIcon,
    },
    {
      label: props?.lang == "ar" ? "الأقسام" : "Categories",
      href: `${origin}/${isArabic}/categorieslisting`,
      icon: categoriesIcon,
    },
    {
      label: props?.lang == "ar" ? "جنرال سوبريم" : "General Supreme",
      href: `${origin}/${isArabic}/brand/general-supreme`,
      icon: generalSupreme,
    },
    {
      label: props?.lang == "ar" ? "الحساب" : "Accounts",
      href: `${origin}/${isArabic}/accountlisting`,
      icon: profiletIcon,
    },
    {
      label: props?.lang == "ar" ? "العــربـة" : "Cart",
      href: `${origin}/${isArabic}/cart`,
      icon: cartIcon,
    },
  ];

  return (
    <>
      {path.indexOf("login") === -1 &&
      path.indexOf("serviceappointment") === -1 &&
      path.indexOf("otpconfirmation") === -1 &&
      path.indexOf("resetpassword") === -1 &&
      path.indexOf("resetusername") === -1 &&
      path.indexOf("signup") === -1 &&
      path.indexOf("checkout") === -1 &&
      path.indexOf("notifications") === -1 &&
      path.indexOf("product") === -1 &&
      path.indexOf("setting") === -1 &&
      path.indexOf("account/addressbook") === -1 &&
      path.indexOf("account/loyaltyusagehistory") === -1 &&
      path.indexOf("account/orderlisting") === -1 &&
      path.indexOf("account/profile") === -1 &&
      path.indexOf("account/orderdetails") === -1 &&
      path.indexOf("brandslisting") === -1 &&
      path.indexOf("contact-us") === -1 &&
      path.indexOf("projectsales") === -1 &&
      path.indexOf("giftcards") === -1 &&
      path.indexOf("giftcards/buy") === -1 ? (
        <footer className="bg-white fixed bottom-0 w-full px-3 z-30 left-0 right-0 shadow-[0_-4px_8px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-end gap-2">
            {navItems?.map((item, index) => (
              <li
                key={item.label}
                className={`relative md:px-[10px] list-none pb-4 pt-3 w-fit h-full ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <button
                  onClick={() => {
                    router.push(item.href);
                    router.refresh();
                  }}
                  className="flex flex-col items-center gap-y-2 w-full border-none outline-none"
                >
                    <div className="nav_icon relative">
                    {
                      React.cloneElement(item.icon, {
                      className: `transition-all duration-200 ${
                        activeIndex === index ? "text-[#004b7a]" : "text-black"
                      } ${activeIndex === index ? "active" : ""}`,
                      })
                    }
                    { index === 4 && cartCount > 0 && (
                      <span className="bg-secondary absolute -top-1 right-0 text-[10px] text-white h-4 min-w-4 rounded-full flex justify-center items-center">{cartCount}</span>
                    )}
                    </div>
                    <span
                    className={`text-xs duration-200 ${activeIndex === index ? "text-[#004b7a]" : "text-black"}`}
                    >
                    {item.label}
                  </span>
                  {activeIndex === index && (
                    <span className="absolute duration-300 ease-in-out bottom-0 mb-2 w-full h-[3px] rounded-t-full bg-[#004b7a]" style={{boxShadow: '0 -2px 2.5px 0.5px #f8be98'}}></span>
                  )}
                </button>
              </li>
            ))}
          </div>
        </footer>
      ) : null}
    </>
  );
}
