"use client"

import React, { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

export default function SliderOne(props: any) {
    const router = useRouter()
    const path = usePathname();
    const isMobileOrTablet =
        props?.devicetype === "mobile" || props?.devicetype === "tablet"
            ? true
            : false;
    const containerClass = isMobileOrTablet ? "container" : "px-20";
    const isArabic = props.lang === "ar" ? true : false;
    return (
        <>
            <h1>Slider One</h1>
        </>);
}