import { apiBaseUrl } from "@/app/utils";

export const getActiveResourcesInformation = async (token, id) => {
    const url = `${apiBaseUrl}/affiliate-finance-agent-request/${id}`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        return await response.json();
    } catch (error) {
        console.error(
            "Something went wrong fetching affiliate Finance Withdraw History Details Data", error
        );
        console.info(error);
        return null;
    }
};
