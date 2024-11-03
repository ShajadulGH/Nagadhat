import { apiBaseUrl } from "@/app/utils";

export const getAffiliateFinanceMobileBankingInfo = async (token) => {
    if (!token) {
        return null;
    }
    const url = `${apiBaseUrl}/affiliate-finance-mobile-banking-info`;
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
        console.error(
            "Something went wrong fetching affiliate Finance Mobile Banking Data"
        );
        console.info(error);
        return null;
    }
};
