import { apiBaseUrl } from "../utils";

export const deleteCartProduct = async (cartId, token) => {
    const url = `${apiBaseUrl}/delete-cart-product?cart_id=${cartId}`;
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
};
