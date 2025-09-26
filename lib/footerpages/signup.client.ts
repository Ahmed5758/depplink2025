import { get, post } from "@/lib/api/apiCalls";

export async function getSignUpData() {
    const latestnotification: any = await get(`latestnotification`)
    if (!latestnotification) throw new Error("Failed to load store locator data");
    return {
        latestnotification: await latestnotification || [],
    };
}

export async function postCheckRegisterOtpData(data: any) {
    const checkRegister: any = await post(`check-register-otp`, data)
    if (!checkRegister) throw new Error("Failed to load notifications");
    return {
        usercheckRegister: checkRegister,
    };
}


export async function postCheckRegisterCheckData(data: any) {
    const checkRegisterData: any = await post(`register-check-phone`, data)
    if (!checkRegisterData) throw new Error("Failed to load notifications");
    return {
        usercheckRegisterData: checkRegisterData,
    };
}

export async function postSignupUser(data: any) {
    const userRegister: any = await post(`user-register`, data)
    if (!userRegister) throw new Error("Failed to load notifications");
    return {
        userRegister: userRegister,
    };
}
