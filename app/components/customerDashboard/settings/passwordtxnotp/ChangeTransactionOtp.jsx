"use client";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import TransactionOtpChoiceModal from "./TransactionOtpChoiceModal";
import { postManagePinOtp } from "@/app/services/affiliate/postManagePinOtp";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const ChangeTransactionOtp = () => {
    const [otpType, setOtpType] = useState("PIN"); // Default to PIN
    const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
    const { data: session, status } = useSession();
    const modalRef = useRef(null); // Reference for modal

    const handleOtpChange = (e) => {
        setOtpType(e.target.value);
    };

    const handleManageOtpChange =async () =>{
        try {
            const response = await postManagePinOtp(session?.accessToken)
            console.log(response);
            console.log(session?.accessToken);  
            if (response.code === 200) {
                // bootstrap modal close and rediract "manage-otp"
                const modalElement = modalRef.current;
                if (modalElement) {
                    const modalInstance = bootstrap.Modal.getInstance(modalElement);
                    modalInstance.hide(); // Close modal
                }
                // Redirect to withdraw request page with withdrawal ID as parameter
                route.push(`/finance-withdraw-request/${response.results.id}`);
                
            }else{
                toast.error(response.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }
    
    return (
        <div
            className="tab-pane fade"
            id="transaction-otp-pin"
            role="tabpanel"
        >
            <div>
                <div className="customer-setting-form-group ">
                    <label className="form-label" htmlFor="otp">
                        OTP Type
                    </label>
                    <select
                        className="form-select district-list"
                        name="otp"
                        id="otp"
                        value={otpType}
                        onChange={handleOtpChange}
                    >
                        <option value="PIN">PIN</option>
                        <option value="Mobile OTP">Mobile OTP</option>
                    </select>
                </div>

                {otpType === "PIN" && (
                    <div className="customer-setting-form-group">
                        <label
                            className="form-label"
                            htmlFor="transactionPIN"
                        >
                            Transaction PIN
                        </label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="transactionPIN"
                                placeholder="Enter PIN Number"
                            />
                            <span
                                className="password-view-icon"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                style={{ cursor: "pointer", zIndex: "6" }}
                            >
                                {showPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </span>
                        </div>
                    </div>
                )}

                {otpType === "Mobile OTP" && (
                    <div className="customer-setting-form-group">
                        <label
                            className="form-label"
                            htmlFor="mobileNumber"
                        >
                            Mobile Number
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="mobileNumber"
                            placeholder="Enter Mobile Number"
                        />
                    </div>
                )}

                <div className="pb-3">
                    <small>
                        If you change it once, then you can't change it
                        again.
                    </small>
                </div>
                <button
                    type="submit"
                    className="add-to-cart-link border-0 mx-auto"
                    data-bs-toggle="modal" 
                    data-bs-target="#TransactionOtp"
                >
                    {otpType === "PIN" ? "Update PIN" : "Update OTP"}
                </button>
            </div>
            <TransactionOtpChoiceModal handleManageOtpChange={handleManageOtpChange} modalRef={modalRef} />
        </div>
    );
};

export default ChangeTransactionOtp;
