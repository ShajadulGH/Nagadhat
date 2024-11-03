import { apiBaseUrl } from "@/app/utils";


export const postWithdrawWithBank = async (accessToken, data) => {
    if (data) {
        const response = await fetch(
            `${apiBaseUrl}/affiliate-finance-bank-request`,
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