import { apiBaseUrl } from "@/app/utils";

export const PostOrderFullPaymentWithBank = async (token, formData) => {
    const url = `${apiBaseUrl}/order-full-payment-with-bank`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        return await response.json();
    } catch (error) {
        console.error("Error in order full payment with bank:", error);
        throw error;
    }
};
