// lib/faqs/footer.cached.ts
import "server-only";
import { unstable_cache } from "next/cache";
import { getBlogsDetailsData } from "@/lib/blogs/blogDetails.server";

export const getBlogDetailsCached = (slug: string) =>
    unstable_cache(
        () => getBlogsDetailsData(slug),
        ["blogsDetails", slug],
        { revalidate: 3600, tags: [`blogsDetails:${slug}`] }
    )();
