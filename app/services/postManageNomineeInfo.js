import { apiBaseUrl } from "../utils";

export const postManageNomineeInfo = async (nomineInfo, token) => {
    try {
        const formData = new FormData();
        formData.append('nominee_name', nomineInfo.nominee_name);
        formData.append('nominee_mobile_number', nomineInfo.nominee_mobile_number);
        formData.append('nominee_nid', nomineInfo.nominee_nid);
        formData.append('nominee_relation', nomineInfo.nominee_relation);
        formData.append('nominee_picture', nomineInfo.nominee_picture);
        const response = await fetch(`${apiBaseUrl}/manage-nominee-info`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        return await response.json();
    } catch (error) {
        console.error("Error in Manage Nominee Info:", error);
        throw error; 
    }
};