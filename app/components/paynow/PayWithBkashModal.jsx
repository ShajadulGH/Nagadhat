import { getBkashToken } from "@/app/services/placeorder/getBkashToken";
import { postPaymentWithBkash } from "@/app/services/placeorder/postPaymentWithBkash";
import { useState } from "react";
import { toast } from "react-toastify";

const PayWithBkashModal = ({
    setShowBkashModal,
    showBkashModal,
    orderSummary,
    session,  // Added session prop
}) => {
    const [paytype, setPayType] = useState(1);
    const [amount, setAmount] = useState(orderSummary?.grand_total - orderSummary?.total_paid);

    const handleAmountChange = (e) => {
        const inputAmount = parseInt(e.target.value);
        // If the input amount exceeds the maximum, reset to max value
        if (inputAmount > orderSummary?.grand_total) {
            setAmount(orderSummary?.grand_total - orderSummary?.total_paid);
        } else {
            setAmount(inputAmount);
        }
    };
    
    const handleBkashPayment = async () => {
        // Bkash Payment API Call
        try {
            const data = {
                mode: "0011",
                payerReference: session?.phone,  // Assuming session is passed as prop
                callbackURL: `${window?.location?.origin}/bkash-callback?orderId=${orderSummary?.order_id}`,
                amount: paytype === 1 ? orderSummary?.grand_total - orderSummary?.total_paid : amount,
                currency: "BDT",
                intent: "sale",
                merchantInvoiceNumber: orderSummary?.order_id,
                paymentStatus: paytype
            };

            const token = await getBkashToken();
            // console.log({ data },  n { token });
            const response = await postPaymentWithBkash(token, data);
            // console.log(response);

            if (response?.message?.result?.bkashURL) {
                setShowBkashModal(false);
                // Redirect user to the bKash payment page
                window.location.href = response.message.result.bkashURL;
            } else {
                toast.error("Failed to initiate bKash payment.");
            }
        } catch (error) {
            console.error("Bkash payment error:", error);
            toast.error("Error processing Bkash payment. Please try again.");
        }
    };

    return (
        <>
            <div
                className={`modal fade ${showBkashModal ? "show" : ""}`}
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ display: showBkashModal ? "block" : "none", background: "#0000005c" }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Submit Payment Details</h1>
                            <button
                                type="button"
                                className="btn-close opacity-100 text-white"
                                data-bs-dismiss="modal"
                                onClick={() => setShowBkashModal(false)}
                                title="Close Modal"
                                style={{ color: "white" }}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex gap-3 align-items-center pb-3">
                                <label className=" p-1 d-flex gap-2 align-items-center">
                                    <input
                                        type="radio"
                                        name="paytype"
                                        value={1}  // Set value to 1 for Full Pay
                                        onChange={() => setPayType(1)}
                                        checked={paytype === 1}  // Controlled by paytype state
                                    />
                                    Full Pay
                                </label>
                                <label className="p-1 d-flex gap-2 align-items-center">
                                    <input
                                        type="radio"
                                        name="paytype"
                                        value={2}  // Set value to 2 for Persil Pay
                                        onChange={() => setPayType(2)}
                                        checked={paytype === 2}  // Controlled by paytype state
                                    />
                                    Partial Pay
                                </label>
                            </div>
                            {
                                paytype === 1 ? (
                                    <div className=" pb-3">
                                        <p>You will pay the full amount : {paytype === 1 ? orderSummary?.grand_total - orderSummary?.total_paid : amount}</p>
                                    </div>
                                ) : (
                                    <div className="form-group mb-3">
                                        <label className="form-label">
                                            Partial Pay Amount{" "}
                                            <span className="praymary-color">
                                                (Total payable: {orderSummary?.grand_total-orderSummary?.total_paid})
                                            </span>
                                        </label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">৳</span>
                                            </div>
                                            <input
                                                type="number"
                                                className="form-control withdraw_amount"
                                                name="amount"
                                                required
                                                placeholder="Enter Amount"
                                                onChange={handleAmountChange}
                                                value={amount}
                                                max={orderSummary?.grand_total || 0} // Set maximum allowed value
                                            />
                                        </div>
                                    </div>
                                )
                            }
                            <button className="add-to-cart-link border-0 ms-auto" onClick={handleBkashPayment}>
                                Pay now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PayWithBkashModal;
