// import { apiBaseUrl } from "@/app/utils";

import { apiBaseUrl } from "@/app/utils";

export const getAffiliateIncomeChart = async (token, params="daily") => {
    try {
        
        const url = `${apiBaseUrl}/affiliate-income-chart?filter_by=${params}`;

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
        console.error("Something went wrong fetching affiliate income chart Data");
        console.info(error);
    }
};
