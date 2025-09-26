"use client";

import dayjs from "dayjs";
import Image from "next/image";
import React, { useMemo } from "react";

interface BadgeProps {
    devicetype: string;
    ProExtraData: Record<string, any>;
    data: {
        id: string;
        newtype: number;
        best_seller?: number;
        top_selling?: number;
        low_in_stock?: number;
        custom_badge_en?: string;
        custom_badge_ar?: string;
        sale_price?: number;
        savetype?: number;
        price?: number;
    };
    d1: string;
    d2: string;
    lang: string;
}

const Badges: React.FC<BadgeProps> = ({ devicetype, ProExtraData, data, d1, d2, lang }: any) => {
    if (devicetype === "mobile") return null;
    const badgeContent = useMemo(() => {
        const expressDeliveryData = ProExtraData?.[data?.id]?.expressdeliveryData;
        const daysDifference = dayjs(d2).diff(d1, "days");
        const isNew = daysDifference <= data?.newtype;

        const badgeStyles = "text-[0.55rem] lg:text-xs absolute ltr:left-0 rtl:right-0 top-0 md:px-3.5 px-2 py-1 z-10 ";
        const badgeShape = "rtl:rounded-bl-lg rtl:rounded-tr-lg ltr:rounded-br-lg ltr:rounded-tl-lg ";
        var flashCalc: any = false
        if (ProExtraData && Object.keys(ProExtraData).length)
            flashCalc = ProExtraData[data?.id]?.flash ? ProExtraData[data?.id]?.flash?.discount_type === 2 ? Math?.round(data?.sale_price * ProExtraData[data?.id]?.flash?.discount_amount / 100) : ProExtraData[data?.id]?.flash?.discount_amount : data?.sale_price
        return (
            <>
                {/* {data?.custom_badge_en || data?.custom_badge_ar ?
                    <div className="text-[#EA4335] text-[0.55rem] md:text-xs absolute ltr:right-0 rtl:left-0 top-0 bg-[#EA433520] md:px-3.5 px-2 py-1 rtl:rounded-tl-lg rtl:rounded-br-lg ltr:rounded-bl-lg ltr:rounded-tr-lg z-20">
                        {lang === "ar" ? data?.custom_badge_ar : data?.custom_badge_en}
                    </div>
                    : null} */}

                {data?.sale_price ?
                    <div className="text-[#EA4335] text-[0.55rem] md:text-xs absolute ltr:right-0 rtl:left-0 top-0 bg-[#EA433520] md:px-3.5 px-2 py-1 rtl:rounded-tl-lg rtl:rounded-br-lg ltr:rounded-bl-lg ltr:rounded-tr-lg z-20">
                        {data.savetype === 1
                            ? lang === "ar"
                                ? `خصم %${Math.round(((data?.price - flashCalc) * 100) / data?.price)}`
                                : `OFF ${Math.round(((data?.price - flashCalc) * 100) / data?.price)} %`
                            : lang === "ar"
                                ? `وفر ${(data?.price - flashCalc).toLocaleString("EN-US")} ر.س`
                                : `Save ${(data?.price - flashCalc).toLocaleString("EN-US")} SR`}
                    </div>
                    : null}

                {expressDeliveryData ?
                    <div className="absolute z-10 top-1 ltr:left-3 rtl:right-3">
                        <Image
                            src={lang === "ar" ? "/icons/express_logo/express_logo_ar.png" : "/icons/express_logo/express_logo_en.png"}
                            width={65}
                            height={0}
                            alt="express_delivery"
                            title="Express Delivery"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 65px"
                        />
                    </div>
                    :
                    isNew ?
                        <div className={`${badgeStyles} bg-[#20831E20] text-[#20831E] ${badgeShape}`}>
                            {lang === "ar" ? "جديد" : "New"}
                        </div>
                        :
                        data?.best_seller === 1 ?
                            <div className={`${badgeStyles} bg-[#20831E20] text-[#20831E] ${badgeShape}`}>
                                {lang === "ar" ? "أكثر مبيعا" : "Selling Out Fast"}
                            </div>
                            :
                            data?.top_selling === 2 ?
                                <div className={`${badgeStyles} bg-[#0B5ED820] text-[#0B5ED8] ${badgeShape}`}>
                                    {lang === "ar" ? "أكثر مبيعا" : "Top Selling"}
                                </div>
                                :
                                data?.low_in_stock === 3 ?
                                    <div className={`${badgeStyles} bg-[#F0660C20] text-[#F0660C] ${badgeShape}`}>
                                        {lang === "ar" ? "كمية محدودة" : "Low in Stock"}
                                    </div>
                                    :
                                    null
                }
            </>
        )
    }, [ProExtraData, data, d1, d2, lang]);

    return <>{badgeContent}</>;
};

export default Badges;
