// lib/productpages/product.cached.ts
import "server-only";
import { unstable_cache } from "next/cache";
import { getOrderServerSide } from "@/lib/checkout/checkout.server";

export const getOrderCached = (slug: string) =>
    unstable_cache(
        () => getOrderServerSide(slug),
        ["congratulations",slug],
        { revalidate: 3600, tags: [`congratulations:${slug}`] }
    )();
