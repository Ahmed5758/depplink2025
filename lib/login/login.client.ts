import { post } from "@/lib/api/apiCalls";

export async function postUserLoginData(data: any) {
    const loginUpdate: any = await post(`user-login`, data)
    if (!loginUpdate) throw new Error("Failed to load notifications");
    return {
        userLoginUpdate: loginUpdate,
    };
}

export async function postCheckUserOtpData(data: any) {
    const checkOtpData: any = await post(`check-otp`, data)
    if (!checkOtpData) throw new Error("Failed to load notifications");
    return {
        usercheckOtpData: checkOtpData,
    };
}

export async function postCheckResendOtpData(data: any) {
    const ResendcheckOtpData: any = await post(`resend-otp`, data)
    if (!ResendcheckOtpData) throw new Error("Failed to load notifications");
    return {
        userResendcheckOtpData: ResendcheckOtpData,
    };
}