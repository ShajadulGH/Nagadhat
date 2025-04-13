"use client";
import { useState, useEffect, useTransition } from "react";
import { getOTPVerify } from "../services/getOTPVerify";
import { getResendOTP } from "../services/getResendOTP";
import { getBackRegistration } from "../services/getBackRegistration";
import { useSearchParams, useRouter } from "next/navigation";
import { postCheckForgetPassword } from "../services/forgetpassword/postCheckForgetPassword";
import { RotatingLines } from "react-loader-spinner";

const OTP = () => {
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const router = useRouter();
    let phone = searchParams.get("phone") ? searchParams.get("phone") : "";
    let forgetPassword = searchParams.get("forget_password") || "";
    const [otp, setOtp] = useState(searchParams.get("otp") || "");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [baseUrl, setBaseUrl] = useState("");
    const [remainingTime, setRemainingTime] = useState(0);
    const [disableResend, setDisableResend] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setBaseUrl(window.location.origin);
        }
    }, []);
    
// function for getting the current time
    useEffect(() => {
        const nextTimeParam = searchParams.get("nextTime");
        if (nextTimeParam) {
            const now = new Date();
            const todayDate = now.toISOString().split("T")[0];
            const fullNextTime = new Date(`${todayDate} ${decodeURIComponent(nextTimeParam)}`);
    
            const diff = fullNextTime - now; 
            if (diff > 0) {
                setDisableResend(true);
                setRemainingTime(Math.floor(diff / 1000));
            }
        }
    }, []);

    // function for getting the remaining time
    useEffect(() => {
        if (remainingTime > 0) {
            const timer = setInterval(() => {
                setRemainingTime(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setDisableResend(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [remainingTime]);

    // function for formatting the time
    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${m}:${s}`;
    };
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("verefi otp calling...===>");
        async function verifyOTP() {
            if (!phone || !otp) {
                setErrorMessage("Please provide required information");
            }

            if (errorMessage) {
                return;
            }

            try {
                startTransition(async () => {
                    const res = await getOTPVerify({
                        phone: phone,
                        otp: otp,
                    });
                    console.log("verefi otp===>",res);

                    if (!res?.success) {
                        setErrorMessage(res.message);
                        return;
                    } else {
                        setSuccessMessage(res.message);
                        router.push(`${baseUrl}${res?.data?.frontendUrl}`);
                        // router.push("/login");
                    }
                });
            } catch (error) {
                alert("Something went wrong. Please try after sometime");
            }
        }

        if (!forgetPassword) {
            verifyOTP();
        }

        // Forget Password Checking
        if (forgetPassword) {
            try {
                startTransition(async () => {
                    const forgetRes = await postCheckForgetPassword({
                        phone: forgetPassword,
                        otp,
                    });
                    console.log("forgetRes===>", forgetRes);
                    if (forgetRes?.code === 200) {
                        setSuccessMessage(forgetRes?.message);
                        const userId = forgetRes?.results[0]?.user_id;
                        console.log("User ID for password reset===>", userId);
                        router.push(`/set-forgot-password?user_id=${userId}`);
                    } else {
                        setErrorMessage(forgetRes.message);
                    }
                });
            } catch (error) {
                console.error("Error in Forget Password Check:", error);
                setErrorMessage(
                    "An error occurred while verifying forget password. Please try again."
                );
            }
        }
    };

    const handleResendOTPSubmit = (e) => {
        e.preventDefault();

        async function resendOTP() {
            if (!phone) {
                setErrorMessage("Please provide required information");
            }

            try {
                startTransition(async () => {
                    const res = await getResendOTP({
                        phone: phone,
                    });
                    if (!res?.success) {
                        setErrorMessage(res.message);
                        return;
                    }
                    setSuccessMessage(res.message);
                });
            } catch (error) {
                alert("Something went wrong. Please try after sometime");
            }
        }

        resendOTP();
    };

    const handleBackSubmit = (e) => {
        e.preventDefault();

        async function backRegistration() {
            if (!phone) {
                setErrorMessage("Please provide required information");
            }

            if (errorMessage) {
                return;
            }

            try {
                startTransition(async () => {
                    const res = await getBackRegistration({
                        phone: phone,
                    });

                    if (!res?.success) {
                        setErrorMessage(res.message);
                        return;
                    }
                    router.push("/registration");
                });
            } catch (error) {
                alert("Something went wrong. Please try after sometime");
            }
        }

        backRegistration();
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="users-registration-otp">
                        <div className="users-registration-otp-title">
                            <h1>OTP Verify</h1>
                        </div>
                        
                        {successMessage && (
                            <h3 style={{ color: "#008000" }}>
                                {successMessage}
                            </h3>
                        )}
                        <form
                            className="d-flex flex-column gap-4"
                            role="form"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    className="form-label"
                                    htmlFor="user-otp"
                                >
                                    OTP Code
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    name="user-otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter Your OTP"
                                />
                                {errorMessage && (
                                    <span className="ps-2 pt-2 d-block" style={{ color: "#f00" }}>{errorMessage}</span>
                                )}
                            </div>
                            <div>
                                <button
                                    className="w-100 add-to-cart-link border-0"
                                    type="submit"
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <div
                                            style={{
                                                height: "21px",
                                                width: "300px",
                                                textAlign: "center",
                                            }}
                                        >
                                            <RotatingLines
                                                visible={true}
                                                height="18"
                                                width="20"
                                                color="#ffffff"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                ariaLabel="rotating-lines-loading"
                                                wrapperStyle={{}}
                                                wrapperClass="w-25"
                                            />
                                        </div>
                                    ) : (
                                        "Verify"
                                    )}
                                </button>
                            </div>
                        </form>
                        <div className="pt-4">
                            <p className="pb-2">
                                * Check Your Phone for OTP Code.
                            </p>
                            <div className=" d-flex justify-content-between align-items-center">
                                <div>
                                    {forgetPassword === forgetPassword ? (
                                        <button
                                            className="add-to-cart-link border-0"
                                            onClick={() => router.back()}
                                        >
                                            Back
                                        </button>
                                    ) : (
                                        <button
                                            className="add-to-cart-link border-0"
                                            onClick={handleBackSubmit}
                                        >
                                            Back
                                        </button>
                                    )}
                                </div>
                                {disableResend ? (
                                    <div className="text-white fw-bold fs-6 add-to-cart-link bg-danger"> {formatTime(remainingTime)}</div>
                                ) : (
                                <div className="resend-otp-timar">
                                    <button
                                        className="add-to-cart-link border-0"
                                        onClick={handleResendOTPSubmit}
                                        disabled={disableResend}
                                    >
                                        resend otp
                                    </button>
                                </div>
                            )}

                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTP;
