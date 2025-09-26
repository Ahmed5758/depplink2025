import { get } from "@/lib/api/apiCalls";

export async function getUgcData() {
    const ugcUserData: any = await get(`marketing/ugc?user_id=${localStorage.getItem('userid')}`);
    if (!ugcUserData) throw new Error("Failed to load notifications");
    return {
        userugcUserData: ugcUserData,
    };
}
