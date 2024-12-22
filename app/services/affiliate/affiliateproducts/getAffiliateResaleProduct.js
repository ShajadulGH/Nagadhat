import { apiBaseUrl } from "@/app/utils";

export const getAffiliateResaleProduct = async (token, params = {}) => {
    try {
        const queryString = new URLSearchParams(params).toString();
        const url = `${apiBaseUrl}/affiliate-fast-moving-products?${queryString}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            next: { revalidate: 1 },
        });

        return await response.json();
    } catch (error) {
        console.error(
            "Something went wrong fetching affiliate resale products data"
        );
        console.info(error);
    }
};
