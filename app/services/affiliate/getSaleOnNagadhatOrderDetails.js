import { apiBaseUrl } from "@/app/utils";

export const getSaleOnNagadhatOrderDetails = async (token, saleOnId) => {
    if (!token) {
        return null;
    }

    try {
        const response = await fetch(
            `${apiBaseUrl}/sale-on-nagadhat-order-details/${saleOnId}`,
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
            "Something went wrong fetching SaleOn Nagadhat Order Details data"
        );
        console.info(error);
    }
};
