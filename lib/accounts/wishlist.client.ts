import { get } from "@/lib/api/apiCalls";

export async function getWishlistDataAPI(user_id: any , city: any = 'Jeddah') {
    
    if (!user_id || !city) throw new Error("User data missing");
    
    const wishlistDataCore = await get(`getwishlist-regional-new/${user_id}/${city}`);
    return { wishlistDataCore };
}