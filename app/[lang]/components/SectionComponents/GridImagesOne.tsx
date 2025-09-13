"use client"

import React, { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { NewMedia } from "../../api/Api";

interface GridImagesOneProps {
  isMobileOrTablet: boolean;
  isArabic: boolean;
  images: string[];
  links: string[];
}


export default function GridImagesOne({
  isMobileOrTablet,
  isArabic,
  images = [],
  links = [],
}: GridImagesOneProps) {
    const router = useRouter()
    const path = usePathname();
    const containerClass = isMobileOrTablet ? "container" : "px-20";
    // Fallback image
    const defaultImage = "/images/categoryNew/card-4.png";

    // Construct image URL
    const getImageSrc = (images?: string) => {
        if (!images) return defaultImage;
        if (/^https?:\/\//.test(images)) return images; // Use full URL if provided
        return `${NewMedia}${images}`; // Prepend NewMedia for relative paths
    };

    return (
        <>
            <div>
                <Link className="w-full" href={links[0]}>
                    <Image
                        src={getImageSrc(images[0])}
                        alt={isArabic ? `صورة` : `Image`}
                        title={isArabic ? `صورة` : `Image`}
                        width="0"
                        height="0"
                        decoding="async"
                        data-nimg="1"
                        className="object-[45%_55%] lg:object-center object-cover shadow-lg rounded-2xl h-[13.25rem] w-full"
                        sizes="100vw"
                        style={{ color: "transparent;" }}
                    />
                </Link>
            </div>
        </>);
}