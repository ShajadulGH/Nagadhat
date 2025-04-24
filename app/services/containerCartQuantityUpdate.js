import { apiBaseUrl } from "../utils";

export const containerCartQuantityUpdate = async (quantityUpdateInfo, token) => {
    try {
        const response = await fetch(`${apiBaseUrl}/update-container-cart-quantity`, {
            method: "POST",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(quantityUpdateInfo),
        });

        return await response.json();
    } catch (error) {
        console.error("Error updating cart quantity:", error);
        throw error;
    }
};
