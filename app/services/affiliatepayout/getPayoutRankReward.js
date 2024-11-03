import { apiBaseUrl } from "@/app/utils";
export const getPayoutRankReward = async (token, params = {}) => {
    if (!token) {
        console.error(
            "Authorization token is missing. Cannot fetch payout rank reward data."
        );
        return null;
    }

    const urlParams = new URLSearchParams(params).toString();
    const url = `${apiBaseUrl}/affiliate-rank-reward${
        urlParams ? `?${urlParams}` : ""
    }`;

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
            "Something went wrong fetching affiliate payout rank reward Data"
        );
        console.info(error);
        return null;
    }
};
