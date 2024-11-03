import { apiBaseUrl } from "@/app/utils";


export const getRanks =async (token)=>{
    try {
        const url = `${apiBaseUrl}/ranks`;

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
        console.error("Something went wrong fetching affiliate Ranks Data");
        console.info(error);
    }
}