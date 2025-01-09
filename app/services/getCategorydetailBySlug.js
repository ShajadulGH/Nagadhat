import { apiBaseUrl } from "../utils";

export const getCategorydetailBySlug = async (
    outletId,
    slug,
    option = {}
) => {

    try {
        if (slug) {
            let CategoryRootApi = "";
            if (option) {
                const params = new URLSearchParams(option).toString();
                CategoryRootApi = `${apiBaseUrl}/category-detail-by-slug/${outletId}/${slug}?${params}`;
            } else {
                CategoryRootApi = `${apiBaseUrl}/category-detail-by-slug/${outletId}/${slug}`;
            }

            const response = await fetch(CategoryRootApi, {
                next: { revalidate: 1 },
            });
            return await response.json();
        }
    } catch (error) {
        console.error(
            "Something went wrong fetching Category details Slug Data"
        );
        console.info(error);
    }
};
