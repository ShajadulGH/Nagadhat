


import { apiBaseUrl } from "@/app/utils";

export const getSaleOnNagadhat = async (orderId, token) => {
    if (!orderId || !token) {
        return null;
    }
    try {
        const response = await fetch(
            `${apiBaseUrl}/sale-on-nagadhat/${orderId}`,
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
            "Something went wrong fetching Sale On Nagadhat data"
        );
        console.info(error);
    }
};
