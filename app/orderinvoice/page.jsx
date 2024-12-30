"use client";

import { useEffect, useState } from "react";
import OrderInvoiceTop from "../components/orderinvoice/OrderInvoiceTop";
import InvoiceProductDetail from "../components/orderinvoice/InvoiceProductDetail";
import InvoicePaymentHistory from "../components/orderinvoice/InvoicePaymentHistory";
import InvoiceFooter from "../components/orderinvoice/InvoiceFooter";
import { getProductOrderSummery } from "../services/getProductOrderSummery";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { getOrderPaymentHistory } from "../services/getOrderPaymentHistory";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

const OrderInvoicePage = () => {
    const [orderInvoice, setOrderInvoice] = useState(null);
    const [orderPaymentHistory, setOrderPaymentHistory] = useState([]);
    const { data: session, status } = useSession();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    useEffect(() => {
        if (status === "authenticated") {
            const fetchOrderInvoice = async () => {
                try {
                    const invoiceData = await getProductOrderSummery(
                        orderId,
                        session?.accessToken
                    );
                    setOrderInvoice(invoiceData?.results);
                } catch (error) {
                    console.error("Failed to fetch order summary:", error);
                }
            };

            const fetchOrderPaymentHistory = async () => {
                try {
                    const orderPaymentData = await getOrderPaymentHistory(
                        orderId,
                        session?.accessToken
                    );
                    const orderPaymentResult = orderPaymentData?.results || {};
                    setOrderPaymentHistory(orderPaymentResult);
                } catch (error) {
                    console.error(
                        "Failed to fetch Order Payment History:",
                        error
                    );
                }
            };
            fetchOrderInvoice()
            fetchOrderPaymentHistory()
        }
    }, [session, status]);

    if (status === "loading") {
        return (
            <div className=" d-flex align-items-center justify-content-center vh-100">
                <h1 className="text-center">Loading... </h1>;
            </div>
        );
    }
    const invoiceProduct = orderInvoice?.products;

    return (
        <>
            <PrivateRoute>
                <div className=" container-fluid">
                    <div className="row invoice-wrapper">
                        <section className="invoice-section order-invoice-section-area col-12 pt-3 ps-4">
                            <div className="d-flex flex-column align-content-between h-100 ">
                                <div className="invoice-body flex-grow-1">
                                    <OrderInvoiceTop />
                                    <InvoiceProductDetail
                                        invoiceProduct={invoiceProduct}
                                        orderInvoice={orderInvoice}
                                    />
                                    <InvoicePaymentHistory
                                        orderInvoice={orderInvoice}
                                        orderPaymentHistory={
                                            orderPaymentHistory
                                        }
                                    />
                                </div>
                                <InvoiceFooter />
                            </div>
                        </section>
                    </div>
                </div>
            </PrivateRoute>
        </>
    );
};

export default OrderInvoicePage;
