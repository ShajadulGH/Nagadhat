"use client";
import { useEffect, useState, useTransition } from "react";
import OrderViewAmmount from "./OrderViewAmmount";
import OrderViewDetail from "./OrderViewDetail";
import OrderViewPaymentHistory from "./OrderViewPaymentHistory";
import OrderViewSummary from "./OrderViewSummary";
import OrderViewTimeLine from "./OrderViewTimeLine";
import OrderViewTopBtn from "./OrderViewTopBtn";
import { useSession } from "next-auth/react";
import { getProductOrderSummery } from "@/app/services/getProductOrderSummery";
import { getOrderStatusHistory } from "@/app/services/getOrderStatusHistory";
import { useSearchParams } from "next/navigation";
import { getOrderPaymentHistory } from "@/app/services/getOrderPaymentHistory";
import DefaultLoader from "../defaultloader/DefaultLoader";

const OrderViewWrapp = () => {
    const [orderSummary, setOrderSummary] = useState(null);
    const [orderStatus, setOrderStatus] = useState([]);
    const [orderPaymentHistory, setOrderPaymentHistory] = useState([]);
    const [orderTotalPaid, setOrderTotalPaid] = useState(null);
    const [isPending, startTransition] = useTransition();

    const { data: session, status } = useSession();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderid");

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
    }, [session?.accessToken, status, orderId]);

    useEffect(() => {
        if (status === "authenticated") {
            const fetchOrderPaymentHistory = async () => {
                try {
                    startTransition(async () => {
                        const orderPaymentData = await getOrderPaymentHistory(
                            orderId,
                            session?.accessToken
                        );
                        const orderPaymentResult =
                            orderPaymentData?.results || {};
                        const totalPaid = orderPaymentResult?.total_paid;
                        setOrderTotalPaid(totalPaid);
                        setOrderPaymentHistory(orderPaymentResult);
                    });
                } catch (error) {
                    console.error(
                        "Failed to fetch Order Payment History:",
                        error
                    );
                }
            };
            fetchOrderPaymentHistory();
        }
    }, [session?.accessToken, status, orderId]);

    useEffect(() => {
        if (status === "authenticated") {
            const fetchOrderStatus = async () => {
                try {
                    startTransition(async () => {
                        const orderStatusData = await getOrderStatusHistory(
                            orderId,
                            session.accessToken
                        );
                        const orderStatusResults =
                            orderStatusData?.results || {};
                        setOrderStatus(orderStatusResults);
                    });
                } catch (error) {
                    console.error("Failed to fetch order summary:", error);
                }
            };
            fetchOrderStatus();
        }
    }, [session?.accessToken, status, orderId]);

    const orderProduct = orderSummary?.products || [];

    return (
        <>
            <div className="order-view-wrapper h-100">
                <div className="container">
                    {isPending ? (
                        <DefaultLoader />
                    ) : (
                        <>
                            <OrderViewTopBtn orderSummary={orderSummary} />
                            <OrderViewSummary orderSummary={orderSummary} />
                            <OrderViewTimeLine orderStatus={orderStatus} />
                            <div className="row order-view-payment-history">
                                <div className="col-lg-9">
                                    <OrderViewDetail
                                        orderProduct={orderProduct}
                                    />
                                    <OrderViewPaymentHistory
                                        orderPaymentHistory={
                                            orderPaymentHistory
                                        }
                                    />
                                </div>
                                <OrderViewAmmount
                                    orderSummary={orderSummary}
                                    orderTotalPaid={orderTotalPaid}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default OrderViewWrapp;
