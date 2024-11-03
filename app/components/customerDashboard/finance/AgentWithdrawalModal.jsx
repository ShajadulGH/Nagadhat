"use client";
import { postAgentWithdraw } from "@/app/services/affiliate-finance/postAgentWithdraw";
import agentImg from "@/public/images/agent.png";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const AgentWithdrawalModal = ({
    financeAgentInfo,
    mobileBankingList,
    bankTransferData,
}) => {
    const [agentWithdrawMethod, setAgentWithdrawMethod] = useState(1);
    const [agentId, setAgentId] = useState(null);
    const [accountType, setAccountType] = useState('');
    const [amount, setAmount] = useState("");
    const [charge, setCharge] = useState(0);
    const [payable, setPayable] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const { data: session } = useSession();
    const route = useRouter();
    const modalRef = useRef(null); // Reference for modal

    const maxAmount = parseInt(financeAgentInfo?.total_withdrawable) || 0; // Get max withdrawable amount

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

        // Disable button if amount is less than minimum, exceeds balance, or agent is not selected
        if (inputAmount < 500 ||
            inputAmount > maxAmount ||
            !agentId
        ) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
    };

    useEffect(() => {
        // Disable button if amount is less than minimum, exceeds balance, or agent is not selected
        if (amount < 500 || amount > maxAmount || !agentId || !agentWithdrawMethod) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
    }, [amount, agentId, agentWithdrawMethod])
    
    const handleWithdrawRequest = async () => {
        let selectedAccount = null;
        if (agentWithdrawMethod == 3) {
            selectedAccount = bankTransferData.account_number;
        }else if (agentWithdrawMethod == 2){
            selectedAccount = mobileBankingList?.find(item => item.name == accountType)?.account_number;
        }else{
            selectedAccount = null;
        }
         
        const data = {
            bank_id: financeAgentInfo?.bank_id,
            agent_id: parseInt(agentId),
            billing_method: "Nagadhat Agent",
            billing_type: agentWithdrawMethod,
            account_type: accountType,
            account_number: selectedAccount,
            amount: amount
        };

        try {
            const response = await postAgentWithdraw(session?.accessToken, data);
            if (response.code === 200) {
                // Close modal programmatically
                const modalElement = modalRef.current;
                if (modalElement) {
                    const modalInstance = bootstrap.Modal.getInstance(modalElement);
                    modalInstance.hide(); // Close modal
                }
                // Redirect to withdraw request page with withdrawal ID as parameter
                route.push(`/finance-withdraw-request/${response.results.id}`);
            } else {
                toast.error(response.message)
                console.log("Withdrawal error", response);
            }
        } catch (error) {
            console.error("Error while withdrawing:", error);
        }
    };

    return (
        <div
            className="modal fade"
            id="agentModel"
            tabIndex="-1"
            aria-labelledby="agentModalLabel"
            aria-hidden="true"
            ref={modalRef} // Attach ref here
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="agentModalLabel">
                            Withdraw With Agent
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="container d-flex gap-3 flex-column">
                            <div className="text-center">
                                <Image
                                    height={200}
                                    width={300}
                                    className="img-fluid"
                                    style={{ width: "50%" }}
                                    src={agentImg}
                                    alt="Pay with agent"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="AgentName">
                                    Withdraw by
                                </label>
                                <select
                                    onChange={(e) => setAgentId(e.target.value)}
                                    className="custom-select form-control"
                                    name="agent_id"
                                    required
                                >
                                    <option defaultValue="Select Agent">
                                        Select Agent
                                    </option>
                                    {financeAgentInfo?.agents?.map((item) => (
                                        <option key={item?.agent_id} value={item?.agent_id}>
                                            {item?.name} - {item?.phone}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div id="payment_getway_selector">
                                <div className="d-flex gap-2 align-items-center justify-content-center">
                                    <label className="text-center p-1 d-flex gap-2 align-items-center">
                                        <input
                                            type="radio"
                                            name="slug_tier_1"
                                            value="Cash"
                                            onChange={() => setAgentWithdrawMethod(1)}
                                            defaultChecked
                                        />
                                        Cash
                                    </label>
                                    <label className="text-center p-1 d-flex gap-2 align-items-center">
                                        <input
                                            type="radio"
                                            name="slug_tier_1"
                                            value="Mobile_Banking"
                                            onChange={() => setAgentWithdrawMethod(2)}
                                        />
                                        Mobile Banking
                                    </label>
                                    <label className="text-center p-1 d-flex gap-2 align-items-center">
                                        <input
                                            type="radio"
                                            name="slug_tier_1"
                                            value="Bank"
                                            onChange={() => setAgentWithdrawMethod(3)}
                                        />
                                        Bank Transfer
                                    </label>
                                </div>
                            </div>
                            {agentWithdrawMethod == 2 && (
                                <div className="form-group" id="mobile_banking_billing_method_selector">
                                    <label className="form-label" htmlFor="withdrawto">
                                        Mobile Billing Method
                                    </label>
                                    <select
                                        className="custom-select form-control" name="mobile_banking_billing_method"
                                        onChange={(e) => setAccountType(e.target.value)}
                                    >
                                        <option defaultValue="Select Billing Method">
                                            Select Billing Method
                                        </option>
                                        {mobileBankingList?.map((item, index) => (
                                            <option key={index} value={item?.name}>
                                                {item?.name} - {item?.account_number}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {agentWithdrawMethod == 3 && (
                                <div className="form-group" id="bank_billing_method_selector">
                                    <label className="form-label" htmlFor="withdrawto">
                                        Bank Billing Method
                                    </label>
                                    <select
                                        className="custom-select form-control" name="bank_billing_method"
                                        onChange={(e) => setAccountType(e.target.value)}
                                    >
                                        <option defaultValue="Select Billing Method">
                                            Select Billing Method
                                        </option>
                                        <option value={bankTransferData?.name}>
                                            {bankTransferData?.name} - {bankTransferData?.account_number}
                                        </option>
                                    </select>
                                </div>
                            )}

                            <div className="form-group">
                                <label className="form-label">
                                    Amount{" "}
                                    <span className="praymary-color">
                                        (Balance: {financeAgentInfo?.total_withdrawable || "N/A"})
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
                                        max={financeAgentInfo?.total_withdrawable || 0} // Set maximum allowed value
                                        min={500} // Set minimum allowed value
                                        defaultValue={500}
                                    />
                                </div>
                            </div>

                            {amount && (
                                <div className="form-group paySheet">
                                    <p className="mb-0">Amount: {amount || 0}</p>
                                    <p className="mb-0">Charge: {charge.toFixed(2)}</p>
                                    <p className="mb-0">Payable: {payable.toFixed(2)}</p>
                                </div>
                            )}

                            <button
                                onClick={handleWithdrawRequest}
                                className={`w-100 add-to-cart-link border-0 ${isButtonDisabled ? 'disabled-button' : ''}`}
                                type="submit"
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

export default AgentWithdrawalModal;
