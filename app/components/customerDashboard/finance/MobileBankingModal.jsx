import { postWithdrawMobileBanking } from "@/app/services/affiliate-finance/postWithdrawMobileBanking";
import mobileBankingImg from "@/public/images/mobile-banking.png";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

const MobileBankingModal = ({ mobileBankingInfo, financeAgentInfo }) => {
    const [mobileBanking, setMobileBanking] = useState('');
    const [amount, setAmount] = useState("");
    const [charge, setCharge] = useState(0);
    const [payable, setPayable] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const { data: session } = useSession();
    const route = useRouter();
    const modalRef = useRef(null); // Reference for modal

    const maxAmount = parseInt(mobileBankingInfo?.total_withdrawable) || 0; // Get max withdrawable amount

    const handleAmountChange = (e) => {
        const inputAmount = parseFloat(e.target.value);

        if (isNaN(inputAmount) || inputAmount <= 0) {
            setAmount("");
            setCharge(0);
            setPayable(0);
            setIsButtonDisabled(true);
            return;
        }

        // If the input amount exceeds the maximum, reset to max value
        if (inputAmount > maxAmount) {
            setAmount(maxAmount);
        } else {
            setAmount(inputAmount);
        }

        const chargeAmount = (inputAmount > maxAmount ? maxAmount : inputAmount) * 0.1; // 10% charge
        const payableAmount = (inputAmount > maxAmount ? maxAmount : inputAmount) - chargeAmount;

        setCharge(chargeAmount);
        setPayable(payableAmount);
    };

    useEffect(() => {
        // Disable button if amount is less than minimum, exceeds balance, or agent is not selected
        if (amount < 500 || amount > maxAmount || !mobileBanking) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
    }, [amount, mobileBanking]);

    const handleWithdrawRequest = async () => {
        const selectedAccount = mobileBankingInfo?.data?.find(item => item.name == mobileBanking)?.account_number;

        const data = {
            bank_id: mobileBankingInfo?.bank_id,
            billing_method: mobileBanking,
            account_number: selectedAccount,
            amount: amount
        };

        try {
            const response = await postWithdrawMobileBanking(session?.accessToken, data);
            console.log("Withdrawal successful", response);
            if (response.code === 200) {
                // Close modal programmatically
                const modalElement = modalRef.current;
                if (modalElement) {
                    const modalInstance = bootstrap.Modal.getInstance(modalElement);
                    modalInstance.hide(); // Close modal
                }

                // Redirect to withdraw request page with withdrawal ID as parameter
                route.push(`/finance-withdraw-request/${response.results.id}`);
            }else{
                toast.error(response.message)
            }
        } catch (error) {
            console.error("Error while withdrawing:", error);
        }
    };

    return (
        <div
            className="modal fade"
            id="mobileBankingModal"
            tabIndex="-1"
            aria-labelledby="mobileBankingModalLabel"
            aria-hidden="true"
            ref={modalRef} // Attach ref here
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="mobileBankingModalLabel">
                            Withdraw With Mobile Banking
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="container d-flex flex-column gap-3">
                            <div className="text-center">
                                <Image
                                    height={200}
                                    width={300}
                                    className="img-fluid"
                                    style={{ width: "50%" }}
                                    src={mobileBankingImg}
                                    alt="Withdraw with mobile banking"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="withdrawto">
                                    Withdraw to
                                </label>
                                <select
                                    className="custom-select form-control"
                                    name="billing_method"
                                    required
                                    onChange={(e) => setMobileBanking(e.target.value)}
                                >
                                    <option value="">
                                        Select Payment Gateway
                                    </option>
                                    {mobileBankingInfo?.data?.map((item, index) => (
                                        <option key={index} value={item?.name}>
                                            {item?.name} - {item?.account_number}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">
                                    Amount{" "}
                                    <span className="primary-color">
                                        (Balance: {mobileBankingInfo?.total_withdrawable || "N/A"})
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
                                        value={amount}
                                        onChange={handleAmountChange}
                                        max={mobileBankingInfo?.total_withdrawable || 0} // Set maximum allowed value
                                        min={500} // Set minimum allowed value
                                        defaultValue={500}
                                    />
                                </div>
                            </div>

                            { amount && (
                                <div className="form-group paySheet">
                                    <p className="mb-0">Amount: {amount || 0}</p>
                                    <p className="mb-0">Charge: {charge.toFixed(2)}</p>
                                    <p className="mb-0">Payable: {payable.toFixed(2)}</p>
                                </div>
                            )}

                            <button
                                onClick={handleWithdrawRequest}
                                className={`w-100 add-to-cart-link border-0 ${isButtonDisabled ? 'disabled-button' : ''}`}
                                disabled={isButtonDisabled}
                            >
                                Continue
                            </button>

                            <div>
                                <p className="text-muted">10% service charge applicable.</p>
                                <p className="text-muted">Minimum withdrawal Amount 500.00 ৳</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileBankingModal;
