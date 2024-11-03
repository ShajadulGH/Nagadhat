import { apiBaseUrl } from "../utils";

export const shippingChare = async (productID, token) => {
    if (productID && token) {
        try {
            const response = await fetch(`${apiBaseUrl}/shipping-charge`, {
                method: "POST",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    product_ids: [
                        {
                            product_id: productID,
                        },
                    ],
                }),
            });
            return response.json();
        } catch (error) {
            console.error("Error fetching shipping charge:", error);
            throw error; // Optionally rethrow the error to handle it upstream
        }
    }
};
