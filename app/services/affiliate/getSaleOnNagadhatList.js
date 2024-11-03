import { apiBaseUrl } from "@/app/utils";

export const getSaleOnNagadhatList = async (token) => {
    if (!token) {
        return null;
    }

    try {
        const response = await fetch(`${apiBaseUrl}/sale-on-nagadhat-list`, {
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
            "Something went wrong fetching Sale On Nagadhat List data"
        );
        console.info(error);
    }
};
