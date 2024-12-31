import { apiBaseUrl } from "@/app/utils";

export const getUserDashboard = async (token) => {
    try {
        const response = await fetch(`${apiBaseUrl}/user-dashboard`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });
        return await response.json();
    } catch (error) {
        console.error("Something went wrong fetching user dashboard data:");
        console.info(error);
    }
};
