import { get } from "@/lib/api/apiCalls";

export async function getSubmitOrderUpdate(orderId: string, paymentid: string) {
    const submitOrderDetails: any = await get(`order-paymentupdate/${orderId}/${paymentid}`)
    if (!submitOrderDetails) throw new Error("Failed to load notifications");
    return {
        submitOrderDetails: submitOrderDetails,
    };
}

// export async function getUserOrderDetails(orderid: string) {
//     const userOrderDetails: any = await get(`order-detail/${orderid}`)
//     if (!userOrderDetails) throw new Error("Failed to load notifications");
//     return {
//         userOrderDetails: userOrderDetails,
//     };
// }

// export async function getMaintainanceProductDetails(orderid: string) {
//     const maintainanceProductDetails: any = await get(`checkmaintenance-product/${orderid}`)
//     if (!maintainanceProductDetails) throw new Error("Failed to load notifications");
//     return {
//         maintainanceProductDetails: maintainanceProductDetails,
//     };
// }
