import { apiBaseUrl } from "../utils";

export const getHomeFlashSalesProduct = async (
    districtId,
    page = 1,
    limit = 24
) => {
    if (districtId) {
        try {
            const response = await fetch(
                `${apiBaseUrl}/get-outlet-product-by-district-id-v2-flash-sale/${districtId}?page=${page}&limit=${limit}`,
                { next: { revalidate: 10 } }
            );
            return await response.json();
        } catch (error) {
            console.error("Something went wrong fetching slider data");
            console.info(error);
        }
    }
};
