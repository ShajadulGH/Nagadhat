import { apiBaseUrl } from "@/app/utils";

export const getPrivilegeAddToCartProducts = async (token, params = {}) => {
    if (!token) return null;
    try {
        const queryParams = new URLSearchParams(params).toString();
        const url = queryParams
            ? `${apiBaseUrl}/get-privilege-cart-products?${queryParams}`
            : `${apiBaseUrl}/get-privilege-cart-products`;

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
            "Something went wrong fetching Privilege Add To Card Products Data",
            error
        );
        console.info(error);
        return null;
    }
};
