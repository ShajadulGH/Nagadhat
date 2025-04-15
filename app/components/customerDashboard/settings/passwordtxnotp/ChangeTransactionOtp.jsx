"use client";
import { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import TransactionOtpChoiceModal from "./TransactionOtpChoiceModal";
import { postManagePinOtp } from "@/app/services/affiliate/postManagePinOtp";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/app/services/affiliate/getUserInfo";
import DefaultLoader from "@/app/components/defaultloader/DefaultLoader";

const ChangeTransactionOtp = () => {
    const { data: session } = useSession();
    const [otpType, setOtpType] = useState("pin");
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [status, setStatus] = useState(1);
    const modalRef = useRef(null);
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [bootstrap, setBootstrap] = useState(null);

    // Dynamically import bootstrap bundle on the client-side
    useEffect(() => {
        const loadBootstrap = async () => {
            const bootstrapModule = await import(
                "bootstrap/dist/js/bootstrap.bundle.min.js"
            );
            setBootstrap(bootstrapModule);
        };
        loadBootstrap();
    }, []);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getUserInfo(session.accessToken);
                if (response.code === 200) {
                    setMobileNumber(response?.results?.phone);
                    setStatus(response?.results?.status);
                }
            } catch (error) {
                console.error("Failed to fetch user info:", error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [session?.accessToken]);

    const handleOtpChange = (e) => {
        setOtpType(e.target.value);
    };

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
            const modalInstance =
                bootstrap.Modal.getOrCreateInstance(modalElement);
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
                const modalElement = modalRef.current;
                if (bootstrap && modalElement) {
                    const modalInstance =
                        bootstrap.Modal.getInstance(modalElement);
                    modalInstance.hide(); // Close modal
                }
                router.push(
                    `/others-password-txn-otp/manage-otp?otpType=${otpType}&pin=${pin}&nextTime=${response?.results?.time}&uphn=${response?.results?.user_phone}`
                );
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update OTP. Please try again.");
        }
    };
    if (loading) {
        return <DefaultLoader />;
    }

    return (
        <div
            className={`tab-pane fade show active`}
        >
            {status == 1 ? (
                <div>
                    <div className="customer-setting-form-group">
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
                            <option value="pin">PIN</option>
                            {/* <option value="mobile">Mobile OTP</option> */}
                        </select>
                    </div>

                    {otpType === "pin" && (
                        <div className="customer-setting-form-group">
                            <label className="form-label" htmlFor="transactionPIN">
                                Transaction PIN
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
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    style={{ cursor: "pointer", zIndex: "6" }}
                                >
                                    {showConfirmPassword ? (
                                        <FaEyeSlash />
                                    ) : (
                                        <FaEye />
                                    )}
                                </span>
                            </div>
                        </div>
                    )}

                    {otpType === "mobile" && (
                        <div className="customer-setting-form-group">
                            <label className="form-label" htmlFor="mobileNumber">
                                Mobile Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="mobileNumber"
                                placeholder="Enter Mobile Number"
                                onChange={(e) => setMobileNumber(e.target.value)}
                                value={mobileNumber}
                                readOnly
                            />
                        </div>
                    )}

                    <div className="pb-3">
                        <small>
                            If you change it once, then you can't change it again.
                        </small>
                    </div>
                    <button
                        type="button"
                        className="add-to-cart-link border-0 mx-auto rounded-2"
                        onClick={handleManagePin}
                    >
                        {otpType === "pin"
                            ? status
                                ? "Reset PIN"
                                : "Set PIN"
                            : status
                                ? "Reset OTP"
                                : "Set OTP"}
                    </button>
                </div>
            ) : (
                <div>
                    <div className="alert alert-warning">
                        <p>
                            You have already set your Transaction PIN/OTP. If you
                            want to reset it, please click the button below.
                        </p>
                    </div>
                    <button onClick={()=>setStatus(1)} className="add-to-cart-link border-0 mx-auto rounded-2">
                        Reset PIN
                    </button>
                </div>
            )}
            <TransactionOtpChoiceModal
                handleManageOtpChange={handleManageOtpChange}
                modalRef={modalRef}
                mobileNumber={mobileNumber}
            />
        </div>
    );
};

export default ChangeTransactionOtp;
