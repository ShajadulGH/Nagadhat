import {apiBaseUrl} from '../utils';

export const getVerifyOTP = async (payload, token) => {
    try {
        const response = await fetch(`${apiBaseUrl}/verify-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload)
        });
        return await response.json();
    } catch (error) {
        console.error('Something went wrong fetching OTP verify');
        console.info(error);
    }
}
