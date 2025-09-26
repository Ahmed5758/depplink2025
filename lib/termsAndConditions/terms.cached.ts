// lib/faqs/footer.cached.ts
import "server-only";
import { unstable_cache } from "next/cache";
import { getTermsAndConditionData } from "@/lib/termsAndConditions/terms.server";

export const getTermsAndConditionCached = unstable_cache(
    () => getTermsAndConditionData(),
    ["footer"],
    { revalidate: 3600 }
);
