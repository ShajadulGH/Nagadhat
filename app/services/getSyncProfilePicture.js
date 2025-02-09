import {apiBaseUrl} from '../utils';

export const getSyncProfilePicture = async (token, phone) => {
    try {
        const response = await fetch(`${apiBaseUrl}/profile-picture/${phone}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Something went wrong fetching Manage Take a Photo Data');
        console.info(error);
    }
}