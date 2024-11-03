import { apiBaseUrl } from "@/app/utils";

export const postDiscountPartnerInfo = async (data) => {
    if (data) {
        try {
            const response = await fetch(
                `${apiBaseUrl}/request-with-discount-partner`,
                {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        // No need to specify "Content-Type", fetch will handle it automatically when using FormData
                    },
                    body: data,  // data should now be FormData, not JSON
                }
            );

            return response.json();
        } catch (error) {
            console.error("Error during API request: ", error);
            return { message: "Submission failed", code: response?.status || 500 };
        }
    } else {
        console.error("No data found.");
        return { message: "No data to submit", code: 400 };
    }
};
