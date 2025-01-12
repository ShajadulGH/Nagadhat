import { apiBaseUrl } from "@/app/utils";

export const getPrivilegeCardWalletStatement = async (token, params = {}) => {
    if (!token) return null;
    try {
        const queryParams = new URLSearchParams(params).toString();
        
        const url = queryParams
            ? `${apiBaseUrl}/privilege-card-wallet-statement?${queryParams}`
            : `${apiBaseUrl}/privilege-card-wallet-statement`;

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
            "Something went wrong fetching Privilege Card wallet statement Data",
            error
        );
        console.info(error);
        return null;
    }
};
