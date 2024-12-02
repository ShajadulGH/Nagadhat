import { apiBaseUrl } from "@/app/utils";

export const getActiveContainers = async (token) => {
    try {
        const url = `${apiBaseUrl}/get-active-containers`;

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
            "Something went wrong fetching affiliate active containers Data"
        );
        console.info(error);
    }
};
