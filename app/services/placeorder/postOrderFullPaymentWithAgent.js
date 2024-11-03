

import { apiBaseUrl } from "@/app/utils";

export const postOrderFullPaymentWithAgent = async (agentPayData, token) => {
    try {
        const response = await fetch(`${apiBaseUrl}/order-full-payment-with-agent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(agentPayData),
        });

        return await response.json();
    } catch (error) {
        console.error("Error in Order Full Payment With Agent:", error);
        throw error; 
    }
};