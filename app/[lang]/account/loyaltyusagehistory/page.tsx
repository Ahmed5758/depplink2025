"use client"; // This is a client component 👈🏽

import React, { Fragment, useEffect, useRef, useState } from "react";
import "moment/locale/ar";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { getDictionary } from "../../dictionaries";
import { usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { AdminApi, NewMedia } from "../../api/Api";
import { get, post } from "../../api/ApiCalls";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Dialog, Transition, RadioGroup } from "@headlessui/react";
import LoyaltyHistoryList from "../../components/LoyaltyHistoryList";

const MobileHeader = dynamic(() => import("../../components/MobileHeader"), {
  ssr: true,
});
const AccountSidebar = dynamic(
  () => import("../../components/AccountSidebar"),
  { ssr: false }
);

export default function AddressDetails({
  params,
}: {
  params: { lang: string; data: any; slug: string; devicetype: any };
}) {
  const router = useRouter();
  const path = usePathname();
  const isArabic = params.lang === "ar";
  const isMobileOrTablet =
    params?.devicetype === "mobile" || params?.devicetype === "tablet"
      ? true
      : false;
  const containerClass =
    params.devicetype == "mobile" || params.devicetype == "tablet"
      ? "container"
      : "px-20";

  const [loyaltyData, setLoyalityData] = useState<any>([]);

  const getLoyalityHistory = async () => {
    if (localStorage.getItem("userid")) {
      await get(
        `get-user-loyalty-data-history/${localStorage.getItem("userid")}`
      ).then((responseJson: any) => {
        console.log("Loyalty History Data", responseJson);
        setLoyalityData(responseJson?.data);
      });
    } else {
      router.push(`/${params.lang}`);
    }
  };

  useEffect(() => {
    getLoyalityHistory();
  }, [params.lang]);

  const AccountSidebar = dynamic(
    () => import("../../components/AccountSidebar"),
    { ssr: true }
  );
  return (
    <>
      {params.devicetype === "mobile" ? (
        <MobileHeader
          type="Third"
          lang={params.lang}
          pageTitle={
            params.lang === "ar" ? "سجل استخدام الولاء" : "Loyalty Usage History"
          }
        />
      ) : null}
      <div className="container md:py-4 py-16">
        <div className="flex items-start my-4 gap-x-5">
          {params?.devicetype === "mobile" ? null : (
            <AccountSidebar lang={params.lang} path={path} />
          )}

          <div className="w-full">
            <div className="align__center heading__base mb-4 max-md:hidden">
              <h2>
                {params.lang == "ar" ? "سجل استخدام الولاء" : "Loyalty Usage History"}
              </h2>
            </div>

            {loyaltyData?.map((item: any, i: number) => {
              return (
                <LoyaltyHistoryList
                  key={i}
                  data={item}
                  isArabic={isArabic}
                  isMobileOrTablet={isMobileOrTablet}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
