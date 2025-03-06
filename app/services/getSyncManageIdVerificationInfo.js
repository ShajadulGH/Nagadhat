import {apiBaseUrl} from '../utils';

export const getSyncManageIdVerificationInfo = async (token, phone) => {
    try {
        const response = await fetch(`${apiBaseUrl}/id-verification-info-sync?phone=${phone}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Something went wrong fetching Manage Basic Info Data');
        console.info(error);
    }
}