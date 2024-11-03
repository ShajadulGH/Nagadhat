import { apiBaseUrl } from "@/app/utils";

export const getContainerOrderSummery = async (orderId, token) => {
    if (!orderId || !token) {
        console.error("Missing orderId or token.");
        return null;
    }
    try {
        const response = await fetch(
            `${apiBaseUrl}/get-container-order-summery/${orderId}`,
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
