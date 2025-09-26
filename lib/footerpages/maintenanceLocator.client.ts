import { post } from "@/lib/api/apiCalls";

export async function postFilterMaintenanceStoreData(data: any) {
    const filterStoreData: any = await post(`filter-maintenance`, data)
    if (!filterStoreData) throw new Error("Failed to load maintenance store data");
    return {
        filterStoreData: filterStoreData,
    };
}