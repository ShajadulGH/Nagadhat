import { apiBaseUrl } from "@/app/utils";

export const postAffiliateRankRewards = async (token, claimRewardData) => {
    const url = `${apiBaseUrl}/claim-rewards`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(claimRewardData),
        });

        return await response.json();
    } catch (error) {
        console.error("Error in claim rank rewards:", error);
        throw error;
    }
};
