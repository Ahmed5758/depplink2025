// app/_ctx/AppContext.tsx
"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useParams, useSelectedLayoutSegments, usePathname } from "next/navigation";

function getByPath(obj: any, path: string) {
    return path
        .split(".")
        .reduce((acc: any, k: string) => (acc && acc[k] != null ? acc[k] : undefined), obj);
}

type DeviceCoarse = "mobile" | "tablet" | "desktop";
type DeviceDetail =
    | "iOS Mobile"
    | "Android Mobile"
    | "Webview iOS Mobile"
    | "Webview Android Mobile"
    | "Tablet"
    | "Desktop";
type OS = "iOS" | "Android" | "Windows" | "macOS" | "Linux" | "ChromeOS" | "Unknown";

export type AppCtx = {
    lang: string;
    deviceType: DeviceCoarse;
    deviceDetail?: DeviceDetail;
    isWebView?: boolean;
    os?: OS;
    city: string;

    // raw route info
    slug?: string | string[];
    params?: Record<string, string | string[]>;

    // normalized helpers
    slugParts: string[];   // always an array (possibly empty)
    slugStr?: string;      // last segment if any

    // i18n
    dict?: Record<string, any>;
    t: (key: string, fallback?: string) => string;

    // optional URL helpers (if you pass them in)
    origin?: string;
    baseUrl?: string;
    fullUrl?: string;
};

const Ctx = createContext<AppCtx | null>(null);

export function AppProvider({
    value,
    children,
}: {
    value: {
        lang: string;
        deviceType: DeviceCoarse;
        deviceDetail?: DeviceDetail;
        isWebView?: boolean;
        os?: OS;
        city: string;
        slug?: string | string[] | undefined;
        // slug?: any
        params?: Record<string, string | string[]>;
        dict?: Record<string, any>;
        t?: AppCtx["t"];
        origin?: string;
        baseUrl?: string;
        fullUrl?: string;
    };
    children: React.ReactNode;
}) {
    // ---- route context (client) ----
    const routeParams = useParams() as Record<string, string | string[]>;
    const segments = useSelectedLayoutSegments();
    const pathname = usePathname();

    const fromParams = routeParams?.slug as string | string[] | undefined;
    const lastSegment = segments.at(-1);
    const parts = pathname.split("/").filter(Boolean);
    const fromPathname = parts.at(-1);

    const computedSlug: string | string[] | undefined =
        value.slug ?? fromParams ?? lastSegment ?? fromPathname;

    const slugParts: string[] = Array.isArray(computedSlug)
        ? computedSlug
        : computedSlug
            ? [computedSlug]
            : [];
    const slugStr: string | undefined = typeof fromPathname === 'string' 
    ? fromPathname 
    : Array.isArray(fromParams) 
        ? fromParams[fromParams.length - 1] 
        : typeof fromParams === 'string' 
            ? fromParams 
            : slugParts.at(-1);

    // ---- translator ----
    const t =
        value.t ??
        ((key: string, fallback = key) => {
            const hit = value.dict ? getByPath(value.dict, key) : undefined;
            return typeof hit === "string" ? hit : fallback;
        });

    // ---- optional client-side fallback for device detail ----
    const { deviceDetail, isWebView, os } = useMemo(() => {
        if (value.deviceDetail && value.os !== undefined) {
            return {
                deviceDetail: value.deviceDetail,
                isWebView: value.isWebView,
                os: value.os,
            };
        }
        if (typeof navigator === "undefined") {
            return { deviceDetail: undefined, isWebView: undefined, os: undefined };
        }

        const ua = navigator.userAgent.toLowerCase();

        const isAndroid = /android/.test(ua);
        const isiPhone = /iphone|ipod/.test(ua);
        const isiPad = /ipad/.test(ua) || (/macintosh/.test(ua) && /mobile/.test(ua));
        const isIOS = isiPhone || isiPad;

        const webviewIOS = isIOS && /applewebkit/.test(ua) && !/safari/.test(ua);
        const webviewAndroid =
            isAndroid && (/; wv/.test(ua) || /version\/\d+\.\d+/.test(ua)) && !/chrome\/\d+/.test(ua);
        const _isWebView = webviewIOS || webviewAndroid;

        const osGuess: OS = isIOS
            ? "iOS"
            : isAndroid
                ? "Android"
                : /windows/.test(ua)
                    ? "Windows"
                    : /mac os x|macintosh/.test(ua)
                        ? "macOS"
                        : /cros/.test(ua)
                            ? "ChromeOS"
                            : /linux/.test(ua)
                                ? "Linux"
                                : "Unknown";

        let detail: DeviceDetail = "Desktop";
        if (value.deviceType === "tablet") {
            detail = "Tablet";
        } else if (value.deviceType === "mobile") {
            if (_isWebView && isIOS) detail = "Webview iOS Mobile";
            else if (_isWebView && isAndroid) detail = "Webview Android Mobile";
            else if (isIOS) detail = "iOS Mobile";
            else if (isAndroid) detail = "Android Mobile";
            else detail = "Android Mobile";
        }

        return { deviceDetail: detail, isWebView: _isWebView, os: osGuess };
    }, [value.deviceDetail, value.isWebView, value.os, value.deviceType]);

    return (
        <Ctx.Provider
            value={{
                lang: value.lang,
                deviceType: value.deviceType,
                deviceDetail,
                isWebView,
                os,
                city: value.city,
                dict: value.dict,
                t,
                slug: computedSlug,
                slugParts,
                slugStr,
                params: value.params ?? routeParams,
                origin: value.origin,
                baseUrl: value.baseUrl,
                fullUrl: value.fullUrl,
            }}
        >
            {children}
        </Ctx.Provider>
    );
}

export function useApp() {
    const v = useContext(Ctx);
    if (!v) throw new Error("useApp must be used within <AppProvider>");
    return v;
}

export function useT() {
    return useApp().t;
}
