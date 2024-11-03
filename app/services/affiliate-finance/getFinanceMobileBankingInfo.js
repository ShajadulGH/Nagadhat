
import { apiBaseUrl } from "@/app/utils";

export const getFinanceMobileBankingInfo = async (token) => {
    if (!token) {
        console.error(
            "Token is missing. Cannot fetch Finance Mobile Bankin data."
        );
        return null;
    }
    const url = `${apiBaseUrl}/affiliate-finance-mobile-banking`;
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
            "Something went wrong fetching affiliate Finance Mobile Bankin Data"
        );
        console.info(error);
        return null;
    }
};
