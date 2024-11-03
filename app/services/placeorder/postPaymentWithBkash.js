

import { apiBaseUrl } from "@/app/utils";

export const postPaymentWithBkash = async ( token, data) => {
    try {
        const response = await fetch(`${apiBaseUrl}/bkash/create-payment`, {
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
        console.error("Error in Payment With Bkash:", error);
        throw error; 
    }
};