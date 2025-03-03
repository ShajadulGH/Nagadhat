import { apiBaseUrl } from "@/app/utils";

export const getPrivilegeCardProductWallet = async (token, params = {}) => {
    if (!token) return;
    try {
        const queryParams = new URLSearchParams(params).toString();

        const url = queryParams
            ? `${apiBaseUrl}/privilege-card-product-statement?${queryParams}`
            : `${apiBaseUrl}/privilege-card-product-statement`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            next: { revalidate: 1 },
        });

        return await response.json();
    } catch (error) {
        console.error(
            "Something went wrong fetching Privilege Card Product Wallet  Data",
            error
        );
        console.info(error);
        return;
    }
};
