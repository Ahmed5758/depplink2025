// lib/product.server.ts (App Router, server-only)
import "server-only";
import { cache } from "react";
import { Api } from "@/lib/api/apiLinks";
import { cacheKey } from "@/app/GlobalVar";

export const getGiftDetailsServerSide = cache(async (slugStr: string) => {
    const giftDetailData = await fetch(`${Api}gift-detail/${slugStr}?${cacheKey}`)
    if (!giftDetailData.ok) throw new Error("Failed to load gift data");
    const data = await giftDetailData.json();
    return data;
});
