import { get, post } from "@/lib/api/apiCalls";

export async function getOrderDetailData(orderid :any) {
    const orderDetailData: any = await get(`order-detail/${orderid}`)
    if (!orderDetailData) throw new Error("Failed to load notifications");
    return {
        orderDetailData: orderDetailData,
    };
}

export async function getCheckMaintenanceData(orderid :any) {
    const checkMaintenanceData: any = await get(`checkmaintenance-product/${orderid}`)
    if (!checkMaintenanceData) throw new Error("Failed to load notifications");
    return {
        checkMaintenanceData: checkMaintenanceData,
    };
}

export async function getUserOrdersData() {
    const userOrdersData: any = await get(`user-orders/${localStorage.getItem('userid')}`)
    if (!userOrdersData) throw new Error("Failed to load notifications");
    return {
        userOrdersData: userOrdersData,
    };
}

export async function postMaintenanceData(data: any) {
    const maintenance: any = await post(`maintenance`, data)
    if (!maintenance) throw new Error("Failed to load notifications");
    return {
        maintenanceData: maintenance,
    };
}
