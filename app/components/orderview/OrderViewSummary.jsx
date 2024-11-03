import Link from "next/link";
// import OrderViewProgressbar from "./OrderViewProgressbar";
import { FaChevronLeft } from "react-icons/fa";

const OrderViewSummary = ({ orderSummary }) => {
    return (
        <>
            <div className="row order-view-summary-area">
                <div className="col-md-12">
                    <div className="order-view-summary-bg rounded-2">
                        <div className="order-view-summary-title">
                            <h1 className="fw-bold text-capitalize">
                                Order Summary
                            </h1>
                        </div>
                        <div className="row order-view-summary-detail">
                            <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                <div className="order-view-summary-info">
                                    <p>
                                        <strong> Invoice:</strong>
                                    </p>
                                    <p>
                                        <strong> Customer:</strong>
                                    </p>
                                    <p>
                                        <strong> Email:</strong>
                                    </p>
                                    <p>
                                        <strong> Shipping Address:</strong>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                <div className="order-view-summary-info">
                                    <p>
                                        {orderSummary?.invoice
                                            ? orderSummary?.invoice
                                            : null}
                                    </p>
                                    <p>
                                        {orderSummary?.customer_name
                                            ? orderSummary?.customer_name
                                            : "Not Found"}
                                    </p>
                                    <p>
                                        {orderSummary?.customer_email
                                            ? orderSummary?.customer_email
                                            : "Email not found"}
                                    </p>
                                    <p>
                                        {orderSummary?.shipping_address
                                            ? orderSummary?.shipping_address
                                            : "Address not found"}
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                <div className="order-view-summary-info">
                                    <p>
                                        <strong>Order Date:</strong>
                                    </p>
                                    <p>
                                        <strong>Order Status:</strong>
                                    </p>
                                    <p>
                                        <strong>Total order amount:</strong>
                                    </p>
                                    <p>
                                        <strong>Delivery Note:</strong>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                <div className="order-view-summary-info">
                                    <p>
                                        {orderSummary?.date
                                            ? orderSummary?.date
                                            : null}
                                    </p>
                                    <p>
                                        {orderSummary?.order_status
                                            ? orderSummary?.order_status
                                            : null}
                                    </p>
                                    <p>
                                        ৳{" "}
                                        {orderSummary?.grand_total
                                            ? orderSummary?.grand_total
                                            : null}
                                    </p>
                                    <p>
                                        {orderSummary?.delivery_note
                                            ? orderSummary?.delivery_note
                                            : "----"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* <OrderViewProgressbar /> */}
                        <div className="row back-to-order-view">
                            <div className="col-md-12">
                                <div className="back-to-order-view-btn">
                                    <Link
                                        href="/orderhistory"
                                        className="btn btn-warning"
                                        data-abc="true"
                                    >
                                        <FaChevronLeft />
                                        Back to orders
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderViewSummary;
