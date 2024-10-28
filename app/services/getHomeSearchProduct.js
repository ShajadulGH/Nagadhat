import { apiBaseUrl } from "../utils";

export const getHomeSearchProduct = async (districtId = 47, search) => {
    if (!search) return;
    try {
        const response = await fetch(
            `${apiBaseUrl}/get-outlet-product-by-district-id/${districtId}?search=${search}`,
            { next: { revalidate: 10 } }
        );
        return await response.json();
    } catch (error) {
        console.error("Something went wrong fetching slider data");
        console.info(error);
    }
};
