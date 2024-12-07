import { apiBaseUrl } from "../utils";

export const getHomeSlider = async () => {
    try {
        const response = await fetch(`${apiBaseUrl}/get-sliders`, {
            next: { revalidate: 1 },
        });
        return await response.json();
    } catch (error) {
        console.error("Something went wrong fetching slider data");
        console.info(error);
    }
};
