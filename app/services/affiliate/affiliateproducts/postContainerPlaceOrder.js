import { apiBaseUrl } from "@/app/utils";


export const postContainerPlaceOrder = async(containerOrder,token)=>{
    try {
        const response = await fetch(`${apiBaseUrl}/container-place-order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(containerOrder),
        });

        return await response.json();
    } catch (error) {
        console.error("Error in container place order:", error);
        throw error;
    }
}