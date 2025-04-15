"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getVerifyOTP } from "@/app/services/getVerifyOTP";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { FaArrowLeftLong } from "react-icons/fa6";
import { getResendOTP } from "@/app/services/getResendOTP";

const OTP = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    let pin = searchParams.get("pin") ? searchParams.get("pin") : "";
    let otpType = searchParams.get("otpType")
        ? searchParams.get("otpType")
        : "";
    const initialOtp = searchParams.get("otpStatus") || "";
    const [otp, setOtp] = useState(initialOtp);
    const { data: session } = useSession();
    const [disableResend, setDisableResend] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const phone = searchParams.get("uphn") || "";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!otp) {
            toast.error("Please enter OTP");
            return;
        }
        try {
            const res = await getVerifyOTP(
                {
                    otp_type: otpType == "pin" ? 2 : 1,
                    otp,
                    pin: otpType == "pin" ? pin : "",
                },
                session?.accessToken
            );
            if (res.code === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your Transaction OTP/PIN Set Successfully",
                    showConfirmButton: false,
                    timer: 2000,
                });
                router.push("/others-password-txn-otp");
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Something went wrong. Please try after sometime");
        }
    };

    const handleResendOTPSubmit = (e) => {
        e.preventDefault();
        async function resendOTP() {
            if (!phone) {
                toast.error("Please provide required information");
                return;
            }
            try {
                startTransition(async () => {
                    const res = await getResendOTP({
                        phone: phone,
                    });
                    if (!res?.success) {
                        toast.error(res.message);
                        return;
                    }
                    toast.success(res.message);
                });
            } catch (error) {
                toast.error("Please try after sometime", error);
            }
        }

        resendOTP();
    };
    // function for getting the current time
    useEffect(() => {
        const nextTimeParam = searchParams.get("nextTime");
        if (nextTimeParam) {
            const now = new Date();
            const todayDate = now.toISOString().split("T")[0];
            const fullNextTime = new Date(
                `${todayDate} ${decodeURIComponent(nextTimeParam)}`
            );

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
                setRemainingTime((prev) => {
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

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="users-registration-otp">
                        <div className="users-registration-otp-title">
                            <h1>OTP Verify</h1>
                        </div>
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
                            </div>
                            <div>
                                <button
                                    className="w-100 add-to-cart-link border-0 rounded-2"
                                    type="submit"
                                >
                                    Verify
                                </button>
                            </div>
                        </form>
                        <div className="pt-4">
                            <p className="pb-2">
                                * check your phone or email for OTP code.
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                                <Link
                                    href="/others-password-txn-otp"
                                    className="add-to-cart-link border-0 d-inline-block text-white rounded-2"
                                >
                                    <FaArrowLeftLong /> Back
                                </Link>
                                {disableResend ? (
                                    <div className="text-white fw-bold fs-6 add-to-cart-link bg-danger rounded-2">
                                        {" "}
                                        {formatTime(remainingTime)}
                                    </div>
                                ) : (
                                    <div className="resend-otp-timar">
                                        <button
                                            className="add-to-cart-link border-0 rounded-2"
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
