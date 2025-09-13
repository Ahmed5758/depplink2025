"use client"

import React, { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { NewMedia } from "../../api/Api";

interface GridImagesFiveProps {
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
}: GridImagesFiveProps) {
    const router = useRouter()
    const path = usePathname();
    const containerClass = isMobileOrTablet ? "container" : "px-20";

    // Fallback image
    const defaultImage = "/images/categoryNew/card-4.png";

    // Construct image URL
    const getImageSrc = (image?: string) => {
        if (!image) return defaultImage;
        if (/^https?:\/\//.test(image)) return image; // Use full URL if provided
        return `${NewMedia}${image}`; // Prepend NewMedia for relative paths
    };
    return (
        <>
            <div className={'grid md:grid-cols-5 grid-cols-2 gap-4'}>
                <Link className="w-full" href={links[0]}>
                    <Image
                        src={getImageSrc(images[0])}
                        alt={isArabic ? `صورة` : `Image`}
                        title={isArabic ? `صورة` : `Image`}
                        loading="lazy"
                        width={0}
                        height={0}
                        className="object-fill w-full h-full"
                        sizes="100vw"
                    />
                </Link>
                <Link className="w-full" href={links[1]}>
                    <Image
                        src={getImageSrc(images[1])}
                        alt={isArabic ? `صورة` : `Image`}
                        title={isArabic ? `صورة` : `Image`}
                        loading="lazy"
                        width={0}
                        height={0}
                        className="object-fill w-full h-full"
                        sizes="100vw"
                    />
                </Link>
                <Link className="w-full" href={links[2]}>
                    <Image
                        src={getImageSrc(images[2])}
                        alt={isArabic ? `صورة` : `Image`}
                        title={isArabic ? `صورة` : `Image`}
                        loading="lazy"
                        width={0}
                        height={0}
                        className="object-fill w-full h-full"
                        sizes="100vw"
                    />
                </Link>
                <Link className="w-full" href={links[3]}>
                    <Image
                        src={getImageSrc(images[3])}
                        alt={isArabic ? `صورة` : `Image`}
                        title={isArabic ? `صورة` : `Image`}
                        loading="lazy"
                        width={0}
                        height={0}
                        className="object-fill w-full h-full"
                        sizes="100vw"
                    />
                </Link>
                <Link className="w-full" href={links[4]}>
                    <Image
                        src={getImageSrc(images[4])}
                        alt={isArabic ? `صورة` : `Image`}
                        title={isArabic ? `صورة` : `Image`}
                        loading="lazy"
                        width={0}
                        height={0}
                        className="object-fill w-full h-full"
                        sizes="100vw"
                    />
                </Link>
           </div>
        </>);
}