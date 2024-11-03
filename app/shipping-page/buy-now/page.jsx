import React from "react";
import BuyNowShippingProductPage from "./BuyNowShippingProductPage";
import PrivateRoute from "@/app/components/PrivateRoute/PrivateRoute";

const BuyNow = () => {
    return (
        <PrivateRoute>
            <div>
                <BuyNowShippingProductPage></BuyNowShippingProductPage>
            </div>
        </PrivateRoute>
    );
};

export default BuyNow;
