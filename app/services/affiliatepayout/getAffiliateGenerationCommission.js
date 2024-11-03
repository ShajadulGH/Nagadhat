import { apiBaseUrl } from "@/app/utils";


export const getAffiliateGenerationCommission = async (token, params={})=>{
    if (!token) {
        console.error("Token is missing. Cannot fetch affiliate generation commission data.");
        return null;
    }
    const urlParams = new URLSearchParams(params).toString();
    const url = `${apiBaseUrl}/affiliate-generation-commission${urlParams ? `?${urlParams}` : ''}`;

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
        console.error("Something went wrong fetching affiliate generation commission Data");
        console.info(error);
        return null
    }
}