"use client";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FaChevronLeft } from "react-icons/fa6";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import DefaultLoader from "../defaultloader/DefaultLoader";
// import PayWithBkashModal from "./PayWithBkashModal";
const PayCompletedOrderBtn = dynamic(() => import("./PayCompletedOrderBtn"), {
    ssr: false,
});
const PayWithBankModal = dynamic(() => import("./PayWithBankModal"), {
    ssr: false,
});
const PayWithBkashModal = dynamic(() => import("./PayWithBkashModal"), {
    ssr: false,
});
const PayWithAgentModal = dynamic(() => import("./PayWithAgentModal"), {
    ssr: false,
});

const PayNowPaymentOption = ({ orderSummary, isPending }) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [showAgentModal, setShowAgentModal] = useState(false);
    const [showBankModal, setShowBankModal] = useState(false);
    const [showBkashModal, setShowBkashModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const { status, data: session } = useSession();
    const [isTermsChecked, setIsTermsChecked] = useState(false);

    const paymentOptions = [
        { id: "With Agent", src: "/images/Agent-Pay.png", alt: "Agent Pay" },
        {
            id: "With Bank",
            src: "/images/bank-deposit.png",
            alt: "Bank Deposit",
        },
        {
            id: "Cash On Delivery",
            src: "/images/cash-on.png",
            alt: "Cash on Delivery",
        },
        { id: "Bkash", src: "/images/Bkash.png", alt: "Bkash" },

        { id: "sslcommerz", src: "/images/sslcommerz.png", alt: "SSLCommerz" },
    ];

    //filteredPaymentOptions order_product_type !== "1"

    const filteredPaymentOptions =
        orderSummary?.order_product_type !== "1"
            ? paymentOptions
                .map((option) =>
                    option.id === "Cash On Delivery"
                        ? {
                            id: "Cash On Delivery",
                            src: "/images/Pay-Later.png",
                            alt: "Pay later",
                        }
                        : option
                )
                .filter(
                    (option) =>
                        option.id !== "bkash" && option.id !== "sslcommerz"
                )
            : paymentOptions;

    const handleOptionClick = (optionId) => {
        // if (!isTermsChecked) {
        //     toast.error("Please first check the terms and conditions.");
        //     setErrorMsg("Please first check the terms and conditions.");
        //     return;
        // }

        switch (optionId) {
            case "Cash On Delivery":
                setSelectedOption(optionId);
                break;
            case "With Agent":
                setSelectedOption(optionId);
                break;
            case "With Bank":
                setSelectedOption(optionId);
                break;
            case "Bkash":
                setSelectedOption(optionId);
                break;
            default:
                toast.error(
                    "This payment option is not available at the moment."
                );
                break;
        }
    };

    return (
        <div className="col-lg-8">
            <ToastContainer />
            {isPending ? (
                <DefaultLoader />
            ) : orderSummary?.payment_status === "Unpaid" ||
                orderSummary?.payment_status === "Partial" ? (
                <>
                    <div className="pay-now-payment-option-bg bg-white">
                        <div className="pay-now-payment-option-title">
                            <h1>Select a payment option</h1>
                        </div>
                        <div className="pay-now-payment-option-img">
                            {filteredPaymentOptions.map((option) => (
                                <div
                                    key={option.id}
                                    className={`pay-now-payment-option-img-box rounded-3 ${selectedOption === option.id
                                            ? "selected"
                                            : ""
                                        }`}
                                    onClick={() => handleOptionClick(option.id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="pay-now-payment-option-img-item">
                                        <Image
                                            fill={true}
                                            src={option.src}
                                            className="img-fluid"
                                            alt={option.alt}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="pay-now-terms-condition-area">
                        <div className="pay-now-terms-condition">
                            {errorMsg && !isTermsChecked && (
                                <p className="text-danger pb-2">{errorMsg}</p>
                            )}
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="exampleCheck1"
                                    onChange={() =>
                                        setIsTermsChecked(!isTermsChecked)
                                    }
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="exampleCheck1"
                                >
                                    I agree to the terms and conditions, return
                                    policy, and privacy policy
                                </label>
                            </div>
                        </div>

                        <div className="pay-now-return-shop d-flex align-items-center justify-content-between">
                            <div className="pay-now-return-shop-item">
                                <Link href="/">
                                    <FaChevronLeft />
                                    Return to Shop
                                </Link>
                            </div>

                            <PayCompletedOrderBtn
                                session={session}
                                orderId={orderId}
                                selectedOption={selectedOption}
                                setShowAgentModal={setShowAgentModal}
                                setShowBankModal={setShowBankModal}
                                setShowBkashModal={setShowBkashModal}
                                isTermsChecked={isTermsChecked}
                                orderSummary={orderSummary}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <div className="d-flex align-items-center justify-content-center h-100">
                    <h4>Already Paid</h4>
                </div>
            )}

            {showAgentModal && (
                <PayWithAgentModal
                    showAgentModal={showAgentModal}
                    setShowAgentModal={setShowAgentModal}
                    orderSummary={orderSummary}
                />
            )}
            {showBankModal && (
                <PayWithBankModal
                    showBankModal={showBankModal}
                    setShowBankModal={setShowBankModal}
                    orderSummary={orderSummary}
                />
            )}
            {showBkashModal && (
                <PayWithBkashModal
                    showBkashModal={showBkashModal}
                    setShowBkashModal={setShowBkashModal}
                    orderSummary={orderSummary}
                    session={session}
                />
            )}
        </div>
    );
};

export default PayNowPaymentOption;
