// lib/request-context.ts
import "server-only";

import { headers, cookies } from "next/headers";
import { cache } from "react";

const DEVICE_TYPES = ["mobile", "tablet", "desktop"] as const;
type DeviceCoarse = (typeof DEVICE_TYPES)[number];

const DEVICE_DETAILS = [
    "iOS Mobile",
    "Android Mobile",
    "Webview iOS Mobile",
    "Webview Android Mobile",
    "Tablet",
    "Desktop",
] as const;
export type DeviceDetail = (typeof DEVICE_DETAILS)[number];

const OS_VALUES = ["iOS", "Android", "Windows", "macOS", "Linux", "ChromeOS", "Unknown"] as const;
export type OS = (typeof OS_VALUES)[number];

function parseEnum<T extends readonly string[]>(
    val: string | null,
    allowed: T,
): T[number] | undefined {
    if (!val) return undefined;
    return (allowed as readonly string[]).includes(val) ? (val as T[number]) : undefined;
}

export const getRequestContext = cache(async () => {
    const h = await headers();
    const c = await cookies();

    const lang = h.get("x-lang") ?? (await c).get("lang")?.value ?? "en";
    const city = h.get("x-city") ?? (await c).get("city")?.value ?? "";


    // origin + full URL (from middleware)
    const origin =
        h.get("x-origin") ??
        `${h.get("x-forwarded-proto") ?? (process.env.VERCEL ? "https" : "http")}://${h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000"
        }`;
    const pathname = h.get("x-pathname") ?? "";
    const search = h.get("x-search") ?? "";
    const fullUrl = `${origin}${pathname}${search}`;

    // slug extracted by middleware
    const slugStr = h.get("x-slug-str") || undefined;
    let slugParts: string[] = [];
    try {
        slugParts = JSON.parse(h.get("x-slug-parts") || "[]");
    } catch {
        slugParts = slugStr ? [slugStr] : [];
    }
    const slug: string | string[] | undefined = slugParts.length > 1 ? slugParts : slugStr;

    // ✅ Narrow device values to unions
    const deviceType =
        (parseEnum(h.get("x-device-type"), DEVICE_TYPES) as DeviceCoarse | undefined) ?? "desktop";
    const deviceDetail = parseEnum(h.get("x-device-detail"), DEVICE_DETAILS); // DeviceDetail | undefined
    const os = (parseEnum(h.get("x-os"), OS_VALUES) as OS | undefined) ?? "Unknown";
    const isWebView = h.get("x-webview") === "1";

    return {
        // locale + geo
        lang,
        city,

        // url
        origin,
        baseUrl: origin,
        fullUrl,

        // device
        deviceType,
        deviceDetail, // ✅ now typed as DeviceDetail | undefined
        isWebView,
        os,

        // route
        slug,
        slugStr,
        slugParts,
    };
});
