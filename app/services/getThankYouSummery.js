import { apiBaseUrl } from "../utils";

export const getThankYouSummery = async (orderId, token) => {
    if (!orderId || !token) {
        console.error("Order ID and token are required.");
        return null;
    }
    try {
        const response = await fetch(
            `${apiBaseUrl}/thank-you-summery/${orderId}`,
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
            "Something went wrong fetching thank you Page Order Summery data",
            error
        );
        console.info(error);
        return null;
    }
};
