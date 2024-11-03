import { apiBaseUrl } from "@/app/utils";

export const getPayoutResaleBonus = async (token, params = {}) => {
    if (!token) {
        console.error(
            "Authorization token is missing. Cannot fetch payout resal commission data."
        );
        return null;
    }

    const urlParams = new URLSearchParams(params).toString();
    const url = `${apiBaseUrl}/affiliate-buyback-commission${urlParams ? `?${urlParams}` : ""}`;
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
        console.error("Something went wrong fetching payout resale bonus Data");
        console.info(error);
        return null;
    }
};
