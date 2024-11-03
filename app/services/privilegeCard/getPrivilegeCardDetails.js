import { apiBaseUrl } from "@/app/utils";

export const getPrivilegeCardDetails = async (token) => {
    if (!token) return null;
    try {
        const url = `${apiBaseUrl}/privilege-card-details`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            next: { revalidate: 1 },
        });

        return await response.json();
    } catch (error) {
        console.error(
            "Something went wrong fetching Privilege Card details Data",
            error
        );
        console.info(error);
        return null;
    }
};
