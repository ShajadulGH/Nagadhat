import { apiBaseUrl } from "@/app/utils";

export const getPrivilegeCardShoppingChoiceDetail = async (token, rebateId) => {
    try {
        const url = rebateId
            ? `${apiBaseUrl}/privilege-card-shopping-choice-detail?rebateId=${rebateId}`
            : `${apiBaseUrl}/privilege-card-shopping-choice-detail`;

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
            "Something went wrong fetching shopping choice detail Data"
        );
        console.info(error);
    }
};
