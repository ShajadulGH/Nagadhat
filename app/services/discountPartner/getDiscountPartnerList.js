import { apiBaseUrl } from "@/app/utils";

export const getDiscountPartnerList = async (token, category) => {
    if (!token) return;
    try {
        const url = category
            ? `${apiBaseUrl}/discount-partner-list?category=${category}`
            : `${apiBaseUrl}/discount-partner-list`;
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
            "Something went wrong fetching discount partner list Data",
            error
        );
        console.info(error);
    }
};
