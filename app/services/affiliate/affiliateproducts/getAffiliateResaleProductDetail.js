import { apiBaseUrl } from "@/app/utils";

export const getAffiliateResaleProductDetail = async (token, productId) => {
    try {
        const url = `${apiBaseUrl}/affiliate-resale-product-detail?product_id=${productId}`;
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
            "Something went wrong fetching affiliate resale products detail data"
        );
        console.info(error);
    }
};