import { apiBaseUrl } from "@/app/utils";

export const postForgetPasswordOtp = async (phone) => {
    try {
        const response = await fetch(`${apiBaseUrl}/send-forget-password-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ phone }),
        });

        return await response.json();
    } catch (error) {
        console.error("Error in forget password:", error);
        throw error;
    }
};
