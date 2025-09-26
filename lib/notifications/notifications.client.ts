import { get } from "@/lib/api/apiCalls";
export async function getNotificationData() {
    const notifications: any = await get(`notifications`)
    if (!notifications) throw new Error("Failed to load notifications");
    return {
        notifications: notifications,
    };
}
