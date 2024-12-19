import { apiBaseUrl } from "@/app/utils";


export const postManagePinOtp = async(token)=>{
<<<<<<< HEAD
    if (!token) { 
=======
    if (!token) {
>>>>>>> e134429 (updated)
        return null;
    }
    try {
        const response = await fetch(`${apiBaseUrl}/manage-otp-pin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return await response.json();
    } catch (error) {
        console.error("Error in sale on nagadhat:", error);
        throw error;
    }
}