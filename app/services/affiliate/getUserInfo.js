import { apiBaseUrl } from "@/app/utils";

export const getUserInfo = async (token) => {
    if (!token) {
        return null;
    }

    try {
        const response = await fetch(`${apiBaseUrl}/transaction-otp-detail`, {
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
            "Something went wrong fetching transaction otp detail"
        );
        console.info(error);
    }
};
