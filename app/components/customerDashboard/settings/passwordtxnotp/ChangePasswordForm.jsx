"use client";
import postManagePassword from "@/app/services/postManagePassword";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const ChangePasswordForm = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [updatePassword, setUpdatePassword] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });
    const { data: session, status } = useSession();

    const togglePasswordVisibility = (field) => {
        switch (field) {
            case "current":
                setShowCurrentPassword(!showCurrentPassword);
                break;
            case "new":
                setShowNewPassword(!showNewPassword);
                break;
            case "confirm":
                setShowConfirmPassword(!showConfirmPassword);
                break;
            default:
                break;
        }
    };

    const changeHandle = (event) => {
        const { name, value } = event.target;
        setUpdatePassword((prevUpdate) => ({
            ...prevUpdate,
            [name]: value,
        }));
    };

    const passwordUpdateHandle = async (event) => {
        event.preventDefault();

        const { current_password, new_password, confirm_password } =
            updatePassword;
        if (!current_password || !new_password || !confirm_password) {
            toast.error("All fields are required.");
            return;
        }

        if (new_password !== confirm_password) {
            toast.error("New passwords do not match.");
            return;
        }

        if (status !== "authenticated" || !session?.accessToken) {
            toast.error("User not authenticated.");
            return;
        }

        try {
            const response = await postManagePassword(
                updatePassword,
                session?.accessToken
            );
            if (!response?.error) {
                toast.success(response?.message);
                setUpdatePassword({
                    current_password: "",
                    new_password: "",
                    confirm_password: "",
                });
            } else {
                console.error("Update failed:", response?.message);
                toast.error(
                    response?.message || "Failed to update Password Info."
                );
            }
        } catch (error) {
            console.error("Error during update:", error);
            if (error.message === "Incorrect current password.") {
                toast.error("Update failed: Incorrect current password.");
            } else {
                toast.error(
                    error.message ||
                        "An error occurred. Please try again later."
                );
            }
        }
    };

    return (
        <>
            <div
                className="tab-pane fade show active"
                id="change-password"
                role="tabpanel"
            >
                <form onSubmit={passwordUpdateHandle}>
                    <div className="customer-setting-form-group">
                        <label
                            className="form-label"
                            htmlFor="current_password"
                        >
                            Current Password
                        </label>
                        <div className="input-group">
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                className="form-control"
                                id="current_password"
                                name="current_password"
                                placeholder="Enter current password"
                                onChange={changeHandle}
                                value={updatePassword.current_password}
                            />
                            <span
                                className="password-view-icon"
                                onClick={() =>
                                    togglePasswordVisibility("current")
                                }
                                style={{ cursor: "pointer" }}
                            >
                                {showCurrentPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="customer-setting-form-group">
                        <label className="form-label" htmlFor="new_password">
                            New Password
                        </label>
                        <div className="input-group">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                className="form-control"
                                id="new_password"
                                name="new_password"
                                placeholder="Enter new password"
                                onChange={changeHandle}
                                value={updatePassword.new_password}
                            />
                            <span
                                className="password-view-icon"
                                onClick={() => togglePasswordVisibility("new")}
                                style={{ cursor: "pointer" }}
                            >
                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    <div className="customer-setting-form-group">
                        <label
                            className="form-label"
                            htmlFor="confirm_password"
                        >
                            Confirm New Password
                        </label>
                        <div className="input-group">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="form-control"
                                id="confirm_password"
                                name="confirm_password"
                                placeholder="Confirm new password"
                                onChange={changeHandle}
                                value={updatePassword.confirm_password}
                            />
                            <span
                                className="password-view-icon"
                                onClick={() =>
                                    togglePasswordVisibility("confirm")
                                }
                                style={{ cursor: "pointer" }}
                            >
                                {showConfirmPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </span>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="add-to-cart-link border-0 mx-auto"
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </>
    );
};

export default ChangePasswordForm;
