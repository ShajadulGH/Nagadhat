
import { apiBaseUrl } from "@/app/utils";

export const getAffiliateIncomeHistory = async (token) => {
    try {
        const response = await fetch(`${apiBaseUrl}/affiliate-income-history`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Something went wrong fetching Affiliate Income History data:");
        console.info(error);
    }
};