"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { registerUser } from "../services/registerUser";
import { validatePhoneNumber } from "../services/validatePhoneNumber";
import { getRequestPath } from "../utils";
import { getAffiliateNewSignup } from "../services/affiliate/getAffiliateNewSignup";

const Registration = () => {
    return (
        <>
            <div className="container">
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "60vh" }}
                >
                    <h1>Registration is not possible at this time.</h1>
                </div>
            </div>
        </>
    );
    const [toggleSponsored, setToggleSponsored] = useState("self");
    const [affiliateSignup, setAffiliateSignup] = useState([]);
    const [selectedChildName, setSelectedChildName] = useState("");
    const [selectedPlacementChildId, setSelectedPlacementChildId] = useState(0);
    const [selectedPlacementId, setSelectedPlacementId] = useState(0);
    const router = useRouter();
    const searchParams = useSearchParams();
    const referralId = searchParams.get("id");
    const referral = searchParams.get("referral");
    const refName = searchParams.get("ref_name");
    const fromPath = searchParams.get("from");
    const { status, data: session } = useSession();

    const [referrerID, setReferrerID] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("referrerID") || "";
        }
        return "";
    });

    useEffect(() => {
        async function fetchData() {
            if (session != undefined && !referralId && !referral && fromPath) {
                router.push(fromPath);
            }
        }
        fetchData();
    }, [session?.user?.email, referralId, referral]);

    const [errorMessage, setErrorMessage] = useState("");
    const [existsEmail, setExistsEmail] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        gender: "",
        referrer_id: "",
        placement_user_id: "",
    });

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            referrer_id:
                parseInt(referral) || parseInt(referralId) || referrerID || 0,
            placement_user_id: parseInt(selectedPlacementChildId) || 0,
            dropdown_child_user_id: parseInt(selectedPlacementId) || 0,
        }));
    }, [
        selectedPlacementChildId,
        referralId,
        referral,
        referrerID,
        selectedPlacementId,
    ]);

    useEffect(() => {
        // console.log("formData========>", { formData });
        // console.log("referrerID========>", { referrerID });
    }, [formData, referrerID]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSponsoreChange = (e) => {
        const { name, value } = e.target;
        if (name === "referral") {
            setToggleSponsored(value);
            fetchAffiliateNewSignup();
        }
    };
    useEffect(() => {
        if (affiliateSignup && selectedPlacementChildId) {
            let selectedUser = affiliateSignup.find(
                (user) => user.child.id === parseInt(selectedPlacementChildId)
            );
            setSelectedChildName(selectedUser?.child);
        }
    }, [selectedPlacementChildId]);

    const fetchAffiliateNewSignup = async () => {
        if (status === "authenticated") {
            try {
                const newSignupData = await getAffiliateNewSignup(
                    session?.accessToken
                );
                const newSignupResult = newSignupData?.results?.placement;
                setAffiliateSignup(newSignupResult);
            } catch (error) {
                console.error("Failed to fetch new signup data:", error);
            }
        }
    };
    useEffect(() => {
        if (toggleSponsored == "self") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                referrer_id:
                    parseInt(referral) ||
                    parseInt(referralId) ||
                    referrerID ||
                    "",
                placement_user_id: "",
                dropdown_child_user_id: "",
            }));
            fetchAffiliateNewSignup();
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                referrer_id:
                    parseInt(referral) ||
                    parseInt(referralId) ||
                    referrerID ||
                    0,
                placement_user_id: parseInt(selectedPlacementChildId) || 0,
                dropdown_child_user_id: parseInt(selectedPlacementId) || 0,
            }));
        }
    }, [toggleSponsored]);

    const valideateInput = (formValue) => {
        for (const input in formValue) {
            if (["name", "phone", "password"].includes(input)) {
                if (!formValue[input]) {
                    return false;
                }
            }
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        async function createUser() {
            const isValidInput = valideateInput(formData);
            if (!isValidInput) {
                setErrorMessage("Please provide required information");
            }

            if (errorMessage) {
                return;
            }

            try {
                const res = await registerUser(formData);

                if (res?.success != true) {
                    // if (res.message == "Phone Already Exists! You do not verify your OTP OT Delete Customer API Call!") {
                    //     router.push(`/otp?phone=${formData.phone}`);
                    //     return;
                    // }

                    if (
                        res.message ==
                        "Referrer User Not Found! Please try another Referrer."
                    ) {
                        localStorage.removeItem("referrerID");
                        formData.referrer_id = "";
                    }
                    // else if (res.message == "Validation Error.") {
                    //     setErrorMessage(res.data.phone[0]);
                    //     return;
                    // }
                    alert(res.message);
                    return;
                }

                localStorage.removeItem("referrerID");
                localStorage.setItem("userEmail", formData.email);
                router.push(`/otp?phone=${formData.phone}`);
            } catch (error) {
                alert("Something went wrong. Please try after sometime");
            }
        }

        createUser();
    };

    useEffect(() => {
        const checkPhoneNumberValidity = async () => {
            setErrorMessage("");
            const phone_number = formData.phone;
            let phone_number_length = phone_number.length;

            if (phone_number_length < 11) {
                setExistsEmail("");
                return;
            }

            if ((phone_number_length = 11)) {
                try {
                    const res = await validatePhoneNumber({
                        phone: formData.phone,
                    });

                    if (res?.message.includes("Already Exists")) {
                        setFormData({ ...formData, email: res.email });
                        setErrorMessage(res?.message);

                        setExistsEmail(res.email);
                    } else {
                        setErrorMessage("");
                    }
                } catch (error) {
                    alert("Something went wrong. Please try after sometime");
                    console.log(error);
                }
            }

            return;
        };
        checkPhoneNumberValidity();
    }, [formData.phone]);

    const handleSetPlacemnt = (e) => {
        const selectedUserId = e.target.value;
        const selectedUser = affiliateSignup.find(
            (user) => user.child?.id == selectedUserId
        );

        setSelectedPlacementChildId(selectedUser?.child?.id);
        setSelectedPlacementId(selectedUser?.id);
    };

    return (
        <div className="container">
            <div className="user-login-section">
                <div className="user-login-area-container mx-auto">
                    <div className="user-login-area shadow rounded-4 px-3 py-5">
                        <h1 className="text-center text-capitalize">
                            registration.
                        </h1>
                        {errorMessage && (
                            <h3 style={{ color: "#f00" }}>{errorMessage}</h3>
                        )}
                        <div className="user-login-form">
                            <form onSubmit={handleSubmit}>
                                {/* affiliate referral id */}
                                <input
                                    type="hidden"
                                    name="referrer_id"
                                    value={formData.referrer_id}
                                    onChange={handleInputChange}
                                />
                                {/* affiliate referral id */}
                                {/* affiliate sponsor id */}
                                <input
                                    type="hidden"
                                    name="placement_user_id"
                                    value={formData.placement_user_id}
                                    onChange={handleInputChange}
                                />
                                {/* affiliate sponsor id */}

                                <div className="mb-3">
                                    <label
                                        htmlFor="name"
                                        className="form-label"
                                    >
                                        Name <span>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter Your Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="number"
                                        className="form-label"
                                    >
                                        Phone Number <span>*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="phone"
                                        className="form-control"
                                        id="number"
                                        placeholder="Enter Phone Number"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email (Optional)
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter Email"
                                        value={
                                            existsEmail
                                                ? existsEmail
                                                : formData.email
                                        }
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Password <span>*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3 ">
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            id="gender1"
                                            value="Male"
                                            onChange={handleInputChange}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="gender1"
                                        >
                                            Male
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            id="gender2"
                                            value="Female"
                                            onChange={handleInputChange}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="gender2"
                                        >
                                            Female
                                        </label>
                                    </div>
                                </div>
                                {referral && (
                                    <div className="mb-3 ">
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="referral"
                                                id="referral1"
                                                value="self"
                                                defaultChecked
                                                onChange={handleSponsoreChange}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="referral1"
                                            >
                                                Self
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="referral"
                                                id="referral12"
                                                value="placement"
                                                onChange={handleSponsoreChange}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="referral12"
                                            >
                                                Placement
                                            </label>
                                        </div>
                                    </div>
                                )}
                                {toggleSponsored != "self" && (
                                    <div className="mb-3">
                                        <label
                                            htmlFor="placement"
                                            className="form-label"
                                        >
                                            * Select a Team
                                        </label>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            id="placement"
                                            onChange={(e) =>
                                                handleSetPlacemnt(e)
                                            }
                                        >
                                            <option>Select</option>

                                            {affiliateSignup.length > 0 &&
                                                affiliateSignup.map((user) => {
                                                    return (
                                                        <option
                                                            key={user.id}
                                                            value={
                                                                user?.child?.id
                                                            }
                                                        >
                                                            {user?.name} (
                                                            {user?.username})
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                )}
                                {selectedChildName && (
                                    <p className="pb-2 text-capitalize">
                                        {selectedChildName?.name} (
                                        {selectedChildName?.username})
                                    </p>
                                )}

                                <div className="mb-3">
                                    <p>
                                        By clicking "Continue", I agree to
                                        Nagadhat's
                                        <Link href="#">
                                            Terms and Conditions
                                        </Link>
                                        and <Link href="#">Privacy Policy</Link>
                                    </p>
                                </div>
                                {refName && (
                                    <p
                                        className="pb-2"
                                        style={{ color: "#44bc9d" }}
                                    >
                                        * Referer:{refName}
                                    </p>
                                )}
                                {referral && (
                                    <p
                                        className="pb-2"
                                        style={{ color: "#44bc9d" }}
                                    >
                                        * Referer: {session?.user?.name}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Continue
                                </button>
                            </form>
                            <div className="user-social-login mt-3">
                                {/* <label className="form-label">
                                    Or Sign Up With
                                </label> */}
                                {/* <div className="mb-3 user-social-login-item d-flex align-items-center  justify-content-center "> */}
                                {/* <button>Sign in with Facebook</button> */}
                                {/* <button>
                                        {" "}
                                        <Image
                                            width={25}
                                            height={25}
                                            alt="google-img"
                                            src="/images/google-img.png"
                                        ></Image>{" "}
                                        Sign Up with Google
                                    </button> */}
                                {/* </div> */}
                                <p className="form-label">
                                    <Link href="/"> Back to home</Link>
                                </p>
                                <p className="text-center">
                                    Existing User ?{" "}
                                    <Link href="/login">Login here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
