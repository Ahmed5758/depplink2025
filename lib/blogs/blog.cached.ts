// lib/faqs/footer.cached.ts
import "server-only";
import { unstable_cache } from "next/cache";
import { getBlogsData } from "@/lib/blogs/blogListing.server";

export const getBlogCached = () =>
    unstable_cache(
        () => getBlogsData(),
        ["blogs"],
        { revalidate: 3600, tags: [`blogs`] }
    )();
