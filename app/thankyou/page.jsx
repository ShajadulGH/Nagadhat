"use client";

import { useEffect, useState, useTransition } from "react";
import OrderSummaryLeft from "../components/ordersummary/OrderSummaryLeft";
import OrderSummaryRight from "../components/ordersummary/OrderSummaryRight";
import { getProductOrderSummery } from "../services/getProductOrderSummery";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import DefaultLoader from "../components/defaultloader/DefaultLoader";
import NoDataFound from "../components/NoDataFound";

const ThankYouPage = () => {
    const [orderSummary, setOrderSummary] = useState(null);
    const [isPending, startTransition] = useTransition();
    const { data: session, status } = useSession();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    useEffect(() => {
        if (status === "authenticated") {
            const fetchOrderSummary = async () => {
                try {
                    startTransition(async () => {
                        const orderData = await getProductOrderSummery(
                            orderId,
                            session?.accessToken
                        );
                        setOrderSummary(orderData?.results);
                    });
                } catch (error) {
                    console.error("Failed to fetch order summary:", error);
                }
            };
            fetchOrderSummary();
        }
    }, [session?.accessToken, status]);

    const hasOrderSummary =
        orderSummary && Object.keys(orderSummary).length > 0;

    const orderProduct = orderSummary?.products || [];

    return (
        <PrivateRoute>
            <section className="order-confirm-section-area">
                <div className="custom-container">
                    <div className="row align-items-center order-confirm-section  gy-5">
                        {isPending ? (
                            <DefaultLoader />
                        ) : hasOrderSummary ? (
                            <>
                                <OrderSummaryLeft orderSummary={orderSummary} />
                                <OrderSummaryRight
                                    orderProduct={orderProduct}
                                    orderSummary={orderSummary}
                                />
                            </>
                        ) : (
                            <NoDataFound />
                        )}
                    </div>
                </div>
            </section>
        </PrivateRoute>
    );
};

export default ThankYouPage;
