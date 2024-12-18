import { apiBaseUrl } from "../utils";

export const getOTPVerify = async (payload) => {
    try {
        const response = await fetch(`${apiBaseUrl}/otp-verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        return await response.json();
    } catch (error) {
        console.error("Something went wrong fetching OTP verify");
        console.info(error);
    }
};
