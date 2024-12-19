import { apiBaseUrl } from "@/app/utils";

export const getAffiliateWithdrawHistory = async (token) => {
    if (!token) {
        return null;
    }

    const url = `${apiBaseUrl}/affiliate-withdraw-history`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error(
            "Something went wrong fetching Affiliate Withdraw History data:"
        );
        console.info(error);
    }
};
