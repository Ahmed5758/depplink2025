"use client"; // This is a client component 👈🏽

import React, { useEffect, useState } from 'react'
import MobileLogin from '../components/MobileLogin'
import Link from 'next/link'
import Image from 'next/image'
import { NewMedia } from '../api/Api'
import { get } from "../api/ApiCalls"
import { getDictionary } from "../dictionaries"

export default function Login({ params }: { params: { lang: string, data: any } }) {
    const [dict, setDict] = useState<any>([]);
    const [brandsData, setBrandsData] = useState<any>([]);
    const [gridCount, setGridCount] = useState<any>(6);
    const getBrandsData = async () => {
        await get(`get-brands`).then((responseJson: any) => {
            setBrandsData(responseJson?.brands)
        })
    }

    useEffect(() => {
        (async () => {
            const translationdata = await getDictionary(params.lang);
            setDict(translationdata);
        })();
        getBrandsData()
    })
    return (
        <>
            {/* // <MobileLogin /> */}
        </>
    )
}


