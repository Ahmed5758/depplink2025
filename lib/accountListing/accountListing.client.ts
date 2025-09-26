import { post } from "@/lib/api/apiCalls";

export async function postDeleteUser(data: any) {
    const deleteUserData: any = await post(`userDelete`, data)
    if (!deleteUserData) throw new Error("Failed to load notifications");
    return {
        deleteUserData: deleteUserData,
    };
}
