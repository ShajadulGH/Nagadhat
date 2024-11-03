import { apiBaseUrl } from "@/app/utils";


export const updateResalePlaceOrder = async(token , data)=>{
    try {
        const response = await fetch(`${apiBaseUrl}/place-order-to-get-product`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        return await response.json();
    } catch (error) {
        console.error("Error in update resale place order:", error);
        throw error;
    }
}