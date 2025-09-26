import { post } from "@/lib/api/apiCalls";

export async function postSubmitcustomerForm(data: any) {
    const formSubmitData: any = await post(`submit-customer-survey-form`, data)
    if (!formSubmitData) throw new Error("Failed to load maintainace data");
    return {
        formSubmitData: formSubmitData,
    };
}