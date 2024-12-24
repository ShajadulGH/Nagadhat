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

    const [otp, setOtp] = useState("1234567");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                    if (!res?.success) {
                        setErrorMessage(res.message);
                        return;
                    }else{
                        setSuccessMessage(res.message);
                        router.push("/login");
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
                    if (forgetRes?.code === 200) {
                        setSuccessMessage(forgetRes?.message);
                        const userId = forgetRes?.results?.user_id;
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
                        {errorMessage && (
                            <h3 style={{ color: "#f00" }}>{errorMessage}</h3>
                        )}
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
                                />
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
                                * check your phone or email for OTP code.
                            </p>
                            <div className=" d-flex justify-content-between align-items-center">
                                <div>
                                    {forgetPassword === forgetPassword ? (
                                        <button
                                            className="add-to-cart-link border-0"
                                            onClick={() =>
                                                router.push("/forgotpassword")
                                            }
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
                                <div className="resend-otp-timar">
                                    <button
                                        className="add-to-cart-link border-0"
                                        onClick={handleResendOTPSubmit}
                                    >
                                        resend otp
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTP;
