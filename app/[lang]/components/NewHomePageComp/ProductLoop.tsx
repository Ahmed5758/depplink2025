"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { get } from "../../api/ApiCalls";


const ProductComponent = dynamic(
    () => import("./product_component"),
    { ssr: true }
);

export default function ProductLoopComponent(props: any) {
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
        // localStorage.getItem("globalcity")
        await get(`productextradatamulti-regional-new/${a?.join(",")}/${localStorage.getItem("globalcity")}`).then((responseJson: any) => {
            const data = responseJson?.data;
            setProExtraData(data)
        })
    }


    return (
        <>
            {productData?.map((productData: any, i: number) => (
                <ProductComponent productImage="https://images.tamkeenstores.com.sa/assets/new-media/GT32Q69-1W.webp" productData={productData} key={i} lang={isArabic} isMobileOrTablet={isMobileOrTablet} origin={origin} ProExtraData={ProExtraData[productData?.id]} />
            ))}
        </>
    );
}
