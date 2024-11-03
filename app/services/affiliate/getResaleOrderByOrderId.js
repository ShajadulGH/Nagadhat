import { apiBaseUrl } from "@/app/utils";

export const getResaleOrderByOrderId = async ( token, orderId) => {
    if (!orderId || !token) {
        console.error("Missing orderId or token.");
        return null;
    }
    try {
        const response = await fetch(
            `${apiBaseUrl}/affiliate-get-product/${orderId}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                next: { revalidate: 1 },
            }
        );
        return await response.json();
    } catch (error) {
        console.error(
            "Something went wrong fetching Container Order Summery data"
        );
        console.info(error);
    }
};