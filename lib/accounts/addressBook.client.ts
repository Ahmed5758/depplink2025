import { get, post } from "@/lib/api/apiCalls";

export async function getUserAddress() {
    const userAddressBook: any = await get(`user-addresses/${localStorage.getItem('userid')}`)
    if (!userAddressBook) throw new Error("Failed to load notifications");
    return {
        userAddressBook: userAddressBook,
    };
}

export async function getUserEditAddress(id: string) {
    const userEditAddress: any = await get(`user-address/${id}`)
    if (!userEditAddress) throw new Error("Failed to load notifications");
    return {
        userEditAddress: userEditAddress,
    };
}

export async function userDeleteAddress(id: string) {
    const deleteAddress: any = await get(`user-address-delete/${id}`)
    if (!deleteAddress) throw new Error("Failed to load notifications");
    return {
        deleteAddress: deleteAddress,
    };
}

export async function getCitiesList(lang: string) {
    const listOfCities: any = await get(`get-city-list-lang/${lang}`)
    if (!listOfCities) throw new Error("Failed to load notifications");
    return {
        listOfCities: listOfCities,
    };
}

export async function postAddAddress(data: any) {
    const addNewAddress: any = await post(`addaddress`, data)
    if (!addNewAddress) throw new Error("Failed to load notifications");
    return {
        addNewAddress: addNewAddress,
    };
}

export async function postUpdateAddress(dataid: string, data: any) {
    const updateAddressPost: any = await post(`updateaddress/${dataid}`, data)
    if (!updateAddressPost) throw new Error("Failed to load notifications");
    return {
        updateAddressPost: updateAddressPost,
    };
}
