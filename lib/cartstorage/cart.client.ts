import { get, post } from "@/lib/api/apiCalls";

export async function getUserLoyaltyData() {
    const loyaltyData: any = await get(`get-user-loyalty-data/${localStorage.getItem('userid')}`);
    if (!loyaltyData) throw new Error("Failed to load loyalty data");
    return {
        loyaltyData: loyaltyData,
    };
}

export async function getShippingData(data: any) {
    const shippingData: any = await post(`getshippingupdate`, data);
    if (!shippingData) throw new Error("Failed to load shipping data");
    return {
        shippingData: shippingData,
    };
}

export async function getFreeGiftCart(data: any) {
    const fgData: any = await post(`getfreegift-cart`, data);
    if (!fgData) throw new Error("Failed to load free gift data");
    return {
        fgData: fgData,
    };
}

export async function getWarehouseCart(data: any) {
    const warehouseData: any = await post(`get-warehouseCart`, data);
    if (!warehouseData) throw new Error("Failed to load warehouse cart data");
    return {
        warehouseData: warehouseData,
    };
}

export async function getAvailableDeliveryDates(data: any) {
    const deliveryData: any = await post(`get-available-date-delivery`, data);
    if (!deliveryData) throw new Error("Failed to load delivery dates");
    return {
        deliveryData: deliveryData,
    };
}

export async function getExpressRegional(data: any) {
    const expressData: any = await post(`getexpress-regional-new`, data);
    if (!expressData) throw new Error("Failed to load express delivery data");
    return {
        expressData: expressData,
    };
}

export async function getDoorstepCart(data: any) {
    const doorstepData: any = await post(`getdoorstep`, data);
    if (!doorstepData) throw new Error("Failed to load doorstep data");
    return {
        doorstepData: doorstepData,
    };
}

export async function getCouponData(data: any) {
    const couponData: any = await post(`couponData`, data);
    if (!couponData) throw new Error("Failed to load coupon data");
    return {
        couponData: couponData,
    };
}

export async function applyDiscountRule(data: any) {
    const discountData: any = await post(`discountRule`, data);
    if (!discountData) throw new Error("Failed to apply discount rule");
    return {
        discountData: discountData,
    };
}


export async function recheckCartRegionalData(data: any) {
    const recheckData: any = await post(`recheckdata-regional-new-duplicate`, data);
    if (!recheckData) throw new Error("Failed to recheck cart data");
    return {
        recheckData: recheckData,
    };
}

export async function submitOrderCart(data: any) {
    const orderData: any = await post(`submitOrder`, data);
    if (!orderData) throw new Error("Failed to submit order");
    return {
        orderData: orderData,
    };
}

export async function getFeesCart(data: any) {
    const feesData: any = await post(`getfees`, data);
    if (!feesData) throw new Error("Failed to load fees");
    return {
        feesData: feesData,
    };
}

export async function getPaymentCart(data: any) {
    const paymentData: any = await post(`checkpaymentmethod`, data);
    if (!paymentData) throw new Error("Failed to load payment method");
    return {
        paymentData: paymentData,
    };
}

export async function getProductDataCart(city:any,data: any) {
    const productData: any = await post(`productextradata-regional-new-cart/${city}`, data);
    if (!productData) throw new Error("Failed to load product data");
    return {
        productData: productData,
    };
}