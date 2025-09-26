// import "server-only";
import { get } from "@/lib/api/apiCalls";

export async function getCompareDataFunc() {
    const compareData: any = await get(`getcompare/${localStorage.getItem('userid')}`)
    if (!compareData) throw new Error("Failed to load notifications");
    return {
        compareData: compareData,
    };
}

export async function getExtraProductDataFunc(a: any, city: any) {
    const extraProductDataFunc: any = await get(`productextradatamulti-regional-new/${a?.join(",")}/${city}`)
    if (!extraProductDataFunc) throw new Error("Failed to load notifications");
    return {
        extraProductDataFunc: extraProductDataFunc,
    };
}