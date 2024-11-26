import {apiBaseUrl} from '../utils';

export const getCategoryMobile = async () => {
    try {
        const response = await fetch(`${apiBaseUrl}/all-category-mobile`, { next: { revalidate: 60 } });
        const data = await response.json();
        return data?.results;
    } catch (error) {
        console.error('Something went wrong fetching Home Category data');
        console.info(error);
    }
}

