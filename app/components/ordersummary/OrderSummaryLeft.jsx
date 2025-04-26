"use client";
import DownloadInvoiceBtn from "./DownloadInvoiceBtn";
import OrderShippingAddress from "./OrderShippingAddress";
import TrackYourOrderBtn from "./TrackYourOrderBtn";

const OrderSummaryLeft = ({ orderSummary }) => {
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
    const privilegeCard =
        orderSummary?.payment_gateway === 4 &&
        orderSummary?.order_product_type === "4";
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
                                <h1>Thank You!</h1>
                                <h4 className="mb-2">
                                    Your order has been successfully placed.
                                </h4>
                                <p className="pb-2">
                                    The payment process is currently pending
                                    confirmation by the agent. Once the agent
                                    confirms the payment, your order will be
                                    finalized and processed accordingly.
                                </p>
                                <p>
                                    Thank you for choosing us!<br></br>
                                    NagadHat - Committed to fulfilling your
                                    expectations.
                                </p>
                            </>
                        )}

                        {bank && (
                            <>
                                <h1>Thank You!</h1>
                                <h4 className="mb-2">
                                    Your order has been successfully placed.
                                </h4>
                                <p className="pb-2">
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

                        {bkash && (
                            <>
                                <h1>Thank You!</h1>
                                <h4 className="mb-2">
                                    Your order has been successfully placed.
                                </h4>
                                <p className="pb-2">
                                    We have confirmed your payment via bKash.
                                    Your order is now being processed and will
                                    be prepared for delivery shortly.
                                </p>
                                <p>
                                    Thank you for choosing NagadHat!
                                    <br />
                                    Committed to fulfilling your expectations.
                                </p>
                            </>
                        )}

                        {paylater && (
                            <>
                                <h1>Thank You!</h1>
                                <h4 className="mb-2">
                                    Your order has been successfully placed.
                                </h4>
                                <p className="pb-2">
                                    You have selected Pay Later as your payment
                                    method. Please complete the payment within
                                    the specified time frame following our
                                    instructions. Once the payment is completed,
                                    your order will be finalized and processed.
                                </p>
                                <p>
                                    Thank you for choosing NagadHat!
                                    <br />
                                    Committed to fulfilling your expectations.
                                </p>
                            </>
                        )}

                        {cashOnDelivery && (
                            <>
                                <h1>Thank You!</h1>
                                <h4 className="mb-2">
                                    Your order has been successfully placed.
                                </h4>
                                <p className="pb-2">
                                    You have chosen Cash on Delivery as your
                                    payment method. Payment will be collected at
                                    the time of delivery, after which your order
                                    will be completed.
                                </p>
                                <p>
                                    Thank you for choosing NagadHat! <br />
                                    Committed to fulfilling your expectations.
                                </p>
                            </>
                        )}
                        {privilegeCard && (
                            <>
                                <h1>Thank You!</h1>
                                <h4 className="mb-2">
                                    Your order has been successfully placed.
                                </h4>
                            </>
                        )}
                    </div>

                    <OrderShippingAddress orderSummary={orderSummary} />

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
