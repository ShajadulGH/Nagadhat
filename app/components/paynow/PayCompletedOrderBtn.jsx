"use client";
import { useRouter } from "next/navigation";
import { postOderPayment } from "@/app/services/postOderPayment";
import { toast } from "react-toastify";

const PayCompletedOrderBtn = ({
    session,
    orderId,
    selectedOption,
    setShowAgentModal,
    setShowBankModal,
    setShowBkashModal,
    isTermsChecked,
    orderSummary,
}) => {
    const router = useRouter();

    // function for handleSubmit
    const handleSubmit = async () => {
        if (!session || !orderId) {
            toast.error("Order not found.");
            return;
        }
        if (selectedOption === "Cash On Delivery") {
            const paymentData = {
                order_id: orderId,
                user_name: session?.user?.name || "",
                transaction_amount: 0,
                payment_getway: selectedOption,
                payment_method: "",
                bank_name: "",
                transaction_id: "",
            };

            try {
                const orderPayment = await postOderPayment(
                    session?.accessToken,
                    paymentData
                );
                if (!orderPayment?.error) {
                    router.push(`/thankyou?orderId=${orderId}`);
                } else {
                    toast.error("Failed to process payment. Please try again.");
                }
            } catch (error) {
                console.error("Error submitting the order:", error);
                toast.error("Failed to process payment. Please try again.");
            }
        } else if (selectedOption === "With Agent") {
            setShowAgentModal(true);
        } else if (selectedOption === "With Bank") {
            setShowBankModal(true);
        } else if (selectedOption === "With Bkash") {
            setShowBkashModal(true);
        }
    };

    return (
        <>
            <button
                className="add-to-cart-link border-0 text-capitalize rounded-2"
                onClick={handleSubmit}
                style={{
                    pointerEvents:
                        isTermsChecked && selectedOption ? "auto" : "none",
                    opacity: isTermsChecked && selectedOption ? 1 : 0.5,
                }}
            >
                Payment{" "}
                {orderSummary?.order_product_type === "1"
                    ? selectedOption
                    : selectedOption === "Cash On Delivery"
                    ? "With Later"
                    : selectedOption}
            </button>
        </>
    );
};

export default PayCompletedOrderBtn;
