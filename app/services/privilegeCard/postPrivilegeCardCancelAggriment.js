import { apiBaseUrl } from "@/app/utils";

export const postPrivilegeCardCancelAggriment = async (token, cancelStatus) => {
    const url = `${apiBaseUrl}/privilege-card-cancel-aggriment`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(cancelStatus),
        });

        return await response.json();
    } catch (error) {
        console.error(error, "Error in Privilege Card Cancel Aggriment:");
    }
};
