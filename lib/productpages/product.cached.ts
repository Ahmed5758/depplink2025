// lib/productpages/product.cached.ts
import "server-only";
import { unstable_cache } from "next/cache";
import { getProductServerSide } from "@/lib/productpages/product.server";

export const getProductCached = (city: string, slug: string, lang: string) =>
    unstable_cache(
        () => getProductServerSide(city, slug, lang),
        ["product", lang, city, slug],
        { revalidate: 3600, tags: [`product:${lang}:${slug}`] }
    )();
