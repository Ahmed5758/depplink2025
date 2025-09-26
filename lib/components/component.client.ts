import { get, post } from "@/lib/api/apiCalls";

export async function getProductExtraData(prodId: any, city:any) {
    const extraDataDetails: any = await get(`productextradatamulti-regional-new/${prodId}/${city}`)
    if (!extraDataDetails) throw new Error("Failed to load order");
    return {
        extraDataDetails: extraDataDetails,
    };
}

export async function getUserCompareData(userId: any) {
    const userCompareData: any = await get(`getcompareproduct/${userId}`)
    if (!userCompareData) throw new Error("Failed to load data");
    return {
        userCompareData: userCompareData,
    };
}

export async function getUserWishlistData(userId: any) {
    const userWishlistData: any = await get(`getwishlistproduct/${userId}`)
    if (!userWishlistData) throw new Error("Failed to load data");
    return {
        userWishlistData: userWishlistData,
    };
}

export async function addProductWishlistData(data: any) {
    const addWishlistData: any = await post(`addwishlist`, data)
    if (!addWishlistData) throw new Error("Failed to add");
    return {
        addWishlistData: addWishlistData,
    };
}

export async function removeProductWishlistData(data: any) {
    const removeWishlistData: any = await post(`removewishlist`, data)
    if (!removeWishlistData) throw new Error("Failed to remove");
    return {
        removeWishlistData: removeWishlistData,
    };
}


export async function addProductCompareData(data: any) {
    const addCompareData: any = await post(`addcompare`, data)
    if (!addCompareData) throw new Error("Failed to add");
    return {
        addCompareData: addCompareData,
    };
}

export async function removeProductCompareData(data: any) {
    const removeCompareData: any = await post(`removecompare`, data)
    if (!removeCompareData) throw new Error("Failed to remove");
    return {
        removeCompareData: removeCompareData,
    };
}

export async function addSaveSearchData(data: any) {
    const saveSearchData: any = await post(`addsave-search`, data)
    if (!saveSearchData) throw new Error("Failed to remove");
    return {
        saveSearchData: saveSearchData,
    };
}

export async function getSearchData(e: any, searchcity: any, lang: any) {
    const getUserSearchData: any = await get(`search-regional-new-updated?q=${e}&city=${searchcity}&lang=${lang}`)
    if (!getUserSearchData) throw new Error("Failed to load data");
    return {
        getUserSearchData: getUserSearchData,
    };
}

export async function postAbandonedCartStore(data: any) {
    const abandonedCartDataStore: any = await post(`abandoned-cart-store`, data)
    if (!abandonedCartDataStore) throw new Error("Failed to load data");
    return {
        abandonedCartDataStore: abandonedCartDataStore,
    };
}

export async function getExtraDataCartPopup(ids: any, city: any, user_id: any) {
    const getCartPopupExtraData: any = await get(`productextradata-cart-popup-regional-new/${ids}/${city}/${user_id}`)
    if (!getCartPopupExtraData) throw new Error("Failed to load data");
    return {
        getCartPopupExtraData: getCartPopupExtraData,
    };
}

export async function getOnlyCityData(city: any, lang: any) {
    const getCityDataUpd: any = await get(`only-city/${city}?lang=${lang}`)
    if (!getCityDataUpd) throw new Error("Failed to load data");
    return {
        getCityDataUpd: getCityDataUpd,
    };
}

export async function getAllCityData(lang: any) {
    const allCitiesData: any = await get(`getcities/${lang}`)
    if (!allCitiesData) throw new Error("Failed to load data");
    return {
        allCitiesData: allCitiesData,
    };
}

export async function getHeaderMenuData() {
    const menuDataUpd: any = await get(`menu`)
    if (!menuDataUpd) throw new Error("Failed to load menu data");
    return {
        menuDataUpd: menuDataUpd,
    };
}

export async function postSubmitNewsLetter(data: any) {
    const newsLetterData: any = await post(`submit-newslatter`, data)
    if (!newsLetterData) throw new Error("Failed to load data");
    return {
        newsLetterData: newsLetterData,
    };
}

export async function postLoginSignup(data: any) {
    const loignSignupData: any = await post(`getlogin`, data)
    if (!loignSignupData) throw new Error("Failed to load data");
    return {
        loignSignupData: loignSignupData,
    };
}

export async function postUserLogin(data: any) {
    const userLogin: any = await post(`user-login`, data)
    if (!userLogin) throw new Error("Failed to load data");
    return {
        userLogin: userLogin,
    };
}

export async function postCheckOtp(data: any) {
    const checkOtpLogin: any = await post(`check-otp`, data)
    if (!checkOtpLogin) throw new Error("Failed to load data");
    return {
        checkOtpLogin: checkOtpLogin,
    };
}

export async function postRegOtp(data: any) {
    const checkRegOtp: any = await post(`check-register-otp`, data)
    if (!checkRegOtp) throw new Error("Failed to load data");
    return {
        checkRegOtp: checkRegOtp,
    };
}

export async function postRegCheckPhone(data: any) {
    const checkRegPhone: any = await post(`register-check-phone`, data)
    if (!checkRegPhone) throw new Error("Failed to load data");
    return {
        checkRegPhone: checkRegPhone,
    };
}

export async function postUserRegister(data: any) {
    const userReg: any = await post(`user-register`, data)
    if (!userReg) throw new Error("Failed to load data");
    return {
        userReg: userReg,
    };
}

export async function postResendOtp(data: any) {
    const resendingOtp: any = await post(`resend-otp`, data)
    if (!resendingOtp) throw new Error("Failed to load data");
    return {
        resendingOtp: resendingOtp,
    };
}