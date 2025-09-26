"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface GridImagesFourProps {
  isMobileOrTablet: boolean;
  isArabic: boolean;
  images: string[];
  links: string[];
  NewMedia: any;
}

export default function GridImagesFour({
  isMobileOrTablet,
  isArabic,
  images = [],
  links = [],
  NewMedia
}: GridImagesFourProps) {

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
        <Link className="w-full" href={links[0]}>
            <Image
                src={getImageSrc(images[0])}
                alt={isArabic ? `صورة` : `Image`}
                title={isArabic ? `صورة` : `Image`} 
                loading="lazy"
                width={0}
                height={0}
                className="dropshdrop-shadow-lg object-fill object-center w-full h-auto"
                sizes='(max-width: 140px) 100vw, (max-width: 1068px) 1150px, (max-width: 1024px) 100vw'
                style={{
                    color: "transparent",
                    borderRadius: "1rem",
                }}
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
                className="dropshdrop-shadow-lg object-fill object-center w-full h-auto"
                sizes='(max-width: 140px) 100vw, (max-width: 1068px) 1150px, (max-width: 1024px) 100vw'
                style={{
                    color: "transparent",
                    borderRadius: "1rem",
                }}
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
                className="dropshdrop-shadow-lg object-fill object-center w-full h-auto"
                sizes='(max-width: 140px) 100vw, (max-width: 1068px) 1150px, (max-width: 1024px) 100vw'
                style={{
                    color: "transparent",
                    borderRadius: "1rem",
                }}
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
                className="dropshdrop-shadow-lg object-fill object-center w-full h-auto"
                sizes='(max-width: 140px) 100vw, (max-width: 1068px) 1150px, (max-width: 1024px) 100vw'
                style={{
                    color: "transparent",
                    borderRadius: "1rem",
                }}
            />
        </Link>
        </>);
}