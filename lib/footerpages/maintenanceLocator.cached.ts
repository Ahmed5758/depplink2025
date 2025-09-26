import "server-only";
import { unstable_cache } from "next/cache";
import { getMaintenanceLocator } from "@/lib/footerpages/footer.server";

export const getMaintenanceLocatorCached = (lang: string) =>
    unstable_cache(
        () => getMaintenanceLocator(lang),
        ["maintenanceLocator"],
        { revalidate: 3600, tags: [`maintenanceLocator`] }
    )();
