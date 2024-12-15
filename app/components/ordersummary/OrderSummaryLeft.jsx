"use client";
import DownloadInvoiceBtn from "./DownloadInvoiceBtn";
import OrderShippingAddress from "./OrderShippingAddress";
import TrackYourOrderBtn from "./TrackYourOrderBtn";

const OrderSummaryLeft = ({ orderSummary }) => {
    console.log("orderSummary====>", { orderSummary });

    // const message = messages[orderSummary?.order_product_type];
    const agent = orderSummary?.payment_gateway === 1;
    const bank = orderSummary?.payment_gateway === 2;
    const bkash = orderSummary?.payment_gateway === 3;
    const paylater =
        (orderSummary?.payment_gateway === 4 &&
            orderSummary?.order_product_type === "2") ||
        (orderSummary?.payment_gateway === 4 &&
            orderSummary?.order_product_type === "3");
    const cashOnDelivery =
        orderSummary?.payment_gateway === 4 &&
        orderSummary?.order_product_type === "1";
    const saleOnNagadhat = orderSummary?.payment_gateway === 5;

    return (
        <>
            <div className="col-lg-5">
                <div className="order-billing-info">
                    <div className="thank-you">
                        <div className="d-flex justify-content-between gap-3">
                            <span className="d-lg-none">
                                <DownloadInvoiceBtn
                                    orderSummary={orderSummary}
                                />
                            </span>
                        </div>
                        {agent && (
                            <>
                                <h1>
                                    Thank You! <br></br>
                                    Your order has been successfully received.
                                </h1>
                                <p>
                                    The payment process is currently pending
                                    confirmation by the agent. Once the agent
                                    confirms the payment, your order will be
                                    finalized and processed accordingly.
                                </p>
                                <p>
                                    Thank you for choosing us!<br></br>
                                    NagadHaat - Committed to fulfilling your
                                    expectations.
                                </p>
                            </>
                        )}

                        {bank && (
                            <>
                                <h1>
                                    Thank You!<br></br>
                                    Your order has been successfully received.
                                </h1>
                                <p>
                                    You have chosen bank payment for your order.
                                    Our accounts department will verify your
                                    payment shortly. Once the payment is
                                    confirmed, your order will be finalized and
                                    processed.
                                </p>
                                <p>
                                    Thank you for choosing NagadHat!<br></br>
                                    Committed to fulfilling your expectations.
                                </p>
                            </>
                        )}

                        {/* {orderSummary?.order_product_type === "2" ? (
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
                        )} */}
                    </div>

                    {/* {orderSummary?.order_product_type === "1" ||
                        (orderSummary?.order_product_type === "4" && (
                            <OrderShippingAddress orderSummary={orderSummary} />
                        ))} */}

                    <div className="billing-btn-area">
                        <TrackYourOrderBtn orderSummary={orderSummary} />
                        <span className="d-none d-lg-block">
                            <DownloadInvoiceBtn orderSummary={orderSummary} />
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderSummaryLeft;
