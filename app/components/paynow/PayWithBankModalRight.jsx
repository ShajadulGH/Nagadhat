"use client";
import { PostOrderFullPaymentWithBank } from "@/app/services/bank/PostOrderFullPaymentWithBank";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
const BankSubmitPaymentBtn = dynamic(() => import("./BankSubmitPaymentBtn"));

const PayWithBankModalRight = ({
    orderSummary,
    bankList,
    setShowBankModal,
}) => {
    let paymentAmount = orderSummary?.grand_total - orderSummary?.total_paid;
    let depositorName = orderSummary?.customer_name || "";
    let phone = orderSummary?.customer_phone || "";
    let orderId = orderSummary?.order_id;

    const [selectedBank, setSelectedBank] = useState("");
    const [depositCode, setDepositCode] = useState("");
    const [paymentNote, setPaymentNote] = useState("");
    const [paymentSlip, setPaymentSlip] = useState(null);
    const [formError, setFormError] = useState("");

    const { data: session, status } = useSession();
    const router = useRouter();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Check if session is loaded
        if (status !== "authenticated") {
            setFormError("You need to be logged in to submit the payment.");
            return;
        }
        if (!selectedBank) {
            setFormError("Please select a bank.");
            return;
        }
        if (!depositCode) {
            setFormError("Please Enter a Deposit Code.");
            return;
        }

        const formData = new FormData();
        formData.append("order_id", orderId);
        formData.append("account_head_id", selectedBank);
        formData.append("payment_getway", "Bank Payment");
        formData.append("note_1", paymentNote);
        formData.append("d_code", depositCode);
        formData.append("payment_slip", paymentSlip || "");

        try {
            const response = await PostOrderFullPaymentWithBank(
                session?.accessToken,
                formData
            );

            if (!response?.error) {
                toast.success("", response?.message);
                setShowBankModal(false);
                router.push(`/thankyou?orderId=${orderId}`);
            } else {
                toast.error(response?.message);
            }
        } catch (error) {
            console.error("Payment submission failed:", error);
            setFormError("Payment submission failed. Please try again.");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validFileTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "application/pdf",
            ];
            if (validFileTypes.includes(file.type)) {
                setPaymentSlip(file);
                setFormError("");
            } else {
                setFormError(
                    "Invalid file type. Please upload a JPG,JPEG, PNG, or PDF."
                );
            }
        }
    };

    return (
        <div className="col-md-8">
            <ToastContainer />
            <div className="bg-body-secondary px-3 pt-4 pb-4">
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-3 d-flex gap-2">
                        <div className="col">
                            <label htmlFor="Order_Id" className="form-label">
                                Order Id
                            </label>
                            <p className="form-control" id="Order_Id">
                                {orderSummary?.invoice}
                            </p>
                        </div>
                        <div className="col">
                            <label
                                htmlFor="payment_amount"
                                className="form-label"
                            >
                                Payment Amount
                            </label>
                            <p className="form-control">{paymentAmount}</p>
                        </div>
                    </div>

                    <div className="mb-3 d-flex gap-2">
                        <div className="col">
                            <label htmlFor="select_bank" className="form-label">
                                Select Bank{" "}
                                <span className="text-danger">*</span>
                            </label>
                            <select
                                className="form-select"
                                id="select_bank"
                                name="payment_getway"
                                value={selectedBank}
                                onChange={(e) =>
                                    setSelectedBank(e.target.value)
                                }
                                required
                            >
                                <option value="" disabled>
                                    Select a bank
                                </option>
                                {bankList?.length > 0 ? (
                                    bankList?.map((item) => (
                                        <option key={item?.id} value={item?.id}>
                                            {item?.bank_name}
                                        </option>
                                    ))
                                ) : (
                                    <option>No Bank List Available</option>
                                )}
                            </select>
                        </div>
                        <div className="col">
                            <label
                                htmlFor="depositor_name"
                                className="form-label"
                            >
                                Depositor's Name
                            </label>
                            <p className="form-control" id="depositor_name">
                                {depositorName}
                            </p>
                        </div>
                    </div>

                    <div className="mb-3 d-flex gap-2">
                        <div className="col">
                            <label htmlFor="phone" className="form-label">
                                Depositor's Phone
                            </label>
                            <p className="form-control" id="phone">
                                {phone}
                            </p>
                        </div>
                        <div className="col">
                            <label
                                htmlFor="deposit_code"
                                className="form-label"
                            >
                                Deposit Code (DC){" "}
                                <span className="text-danger ">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="deposit_code"
                                value={depositCode}
                                onChange={(e) => setDepositCode(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3 d-flex gap-2">
                        <div className="col">
                            <label
                                htmlFor="payment_note"
                                className="form-label"
                            >
                                Payment Note (Optional)
                            </label>
                            <textarea
                                className="form-control"
                                id="payment_note"
                                rows="3"
                                name="note_1"
                                value={paymentNote}
                                onChange={(e) => setPaymentNote(e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    <div className="mb-3 d-flex gap-2">
                        <div className="col">
                            <label
                                htmlFor="payment_slip"
                                className="form-label"
                            >
                                Upload Payment Slip (Optional)
                            </label>
                            <input
                                className="form-control"
                                type="file"
                                id="payment_slip"
                                name="payment_slip"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    {formError && (
                        <div className="alert alert-danger">{formError}</div>
                    )}

                    <BankSubmitPaymentBtn />
                </form>
            </div>
        </div>
    );
};

export default PayWithBankModalRight;
