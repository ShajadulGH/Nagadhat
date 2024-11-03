import { apiBaseUrl } from "@/app/utils";

export const getFinanceWithdrawHistoryById = async (token, historyId) => {
    if (!token) {
        console.error(
            "Token is missing. Cannot fetch Finance Withdraw History Details data."
        );
        return null;
    }
    const url = `${apiBaseUrl}/affiliate-finance-withdraw-history/${historyId}`;
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
            "Something went wrong fetching affiliate Finance Withdraw History Details Data"
        );
        console.info(error);
        return null;
    }
};
