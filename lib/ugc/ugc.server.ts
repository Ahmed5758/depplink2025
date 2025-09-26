// lib/product.server.ts (App Router, server-only)
import "server-only";
import { cache } from "react";
import { Api } from "@/lib/api/apiLinks";
import { cacheKey } from "@/app/GlobalVar";

export const getUGCData = cache(async (lang: string) => {
    const ugcData = await fetch(`${Api}get-ugc-data?lang=${lang}?${cacheKey}`)
    if (!ugcData.ok) throw new Error("Failed to load gift data");
    const data = await ugcData.json();
    return data;
});
