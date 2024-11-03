import { apiBaseUrl } from "@/app/utils";

export const getAffiliateFinanceBankInfo = async (token) => {
    if (!token) {
        return null;
    }
    const url = `${apiBaseUrl}/affiliate-finance-bank-info`;
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
            "Something went wrong fetching affiliate Finance Bank Info Data"
        );
        console.info(error);
        return null;
    }
};
