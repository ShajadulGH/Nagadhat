import { apiBaseUrl } from "@/app/utils";

export const getAffiliatePendingBalance = async (token, params = {}) => {
    if (!token) {
        return null;
    }
    const queryString = new URLSearchParams(params).toString();

    const url = `${apiBaseUrl}/affiliate-pending-balance${
        queryString ? `?${queryString}` : ""
    }`;

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
            "Something went wrong fetching affiliate pending balance ",
            error
        );
        console.info(error);
        return null;
    }
};
