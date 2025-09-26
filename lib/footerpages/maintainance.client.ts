import { get } from "@/lib/api/apiCalls";

export async function getUserData() {
    const userData: any = await get(`user-orders/${localStorage.getItem('userid')}`)
    if (!userData) throw new Error("Failed to load notifications");
    return {
        userData: userData,
    };
}

export async function getUserOrderDetails(orderid: string) {
    const userOrderDetails: any = await get(`order-detail/${orderid}`)
    if (!userOrderDetails) throw new Error("Failed to load notifications");
    return {
        userOrderDetails: userOrderDetails,
    };
}

export async function getMaintainanceProductDetails(orderid: string) {
    const maintainanceProductDetails: any = await get(`checkmaintenance-product/${orderid}`)
    if (!maintainanceProductDetails) throw new Error("Failed to load notifications");
    return {
        maintainanceProductDetails: maintainanceProductDetails,
    };
}
