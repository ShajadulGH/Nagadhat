import { apiBaseUrl } from "@/app/utils";

export const postResetForgetPassword = async (changePassword) => {
    try {
        const response = await fetch(`${apiBaseUrl}/reset-forget-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(changePassword),
        });

        return await response.json();
    } catch (error) {
        console.error("Error in forget password:", error);
        throw error;
    }
};
