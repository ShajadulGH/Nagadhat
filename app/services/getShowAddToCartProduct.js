import { signOut } from "next-auth/react";
import { apiBaseUrl } from "../utils";

export const fetchCartProducts = async (accessToken, outletId, districtId) => {
    if (accessToken && outletId && districtId) {
        try {
            // console.log("get cart product ================", accessToken);
            const response = await fetch(
                `${apiBaseUrl}/get-cart-products?outlet_id=${outletId}&location_id=${districtId}`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (response.status === 401) {
                // Handle unauthorized access
                signOut();
                // router.push("/");
                // window.location.href = '/login'; // Redirect to the login page
            }

            if (!response.ok) {
                throw new Error("Failed to fetch cart products");
            }
            return response.json();
        } catch (error) {
            console.error(error);
        }
    }

};
