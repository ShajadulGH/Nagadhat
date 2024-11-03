import { apiBaseUrl } from "../utils";

export const getAllPickUpPontes = async () => {
    try {
        const response = await fetch(
            `${apiBaseUrl}/get-all-outlet-pickup-point-list`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Something went wrong fetching pick up point data");
        console.info(error);
    }
};
