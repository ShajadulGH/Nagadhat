"use client";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import TransactionOtpChoiceModal from "./TransactionOtpChoiceModal";
import { postManagePinOtp } from "@/app/services/affiliate/postManagePinOtp";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/app/services/affiliate/getUserInfo";

const ChangeTransactionOtp = () => {
    const { data: session } = useSession();
    const [otpType, setOtpType] = useState("pin");
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [status, setStatus] = useState(0);
    const modalRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            const response = await getUserInfo(session.accessToken)
            if (response.code === 200) {
                setMobileNumber(response?.results?.phone)
                setStatus(response?.results?.status)
            }
            console.log(response);
        }
        getData();

    }, [session?.accessToken])
=======
import { useState } from "react";
=======
import { useRef, useState } from "react";
>>>>>>> e134429 (updated)
=======
import { useEffect, useRef, useState } from "react";
>>>>>>> c642eee (Manage Pin or Otp)
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import TransactionOtpChoiceModal from "./TransactionOtpChoiceModal";
import { postManagePinOtp } from "@/app/services/affiliate/postManagePinOtp";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/app/services/affiliate/getUserInfo";

const ChangeTransactionOtp = () => {
<<<<<<< HEAD
    const [otpType, setOtpType] = useState("PIN"); // Default to PIN
    const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
<<<<<<< HEAD
>>>>>>> 88913d0 (updated)
=======
    const { data: session, status } = useSession();
    const modalRef = useRef(null); // Reference for modal
>>>>>>> e134429 (updated)
=======
    const { data: session } = useSession();
    const [otpType, setOtpType] = useState("pin");
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [status, setStatus] = useState(0);
    const modalRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            const response = await getUserInfo(session.accessToken)
            if (response.code === 200) {
                setMobileNumber(response?.results?.phone)
                setStatus(response?.results?.status)
            }
            console.log(response);
        }
        getData();

    }, [session?.accessToken])
>>>>>>> c642eee (Manage Pin or Otp)
=======
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import TransactionOtpChoiceModal from "./TransactionOtpChoiceModal";

const ChangeTransactionOtp = () => {
    const [otpType, setOtpType] = useState("PIN"); // Default to PIN
    const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
>>>>>>> 7764139 (updated)

    const handleOtpChange = (e) => {
        setOtpType(e.target.value);
    };
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

    const handleManagePin = () => {
        if (otpType === "pin" && !pin) {
            toast.error("PIN is required");
            return;
        }
        if (otpType === "mobile" && !mobileNumber) {
            toast.error("Mobile number is required");
            return;
        }
        if (confirmPin != pin) {
            toast.error("PINs do not match. Please try again.");
            return;
        }
        const modalElement = modalRef.current;
        if (modalElement) {
            const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
            modalInstance.show(); // Show modal
        }
    };

    const handleManageOtpChange = async () => {
        if (otpType === "pin" && !pin) {
            toast.error("PIN is required");
            return;
        }
        try {
            if (!session?.accessToken) {
                toast.error("Session expired. Please log in again.");
                return;
            }
            const response = await postManagePinOtp(session.accessToken);
            if (response.code === 200) {
                // toast.success(response.message);
=======

    const handleManagePin = () => {
        if (otpType === "pin" && !pin) {
            toast.error("PIN is required");
            return;
        }
        if (otpType === "mobile" && !mobileNumber) {
            toast.error("Mobile number is required");
            return;
        }
        if (confirmPin != pin) {
            toast.error("PINs do not match. Please try again.");
            return;
        }
        const modalElement = modalRef.current;
        if (modalElement) {
            const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
            modalInstance.show(); // Show modal
        }
    };

    const handleManageOtpChange = async () => {
        if (otpType === "pin" && !pin) {
            toast.error("PIN is required");
            return;
        }
        try {
            if (!session?.accessToken) {
                toast.error("Session expired. Please log in again.");
                return;
            }
            const response = await postManagePinOtp(session.accessToken);
            if (response.code === 200) {
<<<<<<< HEAD
                // bootstrap modal close and rediract "manage-otp"
>>>>>>> e134429 (updated)
=======
                // toast.success(response.message);
>>>>>>> c642eee (Manage Pin or Otp)
                const modalElement = modalRef.current;
                if (modalElement) {
                    const modalInstance = bootstrap.Modal.getInstance(modalElement);
                    modalInstance.hide(); // Close modal
                }
<<<<<<< HEAD
<<<<<<< HEAD
                router.push(`/others-password-txn-otp/manage-otp?otpType=${otpType}&pin=${pin}`);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update OTP. Please try again.");
        }
    };

    return (
        <div className="tab-pane fade" id="transaction-otp-pin" role="tabpanel">
            <div>
                <div className="customer-setting-form-group">
=======
=======
                // Redirect to withdraw request page with withdrawal ID as parameter
                route.push(`/finance-withdraw-request/${response.results.id}`);
                
            }else{
=======
                router.push(`/others-password-txn-otp/manage-otp?otpType=${otpType}&pin=${pin}`);
            } else {
>>>>>>> c642eee (Manage Pin or Otp)
                toast.error(response.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update OTP. Please try again.");
        }
<<<<<<< HEAD
    }
>>>>>>> e134429 (updated)
    
=======
    };

>>>>>>> c642eee (Manage Pin or Otp)
    return (
        <div className="tab-pane fade" id="transaction-otp-pin" role="tabpanel">
            <div>
<<<<<<< HEAD
                <div className="customer-setting-form-group ">
>>>>>>> 88913d0 (updated)
=======
                <div className="customer-setting-form-group">
>>>>>>> c642eee (Manage Pin or Otp)
=======
    
    return (
        <div
            className="tab-pane fade"
            id="transaction-otp-pin"
            role="tabpanel"
        >
            <div>
                <div className="customer-setting-form-group ">
>>>>>>> 7764139 (updated)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                        <option value="pin">PIN</option>
                        <option value="mobile">Mobile OTP</option>
                    </select>
                </div>

                {otpType === "pin" && (
                    <div className="customer-setting-form-group">
                        <label className="form-label" htmlFor="transactionPIN">
                            Transaction PIN
=======
                        <option value="PIN">PIN</option>
                        <option value="Mobile OTP">Mobile OTP</option>
=======
                        <option value="pin">PIN</option>
                        <option value="mobile">Mobile OTP</option>
>>>>>>> c642eee (Manage Pin or Otp)
                    </select>
                </div>

                {otpType === "pin" && (
                    <div className="customer-setting-form-group">
                        <label className="form-label" htmlFor="transactionPIN">
=======
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
>>>>>>> 7764139 (updated)
                            Transaction PIN
                        </label>
                        <div className="input-group">
                            <input
<<<<<<< HEAD
                                onChange={(e) => setPin(e.target.value)}
=======
>>>>>>> 7764139 (updated)
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="transactionPIN"
                                placeholder="Enter PIN Number"
                            />
                            <span
                                className="password-view-icon"
<<<<<<< HEAD
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ cursor: "pointer", zIndex: "6" }}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
=======
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
>>>>>>> 7764139 (updated)
                            </span>
                        </div>
                    </div>
                )}
<<<<<<< HEAD
                {otpType === "pin" && (
                    <div className="customer-setting-form-group">
                        <label className="form-label" htmlFor="transactionPIN">
                            Confirm Transaction PIN
                        </label>
                        <div className="input-group">
                            <input
                                onChange={(e) => setConfirmPin(e.target.value)}
                                type={showConfirmPassword ? "text" : "password"}
                                className="form-control"
                                id="transactionPIN"
                                placeholder="Enter Confirm PIN Number"
                            />
                            <span
                                className="password-view-icon"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{ cursor: "pointer", zIndex: "6" }}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                )}

                {otpType === "mobile" && (
                    <div className="customer-setting-form-group">
                        <label className="form-label" htmlFor="mobileNumber">
                            Mobile Number
>>>>>>> 88913d0 (updated)
                        </label>
                        <div className="input-group">
                            <input
                                onChange={(e) => setPin(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="transactionPIN"
                                placeholder="Enter PIN Number"
                            />
                            <span
                                className="password-view-icon"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ cursor: "pointer", zIndex: "6" }}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                )}
                {otpType === "pin" && (
                    <div className="customer-setting-form-group">
                        <label className="form-label" htmlFor="transactionPIN">
                            Confirm Transaction PIN
                        </label>
                        <div className="input-group">
                            <input
                                onChange={(e) => setConfirmPin(e.target.value)}
                                type={showConfirmPassword ? "text" : "password"}
                                className="form-control"
                                id="transactionPIN"
                                placeholder="Enter Confirm PIN Number"
                            />
                            <span
                                className="password-view-icon"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{ cursor: "pointer", zIndex: "6" }}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                )}

                {otpType === "mobile" && (
                    <div className="customer-setting-form-group">
                        <label className="form-label" htmlFor="mobileNumber">
=======

                {otpType === "Mobile OTP" && (
                    <div className="customer-setting-form-group">
                        <label
                            className="form-label"
                            htmlFor="mobileNumber"
                        >
>>>>>>> 7764139 (updated)
                            Mobile Number
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="mobileNumber"
                            placeholder="Enter Mobile Number"
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                            onChange={(e) => setMobileNumber(e.target.value)}
                            value={mobileNumber}
                            readOnly
=======
>>>>>>> 88913d0 (updated)
=======
                            onChange={(e) => setMobileNumber(e.target.value)}
                            value={mobileNumber}
                            readOnly
>>>>>>> c642eee (Manage Pin or Otp)
=======
>>>>>>> 7764139 (updated)
                        />
                    </div>
                )}

                <div className="pb-3">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                    <small>If you change it once, then you can't change it again.</small>
                </div>
                <button
                    type="button"
                    className="add-to-cart-link border-0 mx-auto"
                    onClick={handleManagePin}
                >
                    {otpType === "pin" ? status ? "Reset PIN" : "Set PIN" : status ? "Reset OTP" : "Set OTP"}
                </button>
            </div>
            <TransactionOtpChoiceModal handleManageOtpChange={handleManageOtpChange} modalRef={modalRef} mobileNumber={mobileNumber} />
=======
=======
>>>>>>> 7764139 (updated)
                    <small>
                        If you change it once, then you can't change it
                        again.
                    </small>
<<<<<<< HEAD
=======
                    <small>If you change it once, then you can't change it again.</small>
>>>>>>> c642eee (Manage Pin or Otp)
                </div>
                <button
                    type="button"
                    className="add-to-cart-link border-0 mx-auto"
                    onClick={handleManagePin}
                >
                    {otpType === "pin" ? status ? "Reset PIN" : "Set PIN" : status ? "Reset OTP" : "Set OTP"}
                </button>
            </div>
<<<<<<< HEAD
<<<<<<< HEAD
            <TransactionOtpChoiceModal/>
>>>>>>> 88913d0 (updated)
=======
            <TransactionOtpChoiceModal handleManageOtpChange={handleManageOtpChange} modalRef={modalRef} />
>>>>>>> e134429 (updated)
=======
            <TransactionOtpChoiceModal handleManageOtpChange={handleManageOtpChange} modalRef={modalRef} mobileNumber={mobileNumber} />
>>>>>>> c642eee (Manage Pin or Otp)
=======
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
            <TransactionOtpChoiceModal/>
>>>>>>> 7764139 (updated)
        </div>
    );
};

export default ChangeTransactionOtp;
