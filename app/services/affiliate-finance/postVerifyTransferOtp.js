import { apiBaseUrl } from "@/app/utils";


export const postVerifyTransferOtp = async (accessToken, data) => {
    if (data && accessToken) {
        try {
            const response = await fetch(
                `${apiBaseUrl}/verify-fund-transfer-with-otp`,
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