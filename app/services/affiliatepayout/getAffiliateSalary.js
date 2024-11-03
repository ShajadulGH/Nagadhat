import { apiBaseUrl } from "@/app/utils";

export const getAffiliateSalary = async (token, params = {}) => {
    if (!token) {
        return null;
    }
    const urlParams = new URLSearchParams(params).toString();
    const url = `${apiBaseUrl}/affiliate-salary${
        urlParams ? `?${urlParams}` : ""
    }`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Something went wrong fetching affiliate salary ", error);
        console.info(error);
        return null;
    }
};
