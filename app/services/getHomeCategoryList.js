import { filterByStatus, apiBaseUrl } from "../utils";

export const getHomeCategoryList = async () => {
    try {
        const response = await fetch(`${apiBaseUrl}/all-category-top-menu`, {
            next: { revalidate: 1 },
        });
        const data = await response.json();
        return filterByStatus(data.results.category);
    } catch (error) {
        console.error("Something went wrong fetching Home Category data");
        console.info(error);
    }
};
