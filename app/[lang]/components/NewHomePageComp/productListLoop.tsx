"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { get } from "../../api/ApiCalls";
import { getCookie } from "cookies-next";


const ProductListComponent = dynamic(
    () => import("./productList_component"),
    { ssr: true }
);

export default function ProductListLoop(props: any) {
    const origin = props?.origin;
    const isArabic = props?.lang;
    const isMobileOrTablet = props?.isMobileOrTablet;
    const productData = props?.productData;
    const [ProExtraData, setProExtraData] = useState<any>([])

    useEffect(() => {
        if (props?.productData) {
            extraproductdata()
        }
    }, [props?.productData])

    const extraproductdata = async () => {

        var a: number[] = []
        productData.forEach((item: any) => {
            a.push(item.id)
        });
        var city = getCookie('selectedCity')
        // localStorage.getItem("globalcity")
        if (a?.length >= 1) {
            await get(`productextradatamulti-regional-new/${a?.join(",")}/${city}`).then((responseJson: any) => {
                const data = responseJson?.data;
                setProExtraData(data)
            })
        }
    }


    return (
        <>
            {productData?.map((productData: any, i: number) => (
                <ProductListComponent productImage="https://images.tamkeenstores.com.sa/assets/new-media/GT32Q69-1W.webp" productData={productData} key={i} isArabic={isArabic} isMobileOrTablet={isMobileOrTablet} origin={origin} ProExtraData={ProExtraData?.[productData?.id]} />
            ))}
        </>
    );
}
