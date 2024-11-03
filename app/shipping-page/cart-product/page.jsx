import React from "react";
import AddToCartProductShippingPage from "./AddToCartProductShippingPage";
import PrivateRoute from "@/app/components/PrivateRoute/PrivateRoute";

const ShippingPage = () => {
    return (
        <PrivateRoute>
            <div>
                <AddToCartProductShippingPage></AddToCartProductShippingPage>
            </div>
        </PrivateRoute>
    );
};

export default ShippingPage;
