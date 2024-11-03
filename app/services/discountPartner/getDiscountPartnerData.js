import { apiBaseUrl } from "@/app/utils";

export const getDiscountPartnerData = async (id) => {
    try {
        const response = await fetch(`${apiBaseUrl}/get-request-with-discount-partner/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
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
