import {apiBaseUrl} from '../utils';

export const getMagicToken = async (payload) => {
    try {
        const response = await fetch(`${apiBaseUrl}/auth/verify-impersonation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        return await response.json();
    } catch (error) {
        console.info(error);
    }
}
