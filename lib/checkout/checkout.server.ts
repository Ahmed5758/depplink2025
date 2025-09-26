// lib/checkout.server.ts (App Router, server-only)
import "server-only";
import { cache } from "react";
import { Api } from "@/lib/api/apiLinks";
import { cacheKey } from "@/app/GlobalVar";

export const getOrderServerSide = cache(async (slugStr: string) => {
    const orderData = await fetch(`${Api}orderdata-thankyou/${slugStr}?${cacheKey}`)
    if (!orderData.ok) throw new Error("Failed to load orderdata");
    const data = await orderData.json();
    return data;
});
