import { apiBaseUrl } from "@/app/utils";

export const getServiceCategoryWithDiscountPartner = async (token) => {
    // if (!token) return null;
    try {
        const url = `${apiBaseUrl}/service-category-with-discount-partner`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            next: { revalidate: 100 },
        });

        return await response.json();
    } catch (error) {
        console.error(
            "Something went wrong fetching discount partner category list Data",
            error
        );
        console.info(error);
    }
};
