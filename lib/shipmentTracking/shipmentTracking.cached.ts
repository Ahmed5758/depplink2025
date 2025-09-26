// lib/faqs/footer.cached.ts
import "server-only";
import { unstable_cache } from "next/cache";
import { getShipmentTrackingDetailServerSidePages, getShipmentTrackingServerSidePages } from "@/lib/shipmentTracking/shipmentTracking.server";

export const getShipmentTrackingCached = (slug: string) =>
    unstable_cache(
        () => getShipmentTrackingServerSidePages(slug),
        ["shipmentTracking", slug],
        { revalidate: 3600, tags: [`shipmentTracking:${slug}`] }
    )();


export const getShipmentTrackingDetailCached = (slug: string) =>
    unstable_cache(
        () => getShipmentTrackingDetailServerSidePages(slug),
        ["shipmentTrackingDetail", slug],
        { revalidate: 3600, tags: [`shipmentTrackingDetail:${slug}`] }
    )();
