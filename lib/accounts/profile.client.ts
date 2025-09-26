import { get, post, postimage } from "@/lib/api/apiCalls";

export async function getUserProfileData() {
    const profileDataCore: any = await get(`user/${localStorage.getItem('userid')}`)
    if (!profileDataCore) throw new Error("Failed to load notifications");
    return {
        profileDataCore: profileDataCore,
    };
}

export async function postUserProfileUpdate(data: any) {
    const postProfileUpdate: any = await post(`updateuser`, data)
    if (!postProfileUpdate) throw new Error("Failed to load notifications");
    return {
        postProfileUpdate: postProfileUpdate,
    };
}

export async function uploadImage(file: FormData) {
    try {        
        const imgData = await postimage('user-img', file);
        
        if (!imgData.img) {
            throw new Error("Image upload failed");
        }
        
        return imgData;
    } catch (error: any) {
        throw new Error(error?.message || "Failed to upload image");
    }
}