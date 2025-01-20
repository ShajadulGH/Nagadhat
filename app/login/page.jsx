"use client";
import Link from "next/link";
import SigninBtn from "../components/SigninBtn";
import React, { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
// import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {

    const router = useRouter();
    const { status, data: session } = useSession();
    const searchParams = useSearchParams();
    const fromPath = searchParams.get("from");

    useEffect(() => {
        async function fetchData() {
            if (typeof fromPath === "string" && status === "authenticated") {
                router?.push(fromPath);
            } else if (status === "authenticated") {
                router?.push("/dashboard");
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMessage("");
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        // const allowedNumbers = ["01739245723", "01680572792", "01833966995", "01775282986","01761115624"];
        // if (!allowedNumbers.includes(formData.username)) {
        //     toast.error("Dear Customer,Due to technical issues with our server, our service is still temporarily unavailable. In Sha Allah, we will resolve the issue soon and resume our service. Thank you for your patience.");
        //     return;
        // }


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
        router.push("/dashboard");
    };

    // const onChange =()=>{

    // }

    return (
        <div className="container">
            <div className=" user-login-section mx-auto">
                <div className="user-login-area-container mx-auto">
                    <div className="user-login-area shadow rounded-4 px-3 py-5">
                        <h1 className="text-center text-capitalize">
                            Login to your account.
                        </h1>
                        {errorMessage && (
                            <h3 style={{ color: "#f00" }}>{errorMessage}</h3>
                        )}
                        <div className="user-login-form">
                            <form>
                                <div className="mb-3">
                                    <label
                                        htmlFor="number"
                                        className="form-label"
                                    >
                                        Phone Number <span>*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="number"
                                        name="username"
                                        required
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Password <span>*</span>
                                    </label>
                                    <div className="position-relative">
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
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-link position-absolute top-50 end-0 translate-middle-y"
                                            onClick={togglePasswordVisibility}
                                            style={{
                                                textDecoration: "none",
                                                color: "#000",
                                            }}
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash />
                                            ) : (
                                                <FaEye />
                                            )}
                                        </button>
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
                                {/* <div className="pb-3 w-100">
                                    <ReCAPTCHA
                                        sitekey="6LesGb0qAAAAAGCJ5BvzNGM9z9x_Gtz00DXMFIpW"
                                        onChange={onChange}
                                        style={{ width:"100%" }}
                                    />
                                </div> */}
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
                            </form>
                            <div className="user-social-login mt-3">
                                {/* <label className="form-label">
                                    Or Login With
                                </label> */}
                                {/* <div className="mb-3 user-social-login-item d-flex align-items-center  justify-content-center "> */}
                                {/* <SigninBtn provider="facebook" /> */}
                                {/* <SigninBtn provider="google" /> */}
                                {/* </div> */}
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
    );
};

export default Login;
