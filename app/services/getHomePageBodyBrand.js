import { apiBaseUrl } from "../utils";

export const getHomePageBodyBrand = async () => {
    try {
        const response = await fetch(`${apiBaseUrl}/get-homepage-brand`, {
            next: { revalidate: 1 },
        });
        return await response.json();
    } catch (error) {
        console.error(
            "Something went wrong fetching Home Page Body Brand data"
        );
        console.info(error);
    }
};
