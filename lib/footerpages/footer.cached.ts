// lib/faqs/footer.cached.ts
import "server-only";
import { unstable_cache } from "next/cache";
import { getFooterServerSidePages } from "@/lib/footerpages/footer.server";

export const getFooterCached = (slug: string) =>
    unstable_cache(
        () => getFooterServerSidePages(slug),
        ["footer", slug],
        { revalidate: 3600, tags: [`footer:${slug}`] }
    )();
