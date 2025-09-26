import { get, post } from "@/lib/api/apiCalls";

export async function postStoreLocatorData(data: any) {
    const storeLocatorData: any = await post(`notificationsCounts`, data)
    if (!storeLocatorData) throw new Error("Failed to load notifications");
    return {
        storeLocatorData: storeLocatorData,
    };
}

export async function postFilterStoreData(data: any) {
    const filterStoreData: any = await post(`filter-stores`, data)
    if (!filterStoreData) throw new Error("Failed to load notifications");
    return {
        filterStoreData: filterStoreData,
    };
}

export async function getAffliationData(slug: any) {
    const affliationData: any = await get(`checkaffiliation/${slug}`)
    if (!affliationData) throw new Error("Failed to load data");
    return {
        affliationData: affliationData || [],
    };
}
