import {apiBaseUrl} from '../utils';

export const getDistrictByDivisionId = async ( divisionId ) => {
    try {
        const response = await fetch(`${apiBaseUrl}/get-districts/${divisionId}`);
        const data = await response.json();
        return data?.results;
    } catch (error) {
        console.error('Something went wrong fetching division data');
        console.info(error);
    } 
}

// /api/get-districts/{divisionID}