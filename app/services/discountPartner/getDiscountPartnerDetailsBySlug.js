import { apiBaseUrl } from "@/app/utils";

export const getDiscountPartnerDetailsBySlug = async (token, slug) => {
    if (!token || !slug) return null;
    try {
        const url = `${apiBaseUrl}/discount-partner-details/${slug}`;
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
            "Something went wrong fetching discount partner details Data",
            error
        );
        console.info(error);
        return null;
    }
};
