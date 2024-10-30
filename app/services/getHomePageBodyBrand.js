import { apiBaseUrl } from "../utils"

export const getHomePageBodyBrand = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/get-homepage-brand`,
      ['posts'],
      { revalidate: 36000, tags: ['posts'] }
    );
    return await response.json();
  } catch (error) {
    console.error('Something went wrong fetching Home Page Body Brand data');
    console.info(error);
  }
}

