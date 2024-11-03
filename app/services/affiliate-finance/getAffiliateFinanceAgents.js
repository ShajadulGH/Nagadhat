import { apiBaseUrl } from "@/app/utils";

export const getAffiliateFinanceAgents = async (token) => {
    if (!token) {
        console.error("Token is missing. Cannot fetch finance Agents data.");
        return null;
    }
    const url = `${apiBaseUrl}/affiliate-finance-agents`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            next: { revalidate: 10 },
        });

        return await response.json();
    } catch (error) {
        console.log(error);
        console.error(error);
        console.info(error);
        return null;
    }
};
