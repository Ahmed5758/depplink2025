// lib/faqs.server.ts (App Router, server-only)
import "server-only";
import { cache } from "react";
import { Api } from "@/lib/api/apiLinks";

export const getBlogsDetailsData = cache(async (slug: string) => {
    const res = await fetch(`${Api}blog/${slug}`, {
        next: { revalidate: 7200 },
    });
    if (!res.ok) throw new Error("Failed to load FAQs");
    return res.json();
});
