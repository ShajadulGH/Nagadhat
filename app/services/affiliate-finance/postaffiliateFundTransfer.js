import { apiBaseUrl } from "@/app/utils";


export const postaffiliateFundTransfer = async (accessToken, selectedTransfer) => {
    if (selectedTransfer && accessToken) {
        try {
            const response = await fetch(
                `${apiBaseUrl}/affiliate-fund-transfer`,
                {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({transfer_type:selectedTransfer}),
                }
            );
            return response.json();
        } catch (error) {
            console.error(error);
            return response;
        }
    }else{
        console.error("No access token or selected transfer provided.");
        return null;
    }
};