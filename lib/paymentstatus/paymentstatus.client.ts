import { get } from "@/lib/api/apiCalls";
export async function orderUpdate(orderid: string,paymentid:any) {
    const userOrderDetails: any = await get(`order-paymentupdate/${orderid}/${paymentid}`)
    if (!userOrderDetails) throw new Error("Failed to load order");
    return {
        userOrderDetails: userOrderDetails,
    };
}

export async function hyperpayUpdate(orderid: string,paymentid:any) {
    const userOrderDetails: any = await get(`hyperresponse/${orderid}/${paymentid}`)
    if (!userOrderDetails) throw new Error("Failed to load order");
    return {
        userOrderDetails: userOrderDetails,
    };
}

export async function misspayUpdate(orderid: string,paymentid:any) {
    const userOrderDetails: any = await get(`mispayresponse/${orderid}/${paymentid}`)
    if (!userOrderDetails) throw new Error("Failed to load order");
    return {
        userOrderDetails: userOrderDetails,
    };
}