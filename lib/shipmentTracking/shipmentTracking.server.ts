// lib/faqs.server.ts (App Router, server-only)
import "server-only";
import { cache } from "react";
import { Api } from "@/lib/api/apiLinks";

export const getShipmentTrackingServerSidePages = cache(async (slug: string) => {
    const res = await fetch(`${Api}shipment-tracking/${slug}`, {
        next: { revalidate: 7200 },
    });
    if (!res.ok) throw new Error("Failed to load shipment tracking");
    return res.json();
});

export const getShipmentTrackingDetailServerSidePages = cache(async (slug: string) => {
    const res = await fetch(`${Api}shipment-tracking-detail/${slug}`, {
        next: { revalidate: 7200 },
    });
    if (!res.ok) throw new Error("Failed to load shipment tracking details");
    return res.json();
});
