import { apiBaseUrl } from "@/app/utils";

export const geAffiliateFinanceTransitions = async (token, page, limit) => {
    const url = `${apiBaseUrl}/affiliate-finance-transitions?page=${page}&limit=${limit}`;
    if (token && page && limit) {
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
                "Something went wrong fetching affiliate Finance transitions", error
            );
            console.info(error);
            return null;
        }
    }
};
