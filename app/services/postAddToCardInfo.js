import { apiBaseUrl } from "../utils";

/**
 * Posts information to add a product to the cart.
 *
 * @param {Object} payload - The data to be sent in the request body,
 * containing product information to be added to the cart.
 * @returns {Object} - The JSON response from the server.
 * @throws Will log an error if the fetch operation fails.
 */

export const postAddToCardInfo = async (payload) => {
    
    try {
        const response = await fetch(`${apiBaseUrl}/add-to-cart-product`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        return await response.json();
    } catch (error) {
        console.error("Something went wrong fetching add to card data");
        console.info(error);
    }
};
