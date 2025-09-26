import { get } from "@/lib/api/apiCalls";

export async function getCategoriesWiseUgcData(categoryParam: any,sortOrder:any, currentPage: any, perPage: any, ) {
    const categoryUGCData: any = await get(`get-ugc-data?category_ids=${categoryParam}&sort=${sortOrder}&page=${currentPage}&per_page=${perPage}`)
    if (!categoryUGCData) throw new Error("Failed to load ugc category data");
    return {
        categoryUGCData: categoryUGCData,
    };
}