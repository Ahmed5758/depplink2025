"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface GridImagesOneProps {
  isMobileOrTablet: boolean;
  isArabic: boolean;
  images: string[];
  links: string[];
  NewMedia: any;
}


export default function GridImagesOne({
  isMobileOrTablet,
  isArabic,
  images = [],
  links = [],
  NewMedia
}: GridImagesOneProps) {
    // Fallback image
    const defaultImage = "/images/categoryNew/card-4.png";

    // Construct image URL
    const getImageSrc = (images?: string) => {
        if (!images) return defaultImage;
        if (/^https?:\/\//.test(images)) return images; // Use full URL if provided
        return `${NewMedia}${images}`; // Prepend NewMedia for relative paths
    };

    return (
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
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                    style={{ color: "transparent" }}
                />
            </Link>
        </div>
    );
}