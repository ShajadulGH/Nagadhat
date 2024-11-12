import { apiBaseUrl } from "../utils";

export const getProductDetails = async (pathName) => {
    if (!pathName) {
        return null;
    }
    try {
        const response = await fetch(
            `${apiBaseUrl}/get-product-details?${pathName}`,
            {
                next: { revalidate: 1000 },
            }
        );

        return await response.json();
    } catch (error) {
        console.error("Something went wrong fetching  Product details data");
        console.info(error);
    }
};
