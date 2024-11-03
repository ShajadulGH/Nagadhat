import { apiBaseUrl } from "../utils";

export const getRecentViewProductsById = async (outlet_id, productsIds) => {
    if (outlet_id && productsIds.length > 0) {
        try {
            const response = await fetch(
                `${apiBaseUrl}/get-products-informaton-by-product-ids/${outlet_id}`,
                {
                    method: "POST",
                    body: JSON.stringify({ product_ids: productsIds }),  // Convert body to JSON string
                    headers: {
                        "Content-Type": "application/json", // Specify content type as JSON
                        "accept": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to fetch recent view products");
            }
            return await response.json(); // Await the JSON response
        } catch (error) {
            console.error("Error in fetching recent view products:", error);
            return null;  // Return null in case of error
        }
    } else {
        console.warn("Invalid outlet_id or productsIds");
        return null;
    }
};
