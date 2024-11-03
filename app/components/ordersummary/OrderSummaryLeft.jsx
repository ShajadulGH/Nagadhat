"use client";
import DownloadInvoiceBtn from "./DownloadInvoiceBtn";
import OrderShippingAddress from "./OrderShippingAddress";
import TrackYourOrderBtn from "./TrackYourOrderBtn";

const OrderSummaryLeft = ({ orderSummary }) => {
    const messages = {
        1: "Thank you for your purchase!",
        2: "Thank You!",
        3: "Thank you for your Container Product purchase!",
    };

    const message = messages[orderSummary?.order_product_type];

    return (
        <>
            <div className="col-lg-5">
                <div className="order-billing-info">
                    <div className="thank-you">
                        {message && <h1>{message}</h1>}
                        {orderSummary?.order_product_type === "2" ? (
                            <>
                                <p className="pb-2">
                                    Your product resale application has been
                                    successfully received, and we have already
                                    started working on it. We are delighted to
                                    welcome you as a part of Nagadhat Bangladesh
                                    Limited.
                                </p>
                                <p className="pb-2">
                                    Your products are now live on our platform,
                                    and we are confident that with your
                                    collaboration, we will achieve even greater
                                    success and help your business reach new
                                    heights.
                                </p>
                                <p className="pb-2">
                                    If you need any assistance, please feel free
                                    to contact us anytime.
                                </p>
                                <p className="pb-2">
                                    Best regards,
                                    <br />{" "}
                                    <strong>Nagadhat Bangladesh Limited</strong>
                                    <br /> Committed to Fulfilling Expectations
                                </p>
                            </>
                        ) : (
                            <p>
                                Your order will be processed within 24 hours
                                during working days. We will notify you by email
                                once your order has been shipped.
                            </p>
                        )}
                    </div>
                    {orderSummary?.order_product_type === "1" && (
                        <OrderShippingAddress orderSummary={orderSummary} />
                    )}

                    <div className="billing-btn-area">
                        <TrackYourOrderBtn />
                        <DownloadInvoiceBtn orderSummary={orderSummary} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderSummaryLeft;
