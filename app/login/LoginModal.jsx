"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";

const LoginModal = () => {
    const router = useRouter();
    const { status, data: session } = useSession();
    const searchParams = useSearchParams();
    const fromPath = searchParams.get("from");

    useEffect(() => {
        async function fetchData() {
            if (typeof fromPath === "string" && status === "authenticated") {
                router?.push(fromPath);
            }
        }
        fetchData();
    }, [session?.user, status]);

    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMessage("");
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.password) {
            setErrorMessage("Please provide required information");
            return;
        }

        const result = await signIn("credentials", {
            username: formData.username,
            password: formData.password,
            redirect: false,
        });

        if (result.error) {
            setErrorMessage("Invalid Credentials");
            return;
        }

        import("bootstrap/dist/js/bootstrap.bundle.min.js").then(
            (bootstrap) => {
                const modalEl = document.getElementById("loginModal");
                const modal =
                    bootstrap.Modal.getInstance(modalEl) ||
                    new bootstrap.Modal(modalEl);
                modal.hide();
            }
        );
        setIsLoggedIn(true);
        router.push("/dashboard");
    };

    return (
        <div
            className="modal fade"
            id="loginModal"
            tabIndex="-1"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div
                    className="modal-content"
                    style={{
                        backgroundColor: "transparent",
                        border: "none",
                    }}
                >
                    <div className="modal-body">
                        <div className="container">
                            <div className="user-login-section mx-auto">
                                <div className="user-login-area-container mx-auto bg-light  rounded-2">
                                    <div className="user-login-area px-3 py-5">
                                        <div className="logo-container">
                                            <img
                                                src="/images/Fabicon-80-x-80.png"
                                                alt="naagdhat logo"
                                                className="login-logo"
                                            />
                                        </div>
                                        <div
                                            data-bs-dismiss="modal"
                                            className="close-icon"
                                        >
                                            <IoCloseSharp className="close-logo" />
                                        </div>
                                        <h1 className="text-center text-capitalize">
                                            Login
                                        </h1>
                                        {errorMessage && (
                                            <h3 style={{ color: "#f00" }}>
                                                {errorMessage}
                                            </h3>
                                        )}
                                        <div className="user-login-form">
                                            <form>
                                                <div className="mb-3 input-section ">
                                                    <label
                                                        htmlFor="number"
                                                        className="form-label fw-semibold"
                                                    >
                                                        Phone Number{" "}
                                                        <span>*</span>
                                                    </label>
                                                    <div className="input-wrapper">
                                                        <MdOutlinePhoneIphone
                                                            className="icon"
                                                            style={{
                                                                width: "20px",
                                                                height: "20px",
                                                                color: "#44bc9d",
                                                            }}
                                                        />
                                                        <input
                                                            type="number"
                                                            className="form-control no-spinner"
                                                            id="number"
                                                            name="username"
                                                            required
                                                            value={
                                                                formData.username
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            placeholder="Enter your phone number"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 input-section">
                                                    <label
                                                        htmlFor="password"
                                                        className="form-label fw-semibold"
                                                    >
                                                        Password <span>*</span>
                                                    </label>

                                                    <div class="input-wrapper">
                                                        <RiLockPasswordLine
                                                            className="icon-left"
                                                            style={{
                                                                width: "20px",
                                                                height: "20px",
                                                                color: "#44bc9d",
                                                            }}
                                                        />
                                                        {showPassword ? (
                                                            <FaRegEye
                                                                onClick={
                                                                    togglePasswordVisibility
                                                                }
                                                                className="icon-right"
                                                                style={{
                                                                    width: "20px",
                                                                    height: "20px",
                                                                    color: "#44bc9d",
                                                                }}
                                                            />
                                                        ) : (
                                                            <FaRegEyeSlash
                                                                onClick={
                                                                    togglePasswordVisibility
                                                                }
                                                                className="icon-right"
                                                                style={{
                                                                    width: "20px",
                                                                    height: "20px",
                                                                    color: "#44bc9d",
                                                                }}
                                                            />
                                                        )}

                                                        <input
                                                            type={
                                                                showPassword
                                                                    ? "text"
                                                                    : "password"
                                                            }
                                                            className="form-control"
                                                            id="password"
                                                            name="password"
                                                            required
                                                            value={
                                                                formData.password
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            placeholder="Enter your password"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-3 form-check d-flex align-items-center justify-content-between ">
                                                    <div className="inner-field">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id="remember"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="remember"
                                                        >
                                                            Remember Me
                                                        </label>
                                                    </div>
                                                    <div className="inner-field">
                                                        <Link href="/forgotpassword">
                                                            Forgot Password ?
                                                        </Link>
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                    {...(isLoggedIn
                                                        ? {
                                                              "data-bs-dismiss":
                                                                  "modal",
                                                          }
                                                        : {})}
                                                    onClick={handleLogin}
                                                >
                                                    Login
                                                </button>
                                            </form>
                                            <div className="user-social-login mt-3">
                                                <p className="text-center">
                                                    New to Nagadhat?{" "}
                                                    <Link href="/registration">
                                                        Create an account
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
