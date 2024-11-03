import { apiBaseUrl } from "@/app/utils";

export const geAffiliateFinanceTransferHistory = async (token) => {
    const url = `${apiBaseUrl}/affiliate-fund-transfer-history`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        return await response.json();
    } catch (error) {
        console.error(
            "Something went wrong fetching affiliate Finance transfer history", error
        );
        console.info(error);
        return null;
    }
};
