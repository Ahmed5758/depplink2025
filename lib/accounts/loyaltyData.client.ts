import { get } from "@/lib/api/apiCalls";

export async function getLoyaltyHistoryData() {
    const userLoyaltyData: any = await get(`get-user-loyalty-data-history/${localStorage.getItem('userid')}`)
    if (!userLoyaltyData) throw new Error("Failed to load notifications");
    return {
        userLoyaltyData: userLoyaltyData,
    };
}
