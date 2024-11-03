import { apiBaseUrl } from "@/app/utils";


export const postSaleOnNagadhat = async(saleOnData,token)=>{
    if (!token) {
        return null;
    }
    try {
        const response = await fetch(`${apiBaseUrl}/sale-on-nagadhat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(saleOnData),
        });

        return await response.json();
    } catch (error) {
        console.error("Error in sale on nagadhat:", error);
        throw error;
    }
}