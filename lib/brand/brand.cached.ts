// lib/faqs/footer.cached.ts
import "server-only";
import { unstable_cache } from "next/cache";
import { getBrandPageData } from "@/lib/brand/brand.server";

export const getBrandPageDataCached = (slug: string) =>
    unstable_cache(
        () => getBrandPageData(slug),
        ["brandPageData", slug],
        { revalidate: 3600, tags: [`brandPageData:${slug}`] }
    )();
