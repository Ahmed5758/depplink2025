"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface GridImagesThreeProps {
  isMobileOrTablet: boolean;
  isArabic: boolean;
  images: string[];
  links: string[];
  NewMedia: any;
}

export default function GridImagesThree({
  isMobileOrTablet,
  isArabic,
  images = [],
  links = [],
  NewMedia
}: GridImagesThreeProps) {

    // Fallback image
    const defaultImage = "/images/categoryNew/card-4.png";

    // Construct image URL
    const getImageSrc = (image?: string) => {
        if (!image) return defaultImage;
        if (/^https?:\/\//.test(image)) return image; // Use full URL if provided
        return `${NewMedia}${image}`; // Prepend NewMedia for relative paths
    };
    return (
        <div className={'grid md:grid-cols-3 grid-cols-1 gap-4'}>
            <Link className="w-full" href={links[0]}>
                <Image
                    src={getImageSrc(images[0])}
                    alt={isArabic ? `صورة` : `Image`}
                    title={isArabic ? `صورة` : `Image`}
                    loading="lazy"
                    width={0}
                    height={0}
                    className="object-fill w-full h-full"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
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
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
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
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                />
            </Link>
        </div>
    );
}