"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { postResetForgetPassword } from "../services/forgetpassword/postResetForgetPassword";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

const SetForgotPasswordPage = () => {
    const [isPending, startTransition] = useTransition();
    const [forgetPassword, setForgetPassword] = useState({
        new_password: "",
        confirm_password: "",
    });
    const searchParams = useSearchParams();
    const router = useRouter();
    const userID = searchParams.get("user_id");

    //Function for handle Password Change
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setForgetPassword((prev) => ({ ...prev, [name]: value }));
    };

    //Function for on Password Handle Change
    const onPasswordHandleChange = async (e) => {
        e.preventDefault();

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
            };
            startTransition(async () => {
                const response = await postResetForgetPassword(changePassword);
                if (response.code === 200) {
                    toast.success(
                        response?.message || "Password updated successfully"
                    );
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
            <section className="users-registration-otp-section vh-100 d-flex">
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
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            required
                                            name="new_password"
                                            value={forgetPassword.new_password}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>
                                    <div className="pb-2">
                                        <label
                                            className="form-label"
                                            htmlFor="confirm_password"
                                        >
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            required
                                            name="confirm_password"
                                            value={
                                                forgetPassword.confirm_password
                                            }
                                            onChange={handlePasswordChange}
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
