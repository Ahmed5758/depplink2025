import { get } from "@/lib/api/apiCalls";

export async function getOrderListingData() {
    const orderListingData: any = await get(`user-orders/${localStorage.getItem('userid')}`)
    if (!orderListingData) throw new Error("Failed to load notifications");
    return {
        orderListingData: orderListingData,
    };
}
