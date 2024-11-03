import { apiBaseUrl } from "@/app/utils";

export const getBankLists = async () => {
    try {
        const url = `${apiBaseUrl}/get-bank-lists`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            next: { revalidate: 1 },
        });

        return await response.json();
    } catch (error) {
        console.error("Something went wrong fetching Bank Lists Data", error);
        console.info(error);
    }
};
