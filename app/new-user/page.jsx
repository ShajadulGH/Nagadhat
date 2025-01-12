"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { googleNewUser } from "../services/googleNewUser";
import { validatePhoneNumber } from "../services/validatePhoneNumber";
import { useSession } from "next-auth/react";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import { checkUserExistByGoogleLogin } from "@/app/services/checkUserExistByGoogleLogin";
import { FaInfoCircle } from "react-icons/fa";

const GoogleProfile = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [addtPassword, setAddtPassword] = useState(false);
    const router = useRouter();
    const { status, data: session } = useSession();

    const [formData, setFormData] = useState({
        name: session?.user?.name || "",
        phone: "",
        email: session?.user?.email || "",
        password: "",
        confpassword: "",
        account_provider: "google",
    });

    const googleImage = session?.user?.image || "";
    const googleEmail = session?.user?.email || "";
    const formData2 = {
        email: googleEmail,
    };

    useEffect(() => {
        async function fetchData() {
            if (session != undefined) {
                if (googleImage) {
                    const data = await checkUserExistByGoogleLogin(formData2);
                    if (
                        data?.message == "Already User Exists" &&
                        (data?.account_provider == "credentials" ||
                            data?.account_provider == "google")
                    ) {
                        setLoading(true);
                        router.push(`/dashboard`);
                    }
                }
            }
        }
        fetchData();
        setFormData({
            ...formData,
            name: session?.user?.name,
            email: session?.user?.email,
        });
    }, [session?.user?.email]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (!formData.phone) {
            setErrorMessage("Please provide required information");
            return;
        }

        if (formData.password !== formData.confpassword) {
            setErrorMessage(
                "Please provide password and confirm password same"
            );
            return;
        }

        try {
            const res = await googleNewUser(formData);

            if (res?.success != true) {
                alert(res.message);
                return;
            }

            router.push(`/dashboard`);
        } catch (error) {
            alert("Something went wrong. Please try after sometime");
        }
    };

    useEffect(() => {
        const checkPhoneNumberValidity = async () => {
            setErrorMessage("");
            const phone_number = formData.phone;
            const phone_number_length = phone_number?.length;

            if (phone_number_length < 11) {
                return;
            }

            try {
                const res = await validatePhoneNumber({
                    phone: formData.phone,
                });

                if (res?.message.includes("Already Exists")) {
                    setErrorMessage(res?.message);
                } else {
                    setErrorMessage("");
                }
            } catch (error) {
                alert("Something went wrong. Please try after sometime");
                console.log(error);
            }
        };
        checkPhoneNumberValidity();
    }, [formData.phone]);

    const handleSetPassword = () => {
        setAddtPassword(!addtPassword);
    };

    setTimeout(() => {
        // console.log("=>>> This runs after 1 seconds.");
        // Add any additional code you want to execute here
        setLoading(true);
    }, 1000);

    return (
        <div>
            {loading === true ? (
                <PrivateRoute>
                    <div className="container">
                        <div className="row justify-content-center user-login-section">
                            <div className="col-md-5">
                                <div className="user-login-area shadow rounded-4 px-3 py-5">
                                    <h1 className="text-center text-capitalize">
                                        Complete your account.
                                    </h1>
                                    {errorMessage && (
                                        <h3 style={{ color: "#f00" }}>
                                            {errorMessage}
                                        </h3>
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
                                                    type="text"
                                                    className="form-control"
                                                    id="number"
                                                    name="phone"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <span
                                                    style={{
                                                        color: "var(--color-414042)",
                                                    }}
                                                >
                                                    <input
                                                        onClick={
                                                            handleSetPassword
                                                        }
                                                        type="checkbox"
                                                        id="helpText"
                                                    />{" "}
                                                    <label htmlFor="helpText">
                                                        Are you set password?
                                                    </label>
                                                </span>{" "}
                                                <small
                                                    title="Do you Set a Password for login phone and password?"
                                                    className="fs-6 fw-medium"
                                                    style={{
                                                        color: "var(--color-414042)",
                                                    }}
                                                >
                                                    <FaInfoCircle />
                                                </small>
                                            </div>
                                            {addtPassword && (
                                                <div>
                                                    <div className="mb-3">
                                                        <label
                                                            htmlFor="password"
                                                            className="form-label"
                                                        >
                                                            Password{" "}
                                                            <span>*</span>
                                                        </label>
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            id="password"
                                                            name="password"
                                                            value={
                                                                formData.password
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label
                                                            htmlFor="confpassword"
                                                            className="form-label"
                                                        >
                                                            Confirm Password{" "}
                                                            <span>*</span>
                                                        </label>
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            id="confpassword"
                                                            name="confpassword"
                                                            value={
                                                                formData.confpassword
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                onClick={handleRegistration}
                                            >
                                                Continue
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </PrivateRoute>
            ) : (
                <div className="body-loading">
                    <h2>Loading google auth data ...</h2>
                </div>
            )}
        </div>
    );
};

export default GoogleProfile;
