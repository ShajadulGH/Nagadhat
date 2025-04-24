"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { postResetForgetPassword } from "../services/forgetpassword/postResetForgetPassword";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const SetForgotPasswordPage = () => {
    const [isPending, startTransition] = useTransition();
    const [forgetPassword, setForgetPassword] = useState({
        new_password: "",
        confirm_password: "",
    });

    //   togglePasswordVisibility
    const [passwordVisibility, setPasswordVisibility] = useState({
        new_password: false,
        confirm_password: false,
    });

    const searchParams = useSearchParams();
    const router = useRouter();
    const userID = searchParams.get("user_id");
    const userNumber = searchParams.get("phone")

    //Function for handle Password Change
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setForgetPassword((prev) => ({ ...prev, [name]: value }));
    };

    // function for togglePasswordVisibility
    const togglePasswordVisibility = (field) => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const otpVerified = localStorage.getItem('otpVerified');
            const storedOTP = localStorage.getItem('forgetPasswordOTP');
            if (!otpVerified && !storedOTP ) {
                toast.error("Please verify OTP first");
                router.push("/forgot-password"); 
            }
        }
    }, []);

    //Function for on Password Handle Change
    const onPasswordHandleChange = async (e) => {
        e.preventDefault();

        if (forgetPassword.new_password.length < 5) {
            toast.error("Password must be at least 5 characters long");
            return;
        }
        if (forgetPassword.new_password !== forgetPassword.confirm_password) {
            toast.error("Passwords do not match");
            return;
        }
        if (!userID) {
            toast.error("Invalid user ID");
            return;
        }

        try {
            const changePassword = {
                new_password: forgetPassword.new_password,
                confirm_password: forgetPassword.confirm_password,
                user_id: parseInt(userID, 10),
                phone:userNumber
            };
            startTransition(async () => {
                const response = await postResetForgetPassword(changePassword);
                if (response.code === 200) {
                    toast.success(
                        response?.message || "Password updated successfully"
                    );
                    // Clear OTP verification flag on successful password change
                    localStorage.removeItem('otpVerified');
                    localStorage.removeItem('forgetPasswordOTP');
                    router.push("/login");
                } else {
                    toast.error(
                        response?.message || "Failed to update password"
                    );
                }
            });
        } catch (error) {
            toast.error("An error occurred while updating password");
            console.error("Error updating password:", error);
        }
    };

    return (
        <>
            <section className="users-registration-otp-section d-flex">
                <div className="container d-flex align-items-center justify-content-center">
                    <div className="row">
                        <div className="col-12">
                            <div className="users-registration-otp one-time-pass">
                                <div className="users-registration-otp-title pb-1">
                                    <h1>Set Forget Password</h1>
                                </div>
                                <form
                                    onSubmit={onPasswordHandleChange}
                                    className="d-flex flex-column gap-3"
                                >
                                    <div>
                                        <label
                                            className="form-label"
                                            htmlFor="new_password"
                                        >
                                            New Password
                                        </label>
                                        <div className="position-relative">
                                            <input
                                                type={
                                                    passwordVisibility.new_password
                                                        ? "text"
                                                        : "password"
                                                }
                                                className="form-control"
                                                required
                                                name="new_password"
                                                value={
                                                    forgetPassword.new_password
                                                }
                                                onChange={handlePasswordChange}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-link position-absolute top-50 end-0 translate-middle-y"
                                                onClick={() =>
                                                    togglePasswordVisibility(
                                                        "new_password"
                                                    )
                                                }
                                                style={{
                                                    textDecoration: "none",
                                                    color: "#000",
                                                }}
                                            >
                                                {passwordVisibility.new_password ? (
                                                    <FaEyeSlash />
                                                ) : (
                                                    <FaEye />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="pb-2">
                                        <label
                                            className="form-label"
                                            htmlFor="confirm_password"
                                        >
                                            Confirm Password
                                        </label>
                                        <div className="position-relative">
                                            <input
                                                type={
                                                    passwordVisibility.confirm_password
                                                        ? "text"
                                                        : "password"
                                                }
                                                className="form-control"
                                                required
                                                name="confirm_password"
                                                value={
                                                    forgetPassword.confirm_password
                                                }
                                                onChange={handlePasswordChange}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-link position-absolute top-50 end-0 translate-middle-y"
                                                onClick={() =>
                                                    togglePasswordVisibility(
                                                        "confirm_password"
                                                    )
                                                }
                                                style={{
                                                    textDecoration: "none",
                                                    color: "#000",
                                                }}
                                            >
                                                {passwordVisibility.confirm_password ? (
                                                    <FaEyeSlash />
                                                ) : (
                                                    <FaEye />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            className="w-100 add-to-cart-link border-0 rounded-2"
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
                                                "Submit"
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SetForgotPasswordPage;
