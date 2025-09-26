// lib/faqs.server.ts (App Router, server-only)
import "server-only";
import { cache } from "react";
import { Api } from "@/lib/api/apiLinks";

export const getBlogsData = cache(async () => {
    const res = await fetch(`${Api}/blogs`, {
        next: { revalidate: 7200 },
    });
    if (!res.ok) throw new Error("Failed to load FAQs");
    return res.json();
});
