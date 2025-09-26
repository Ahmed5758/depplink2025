import { get, post } from "@/lib/api/apiCalls";
import { AdminApi } from "@/lib/api/apiLinks";

export async function getOrderDetails(slugStr: any) {
    const orderSlugData: any = await get(`order-detail/${slugStr}`)
    if (!orderSlugData) throw new Error("Failed to load notifications");
    return {
        orderSlugData: orderSlugData,
    };
}

export async function getCheckOutOrderReview(slugStr: any) {
    const checkOrderReview: any = await get(`checkorder-review/${slugStr}/${localStorage.getItem('userid')}`)
    if (!checkOrderReview) throw new Error("Failed to load notifications");
    return {
        checkOrderReview: checkOrderReview,
    };
}

export async function postProductReview(data: any) {
    const productReviewData: any = await post(`addproductreview`, data)
    if (!productReviewData) throw new Error("Failed to load notifications");
    return {
        productReviewData: productReviewData,
    };
}

export async function postUGCProduct(sendData: any) {
    const productUGCData: any = await post(`marketing/ugc-store`, sendData)
    if (!productUGCData) throw new Error("Failed to load notifications");
    return {
        productUGCData: productUGCData,
    };
}


export async function uploadVideo(file: File) {
    try {
        const response = await fetch(AdminApi + 'productmedia-video', {
            method: "POST",
            body: file,
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const videoData = await response.json();
        
        if (!videoData.success) {
            throw new Error("Video upload failed");
        }
        
        return videoData;
    } catch (error: any) {
        throw new Error(error?.message || "Failed to upload video");
    }
}
