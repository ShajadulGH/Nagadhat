import { apiBaseUrl } from "@/app/utils";


export const postAgentWithdraw = async (accessToken, data) => {
    if (data) {
        const response = await fetch(
            `${apiBaseUrl}/affiliate-finance-agent-request`,
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        return response.json();
    }
};