import { apiBaseUrl } from "@/app/utils";

export const getBkashToken = async () => {
    try {
        const response = await fetch(`${apiBaseUrl}/tokenized/checkout/token/grant`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        // Try response as text if it's not JSON
        const data = await response.text();

        console.log("Token data:", data); // Check what you're getting
        return data;
    } catch (error) {
        console.error("Error in Payment Bkash token:", error);
        throw error; 
    }
};
