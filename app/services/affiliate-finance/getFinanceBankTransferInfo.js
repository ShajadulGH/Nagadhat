

import { apiBaseUrl } from "@/app/utils";

export const getFinanceBankTransferInfo = async (token) => {
    if (!token) {
        console.error(
            "Token is missing. Cannot fetch Finance Bank Transfer data."
        );
        return null;
    }
    const url = `${apiBaseUrl}/affiliate-finance-bank-transfer`;
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
            "Something went wrong fetching affiliate Finance Bank Transfer Data"
        );
        console.info(error);
        return null;
    }
};
