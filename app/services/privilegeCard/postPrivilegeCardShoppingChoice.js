import { apiBaseUrl } from "@/app/utils";

export const postPrivilegeCardShoppingChoice = async (token, rebateData) => {
    const url = `${apiBaseUrl}/privilege-card-shopping-choice`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(rebateData),
        });

        return await response.json();
    } catch (error) {
        console.error(error, "Error in Privilege Card Shopping Choice:");
    }
};
