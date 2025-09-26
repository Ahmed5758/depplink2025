import { get, post } from "@/lib/api/apiCalls";

export async function getUserProfile() {
    const userProfileData: any = await get(`user-profile/${localStorage.getItem('userid')}`)
    if (!userProfileData) throw new Error("Failed to load user profile data");
    return {
        userProfilesData: userProfileData,
    };
}

export async function postGiftCardStore(data: any) {
    const giftCardStoreData: any = await post(`giftCardStoreData`, data)
    if (!giftCardStoreData) throw new Error("Failed to load notifications");
    return {
        giftCardStoreData: giftCardStoreData,
    };
}