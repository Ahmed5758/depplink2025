import { get, post } from "@/lib/api/apiCalls";

export async function getCitiesData(lang: string) {
    const cityListingData: any = await get(`getcities/${lang}`)
    if (!cityListingData) throw new Error("Failed to load city data");
    return {
        cityListData: await cityListingData || [],
    };
}

export async function postProjectSalesData(data: any) {
    const projectSalesData: any = await post(`mob-new-projectsale`, data)
    if (!projectSalesData) throw new Error("Failed to load notifications");
    return {
        userprojectSalesData: projectSalesData,
    };
}