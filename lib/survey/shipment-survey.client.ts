import { post } from "@/lib/api/apiCalls";

export async function postSubmitShipmentForm(data: any) {
    const formSubmitData: any = await post(`submit-shipment-survey-form`, data)
    if (!formSubmitData) throw new Error("Failed to load shipemntData data");
    return {
        formSubmitData: formSubmitData,
    };
}