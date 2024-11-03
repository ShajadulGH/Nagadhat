import { apiBaseUrl } from "@/app/utils";


export const updateAffiliateFinanceBankInfo = async (accessToken, data) => {
    if (data) {
        const response = await fetch(
            `${apiBaseUrl}/create-affiliate-finance-bank-info`,
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        return response.json();
    }
};