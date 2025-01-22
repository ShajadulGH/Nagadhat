"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getVerifyOTP } from "@/app/services/getVerifyOTP";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { FaArrowLeftLong } from "react-icons/fa6";

const OTP = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    let pin = searchParams.get("pin") ? searchParams.get("pin") : "";
    let otpType = searchParams.get("otpType") ? searchParams.get("otpType") : "";
    const [otp, setOtp] = useState("");
    const { data: session } = useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!otp) {
            setErrorMessage("Please provide required information");
        }
        try {
            const res = await getVerifyOTP({
                otp_type: otpType == "otp" ? 1 : 2,
                otp,
                pin: otpType == "pin" ? pin : ""
            }, session?.accessToken);
            if (res.code === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your Transaction OTP/PIN Set Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                router.push("/others-password-txn-otp");
            } else {
                toast.error(res.message)
            }
        } catch (error) {
            toast.error("Something went wrong. Please try after sometime");
        }
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
                                />
                            </div>
                            <div>
                                <button
                                    className="w-100 add-to-cart-link border-0"
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
                            <div>
                                <Link
                                    href="/others-password-txn-otp"
                                    className="praymary-color"
                                >
                                    <FaArrowLeftLong />  Back
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTP;
