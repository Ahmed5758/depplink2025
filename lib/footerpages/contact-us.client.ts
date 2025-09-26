import { get, post } from "@/lib/api/apiCalls";

export async function getContactUserProfileData() {
    const userData: any = await get(`user-profile/${localStorage.getItem("userid")}`)
    if (!userData) throw new Error("Failed to load notifications");
    return {
        userData: userData,
    };
}

export async function postContactUsData(data: any) {
    const contactUsForm: any = await post(`store-contact-us`, data)
    if (!contactUsForm) throw new Error("Failed to load notifications");
    return {
        contactUsFormData: contactUsForm,
    };
}
