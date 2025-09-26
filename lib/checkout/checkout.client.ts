import { get, post } from "@/lib/api/apiCalls";

export async function getUserAddressData() {
    const addressData: any = await get(`user-addresses/${localStorage.getItem('userid')}`);
    if (!addressData) throw new Error("Failed to load addresses");
    return {
        addressData: addressData,
    };
}

export async function getwarehouseData(lang: any) {
    const warehouseData: any = await get(`get-selected-warehouse/${localStorage.getItem('userid')}?lang=${lang}`);
    if (!warehouseData) throw new Error("Failed to load warehouse");
    return {
        warehouseData: warehouseData,
    };
}

export async function getcityData(lang: any) {
    const cityData: any = await get(`get-city-list-lang/${lang}`);
    if (!cityData) throw new Error("Failed to load city list");
    return {
        cityData: cityData,
    };
}

export async function addAddressData(data: any) {
    const addressData: any = await post(`addaddress`, data);
    if (!addressData) throw new Error("Failed to load Address data");
    return {
        addressData: addressData,
    };
}

export async function updateAddressData(id: any, data: any) {
    const addressData: any = await post(`updateaddress/${id}`, data);
    if (!addressData) throw new Error("Failed to load Address data");
    return {
        addressData: addressData,
    };
}