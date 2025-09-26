import { get } from "@/lib/api/apiCalls";

export async function getWalletData() {
    const walletData: any = await get(`userwallet/${localStorage.getItem('userid')}}`);
    if (!walletData) throw new Error("Failed to load notifications");
    return {
        userwalletData: walletData,
    };
}
