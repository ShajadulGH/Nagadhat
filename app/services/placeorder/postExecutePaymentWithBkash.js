

import { apiBaseUrl } from "@/app/utils";

export const postExecutePaymentWithBkash = async ( paymentID) => {
    try {
        const response = await fetch(`${apiBaseUrl}/bkash/execute-payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({paymentID}),
        });

        return await response.json();
    } catch (error) {
        console.error("Error in Payment With Bkash:", error);
        throw error; 
    }
};