

import { apiBaseUrl } from "@/app/utils";

export const postCancelPaymentWithBkash = async ( data) => {
    try {
        const response = await fetch(`${apiBaseUrl}/bkash/cancel-payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        });

        return await response.json();
    } catch (error) {
        console.error("Error in Payment With Bkash:", error);
        throw error; 
    }
};