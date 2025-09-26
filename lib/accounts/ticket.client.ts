import { get } from "@/lib/api/apiCalls";

export async function getUserTicketData() {
    const ticketData: any = await get(`user-orders/${localStorage.getItem('userid')}`)
    if (!ticketData) throw new Error("Failed to load notifications");
    return {
        userTicketData: ticketData,
    };
}
