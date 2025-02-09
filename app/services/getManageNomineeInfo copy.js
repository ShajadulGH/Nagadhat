import {apiBaseUrl} from '../utils';

export const getSyncManageNomineeInfo = async (token, phone) => {
    try {
        const response = await fetch(`${apiBaseUrl}/nominee-info/${phone}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Something went wrong fetching Nominee Info Data');
        console.info(error);
    }
}