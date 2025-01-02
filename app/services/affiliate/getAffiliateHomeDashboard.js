import { apiBaseUrl } from "@/app/utils";

export const getAffiliateHomeDashboard = async (token) => {
    try {
        const response = await fetch(`${apiBaseUrl}/affiliate-home-dashboard`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });
        return await response.json();
    } catch (error) {
        console.error(
            "Something went wrong fetching Affiliate Home Dashboard Data"
        );
        console.info(error);
    }
};
