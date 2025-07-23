"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import React, { useState, useEffect, use } from "react";

export default function MobileFooterNew(props: any) {
  const router = useRouter();
  const path = usePathname()
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const isArabic = props?.lang == 'ar' ? "ar" : "en";
  const isMobileOrTablet =
    props?.devicetype === "mobile" || props?.devicetype === "tablet"
      ? true
      : false;
  const containerClass = isMobileOrTablet ? "container" : "px-[4.8rem]";

  //   Active Footer Nav Item
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const index = navItems.findIndex(item =>
      item.href == `${origin}${path}`
    );
    if (index !== -1) setActiveIndex(index);
  }, [path]);

  //   Home  Svg Icon
  const homeIcon: any = (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.7504 6.63228L12.7037 3.10133C11.3281 2.13754 9.21652 2.19011 7.89351 3.21523L3.5039 6.64105C2.62773 7.32446 1.93556 8.72633 1.93556 9.8303V15.8759C1.93556 18.1101 3.74923 19.9325 5.98346 19.9325H15.4286C17.6628 19.9325 19.4764 18.1188 19.4764 15.8846V9.9442C19.4764 8.76137 18.7142 7.30693 17.7504 6.63228ZM11.3631 16.4278C11.3631 16.7871 11.0652 17.085 10.706 17.085C10.3468 17.085 10.0489 16.7871 10.0489 16.4278V13.7993C10.0489 13.4401 10.3468 13.1422 10.706 13.1422C11.0652 13.1422 11.3631 13.4401 11.3631 13.7993V16.4278Z"
        fill="#9DB2CE"
      />
    </svg>
  );

  //   Heart  Svg Icon
  const heartIcon: any = (
    <svg
      width="22"
      height="19"
      viewBox="0 0 22 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.9267 2.83858C20.3375 1.90429 19.4746 1.17438 18.4555 0.748305C17.3008 0.263628 16.0039 0.176386 14.7051 0.496643C13.5148 0.79016 12.3554 1.42677 11.3209 2.35029C10.2863 1.42669 9.12679 0.790037 7.93638 0.496561C6.63748 0.176181 5.34048 0.263505 4.1858 0.748511C3.16671 1.17471 2.30382 1.90477 1.71472 2.83919C1.09779 3.81446 0.783938 5.00048 0.807104 6.2689C0.909954 11.9078 9.30974 17.0354 10.9926 18.0061C11.0924 18.0637 11.2056 18.094 11.3209 18.094C11.4362 18.094 11.5494 18.0637 11.6493 18.0061C13.3323 17.0353 21.7328 11.9068 21.8347 6.26792C21.8577 4.99958 21.5437 3.81368 20.9267 2.83858ZM20.5206 6.2443C20.4877 8.06751 19.2724 10.1931 17.0062 12.3913C14.9075 14.4268 12.5203 15.9611 11.3209 16.675C10.1215 15.9613 7.7347 14.4272 5.63621 12.3915C3.3699 10.1936 2.15451 8.06808 2.12124 6.24491C2.08493 4.25416 3.04701 2.65247 4.69479 1.96033C5.23481 1.73472 5.81458 1.61966 6.39983 1.62196C7.91116 1.62196 9.50985 2.35357 10.8523 3.71864C10.9134 3.78082 10.9864 3.83022 11.0668 3.86393C11.1473 3.89764 11.2336 3.91501 11.3208 3.91501C11.4081 3.91501 11.4944 3.89764 11.5749 3.86393C11.6553 3.83022 11.7282 3.78082 11.7894 3.71864C13.6544 1.82223 16.0139 1.14849 17.9464 1.9602C19.5944 2.6521 20.5566 4.25355 20.5206 6.24417V6.2443Z"
        fill="#9DB2CE"
      />
    </svg>
  );

  //   Cart  Svg Icon
  const cartIcon: any = (
    <svg
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_180_355)">
        <path
          d="M1.06613 2.23793H0.891703C0.459558 2.23793 0.105988 1.88436 0.105988 1.45222C0.105988 1.02008 0.459558 0.666504 0.891703 0.666504H2.46313C2.89527 0.666504 3.24884 1.02008 3.24884 1.45222C3.24884 1.77829 3.0477 2.05879 2.76406 2.17743L2.9817 3.02365H19.5917C20.9746 3.02365 22.106 4.14879 22.106 5.57958L21.6974 12.2542C21.5796 14.2319 19.7174 15.2714 18.0438 15.4041L6.39013 16.3226C6.41213 16.6966 6.15206 17.0518 5.75999 17.1437C5.31056 17.2466 4.86113 16.9921 4.7527 16.5623L3.9167 13.3141C3.07756 13.5766 2.45292 14.4841 2.45292 15.5047V15.5951C2.45292 16.8585 3.39892 17.9522 4.52327 17.9522H21.3203C21.7501 17.9522 22.106 18.2524 22.106 18.7034C22.106 19.1544 21.7548 19.5236 21.325 19.5236H19.356C19.6686 19.5236 19.9683 19.6478 20.1894 19.8688C20.4104 20.0899 20.5346 20.3896 20.5346 20.7022C20.5346 21.0148 20.4104 21.3146 20.1894 21.5356C19.9683 21.7566 19.6686 21.8808 19.356 21.8808C19.0434 21.8808 18.7436 21.7566 18.5226 21.5356C18.3016 21.3146 18.1774 21.0148 18.1774 20.7022C18.1774 20.3896 18.3016 20.0899 18.5226 19.8688C18.7436 19.6478 19.0434 19.5236 19.356 19.5236H5.21313C5.52571 19.5236 5.82548 19.6478 6.04651 19.8688C6.26753 20.0899 6.3917 20.3896 6.3917 20.7022C6.3917 21.0148 6.26753 21.3146 6.04651 21.5356C5.82548 21.7566 5.52571 21.8808 5.21313 21.8808C4.90055 21.8808 4.60078 21.7566 4.37976 21.5356C4.15873 21.3146 4.03456 21.0148 4.03456 20.7022C4.03456 20.3896 4.15873 20.0899 4.37976 19.8688C4.60078 19.6478 4.90055 19.5236 5.21313 19.5236H4.49106C2.50792 19.5236 0.891703 17.7605 0.891703 15.5951V15.5047C0.891703 13.7227 2.01056 12.2204 3.52463 11.7899L1.06613 2.23793ZM6.69342 10.8808H7.96313V7.73793H5.91635L6.69342 10.8808ZM5.72227 6.95222H7.96313V4.60058L6.43099 4.60215C5.77099 4.60215 5.2917 5.21186 5.44884 5.84515L5.72227 6.95222ZM8.74885 4.59979V6.95222H12.1903V4.59508L8.74885 4.59979ZM12.976 4.59429V6.95222H16.5903V4.59036L12.976 4.59429ZM17.376 4.58958V6.95222H20.4473L20.5346 5.53243C20.5346 5.00915 20.1103 4.58643 19.5838 4.58643L17.376 4.58958ZM20.3986 7.73793H17.376V10.8808H20.2046L20.3986 7.73793ZM20.1566 11.6665H17.376V13.8901L17.9103 13.8484C18.9631 13.762 20.0631 13.1609 20.126 12.1599L20.1566 11.6665ZM16.5903 13.9529V11.6665H12.976V14.2374L16.5903 13.9529ZM12.1903 14.2986V11.6665H8.74885V14.5108C8.74885 14.5312 8.74727 14.5511 8.74413 14.5705L12.1903 14.2986ZM7.96313 14.4951V11.6665H6.88749L7.42099 13.8249C7.45603 13.9698 7.52285 14.1051 7.61661 14.221C7.71037 14.3369 7.82874 14.4305 7.96313 14.4951ZM12.1903 7.73793H8.74885V10.8808H12.1903V7.73793ZM16.5903 7.73793H12.976V10.8808H16.5903V7.73793Z"
          fill="#9DB2CE"
        />
      </g>
      <defs>
        <clipPath id="clip0_180_355">
          <rect
            width="22"
            height="22"
            fill="white"
            transform="translate(0.437531 -0.00146484)"
          />
        </clipPath>
      </defs>
    </svg>
  );
  //   Profile  Svg Icon
  const profiletIcon: any = (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.0372 10.58C13.4567 10.58 15.4181 8.61867 15.4181 6.1992C15.4181 3.77973 13.4567 1.81836 11.0372 1.81836C8.61777 1.81836 6.6564 3.77973 6.6564 6.1992C6.6564 8.61867 8.61777 10.58 11.0372 10.58Z"
        stroke="#9DB2CE"
        strokeWidth="1.31425"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.5637 19.3417C18.5637 15.9509 15.1904 13.2085 11.0374 13.2085C6.88435 13.2085 3.51111 15.9509 3.51111 19.3417"
        stroke="#9DB2CE"
        strokeWidth="1.31425"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const navItems = [
    {
      label: props?.lang == 'ar' ? "الرئيسية" : "Home",
      href: `${origin}/${isArabic}`,
      icon: homeIcon,
    },
    {
      label: props?.lang == 'ar' ? "الـمفضلة" : "Wishlist",
      href: `${origin}/${isArabic}/account/wishlist`,
      icon: heartIcon,
    },
    {
      label: props?.lang == 'ar' ? "العــربـة" : "Cart",
      href: `${origin}/${isArabic}/cart`,
      icon: cartIcon,
    },
    {
      label: props?.lang == 'ar' ? "الحساب" : "Accounts",
      href: `${origin}/${isArabic}/accountlisting`,
      icon: profiletIcon,
    },
  ];

  return (
    <>
      {path.indexOf('login') === -1
        && path.indexOf('serviceappointment') === -1
        && path.indexOf('otpconfirmation') === -1
        && path.indexOf('resetpassword') === -1
        && path.indexOf('resetusername') === -1
        && path.indexOf('signup') === -1
        && path.indexOf('checkout') === -1
        && path.indexOf('notifications') === -1
        && path.indexOf('product') === -1
        && path.indexOf('setting') === -1
        && path.indexOf('account/addressbook') === -1
        && path.indexOf('account/loyaltyusagehistory') === -1
        && path.indexOf('account/orderlisting') === -1
        && path.indexOf('account/profile') === -1
        && path.indexOf('account/orderdetails') === -1
        && path.indexOf('brandslisting') === -1
        && path.indexOf('contact-us') === -1
        && path.indexOf('projectsales') === -1
        && path.indexOf('giftcards') === -1
        && path.indexOf('giftcards/buy') === -1
        ?
        <footer className="bg-primary shadow-lg fixed bottom-0 w-full z-30 px-4 rounded-t-2xl">
          <div className="absolute -top-[1rem] left-1/2 -translate-x-1/2 w-full h-[26px] z-0">
            <svg
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path d="M0,20 L50,0 L100,20 L100,100 L0,100 Z" fill="#004b7a" />
            </svg>
          </div>
          <div className="container">
            <div className="footer_nav relative">
              <ul className="flex justify-between items-end gap-x-[14px]">
                {navItems?.map((item, index) => (
                  <li key={item.label} className={`md:px-[10px] px-4 pb-4 pt-3 w-full h-full ${activeIndex === index ? "active" : ""}`} onClick={() => setActiveIndex(index)}>
                    <button onClick={() => { router.push(item.href), router.refresh() }} className="flex flex-col items-center gap-y-2 w-full border-none outline-none">
                      <div className="nav_icon">
                        <div className="relative">{item.icon}</div>
                      </div>
                      <span className={`text-xs text-[#9DB2CE] ${activeIndex === index ? "font-semibold" : ""}`}>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </footer>
        : null
      }
    </>
  )
}
