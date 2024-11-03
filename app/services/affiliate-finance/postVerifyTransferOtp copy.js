import { apiBaseUrl } from "@/app/utils";


export const postVerifyTransferOtpRequest = async (accessToken, data) => {
    if (data && accessToken) {
        try {
            const response = await fetch(
                `${apiBaseUrl}/create-affiliate-fund-transfer`,
                {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
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