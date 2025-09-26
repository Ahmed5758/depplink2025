// lib/product.server.ts (App Router, server-only)
import "server-only";
import { cache } from "react";
import { Api } from "@/lib/api/apiLinks";
import { cacheKey } from "@/app/GlobalVar";

export const getProductServerSide = cache(async (city: string, slugStr: string, lang: string) => {
    const productData = await fetch(`${Api}product-regional-new-copy/${slugStr}/${city}?${cacheKey}`)
    if (!productData.ok) throw new Error("Failed to load product data");
    const data = await productData.json();
    return data;
});
