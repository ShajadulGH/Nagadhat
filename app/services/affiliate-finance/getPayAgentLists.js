

import { apiBaseUrl } from "@/app/utils";

export const getPayAgentLists = async (token) => {
    if (!token) {
        console.error("Token is missing. Cannot fetch Agent List data.");
        return null;
    }
    const url = `${apiBaseUrl}/get-agent-lists`;
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
            "Something went wrong fetching Agent List Data"
        );
        console.info(error);
        return null;
    }
};
