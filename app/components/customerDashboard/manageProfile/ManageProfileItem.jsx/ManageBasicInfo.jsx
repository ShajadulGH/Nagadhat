"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getManageBasicInfo } from "@/app/services/getManageBasicInfo";
import "react-toastify/dist/ReactToastify.css";
import { postManageBasicInfo } from "@/app/services/postManageBasicInfo";

const ManageBasicInfo = () => {
    const [formData, setFormData] = useState({
        username: "",
        mobile_number: "",
        email: "",
        date_of_birth: "",
        gender: "",
        marital_status: "",
    });

    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            const fetchManageBasicInfoData = async () => {
                try {
                    const basicInfo = await getManageBasicInfo(
                        session?.accessToken
                    );
                    const basicInfoResult = basicInfo?.results || {};
                    setFormData({
                        ...formData,
                        username: basicInfoResult.username || "",
                        mobile_number: basicInfoResult.mobile_number || "",
                        email: basicInfoResult.email || "",
                        date_of_birth: basicInfoResult.date_of_birth || "",
                        gender: basicInfoResult.gender || "",
                        marital_status: basicInfoResult.marital_status || "",
                    });
                } catch (error) {
                    toast.error("Failed to fetch user information.");
                }
            };
            fetchManageBasicInfoData();
        }
    }, [status, session]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check for  fields
        if (
            !formData.username ||
            !formData.mobile_number ||
            !formData.date_of_birth ||
            !formData.marital_status
        ) {
            toast.error("Please fill out all  fields.");
            return;
        }

        try {
            const response = await postManageBasicInfo(
                formData,
                session?.accessToken
            );

            if (!response?.error) {
                toast.success(response?.message);
            } else {
                console.error("Update failed:", response);
                toast.error(response.message || "Failed to update profile.");
            }
        } catch (error) {
            console.error("Error during update:", error);
            toast.error(
                error.message || "An error occurred. Please try again later."
            );
        }
    };

    if (status === "loading") {
        return (
            <div className=" d-flex align-items-center justify-content-center vh-100">
                <h1 className="text-center">Loading... </h1>;
            </div>
        );
    }

    return (
        <div className="accordion-item mb-4 border-0 rounded-bottom">
            <h2 className="accordion-header">
                <button
                    className="accordion-button shadow-none rounded-bottom bg-white customer-dashboard-subtitle"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="true"
                    aria-controls="flush-collapseOne"
                >
                    Basic Info
                </button>
            </h2>
            <div
                id="flush-collapseOne"
                className="accordion-collapse collapse border-top show"
                data-bs-parent="#accordionFlushExample"
            >
                <div className="accordion-body">
                    <div className="customer-manage-profile-from-area">
                        <form className="row" onSubmit={handleSubmit}>
                            <div className="col-md-6 pb-3">
                                <label
                                    htmlFor="username"
                                    className="form-label"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    id="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 pb-3">
                                <label
                                    htmlFor="mobile_number"
                                    className="form-label"
                                >
                                    Mobile Number
                                </label>
                                <input
                                    type="text"
                                    name="mobile_number"
                                    className="form-control"
                                    id="mobile_number"
                                    value={formData.mobile_number}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 pb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 pb-3">
                                <label
                                    htmlFor="date_of_birth"
                                    className="form-label"
                                >
                                    Date of Birth
                                    <span className="text-danger fw-bold">
                                        *
                                    </span>
                                </label>
                                <input
                                    type="date"
                                    name="date_of_birth"
                                    className="form-control"
                                    id="date_of_birth"
                                    value={formData.date_of_birth}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 pb-3">
                                <label htmlFor="gender" className="form-label">
                                    Gender
                                </label>
                                <select
                                    className="form-select district-list"
                                    name="gender"
                                    id="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            <div className="col-md-6 pb-3">
                                <label
                                    htmlFor="marital_status"
                                    className="form-label"
                                >
                                    Marital Status
                                    <span className="text-danger fw-bold">
                                        *
                                    </span>
                                </label>
                                <select
                                    className="form-select district-list"
                                    name="marital_status"
                                    id="marital_status"
                                    value={formData.marital_status}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                </select>
                            </div>
                            <div className="">
                                <input
                                    className="add-to-cart-link border-0 mx-auto"
                                    type="submit"
                                    value="Update Profile"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageBasicInfo;
