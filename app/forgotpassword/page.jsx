"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { postForgetPasswordOtp } from "../services/forgetpassword/postForgetPasswordOtp";
import { RotatingLines } from "react-loader-spinner";

const Page = () => {
    const [isPending, startTransition] = useTransition();
    const [otpMobileNumber, setOtpMobileNumber] = useState({
        phone: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        try {
            startTransition(async () => {
                const response = await postForgetPasswordOtp(
                    otpMobileNumber.phone
                );
                
                if (response?.code === 200) {
                    setSuccess(response?.message);
                    router.push(
                        `/otp?forget_password=${otpMobileNumber.phone}&otp=${response?.results?.otp}`
                    );
                } else {
                    setError(
                        response?.message ||
                            "Failed to send OTP. Please try again."
                    );
                }
            });
        } catch (err) {
            console.error("Error:", err);
            setError("An error occurred. Please try again later.");
        }
    };

    const handleInputChange = (e) => {
        setOtpMobileNumber({
            ...otpMobileNumber,
            phone: e.target.value,
        });
    };

    return (
        <>
            <section className="users-registration-otp-section vh-100 d-flex">
                <div className="container d-flex align-items-center justify-content-center">
                    <div className="row">
                        <div className="col-12">
                            <div className="users-registration-otp one-time-pass">
                                <div className="users-registration-otp-title pb-1">
                                    <h1>Forgot Password?</h1>
                                </div>
                                <form
                                    onSubmit={handleSubmit}
                                    className="d-flex flex-column gap-3"
                                >
                                    <div>
                                        <label
                                            className="form-label"
                                            htmlFor="phone"
                                        >
                                            Mobile Number / (User Id)
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            required
                                            name="phone"
                                            value={otpMobileNumber.phone}
                                            onChange={handleInputChange}
                                            placeholder="Please enter register mobile number"
                                            aria-label="Enter your mobile number"
                                        />
                                    </div>
                                    {error && (
                                        <div className="alert alert-danger">
                                            {error}
                                        </div>
                                    )}
                                    {success && (
                                        <div className="alert alert-success">
                                            {success}
                                        </div>
                                    )}

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
                                                "Get Code"
                                            )}
                                        </button>
                                    </div>
                                </form>
                                <div className="pt-2">
                                    <Link href="/login">Back</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Page;
