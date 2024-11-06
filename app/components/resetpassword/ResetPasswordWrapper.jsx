"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { postOneTimeResetPassword } from "@/app/services/onetimeresetpasword/postOneTimeResetPassword";

const ResetPasswordWrapper = ({ userId }) => {
    const baseUrl = window?.location.href;

    const [formData, setFormData] = useState({
        password: "",
        confirm_password: "",
    });
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirm_password) {
            Swal.fire({
                icon: "error",
                title: "Passwords do not match",
            });
            return;
        }

        const dataToSubmit = {
            ...formData,
            user_id: parseInt(userId),
            reset_password_link: baseUrl,
        };

        try {
            const response = await postOneTimeResetPassword(dataToSubmit);
            if (!response?.error) {
                Swal.fire({
                    icon: "success",
                    title: "Password Reset Successful",
                });
                router.push("/login");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text:
                        response.message ||
                        "An error occurred. Please try again.",
                });
                console.log("Error response: ", response.message);
                router.push("/");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An unexpected error occurred. Please try again later.",
            });
            console.error("Unexpected error: ", error);
            router.push("/");
        }
    };

    return (
        <section className="users-registration-otp-section vh-100 d-flex">
            <div className="container d-flex align-items-center justify-content-center">
                <div className="row">
                    <div className="col-12">
                        <div className="users-registration-otp one-time-pass">
                            <div className="users-registration-otp-title pb-1">
                                <h1>Set Password</h1>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="d-flex flex-column gap-3"
                            >
                                <div>
                                    <label
                                        className="form-label"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        required
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
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
                                        value={formData.confirm_password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <button
                                        className="w-100 add-to-cart-link border-0"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResetPasswordWrapper;
