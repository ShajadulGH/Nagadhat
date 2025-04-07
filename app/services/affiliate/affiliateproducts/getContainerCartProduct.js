import { apiBaseUrl } from "@/app/utils";

export const getContainerCartProduct = async (token) => {
    try {
        const response = await fetch(`${apiBaseUrl}/get-container-products`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            next: { revalidate: 1 },
        });

        return await response.json();
    } catch (error) {
        console.error("Something went wrong fetching affiliate Container Cart Data");
        console.info(error);
    }
};
