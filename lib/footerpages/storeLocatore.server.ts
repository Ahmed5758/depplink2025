import { get } from "@/lib/api/apiCalls";

export async function getStoreLocatorData(lang: string) {
    const storesLocatorData: any = await get(`getstorelocator-new-update?lang=${lang}`)
    if (!storesLocatorData) throw new Error("Failed to load store locator data");
    return {
        storesLocatorDataCore: await storesLocatorData || [],
    };
}
