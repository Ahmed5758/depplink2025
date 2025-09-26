// lib/i18n.server.ts
import "server-only";
import { cache } from "react";

const SUPPORTED = ["en", "ar"] as const;
type Lang = typeof SUPPORTED[number];

function normalize(lang: string): Lang {
    return (SUPPORTED.includes(lang as Lang) ? lang : "en") as Lang;
}

export const getDictionary = cache(async (lang: string) => {
    const resolved = normalize(lang);
    const mod = await import(`@/app/dictionaries/${resolved}.json`);
    return mod.default as Record<string, any>;
});
