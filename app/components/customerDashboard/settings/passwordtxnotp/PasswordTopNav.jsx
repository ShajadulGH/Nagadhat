"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PasswordTopNav = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentTab = searchParams.get("tab") || "password";
    const [activeTab, setActiveTab] = useState(currentTab);

    useEffect(() => {
        setActiveTab(currentTab); // Sync with URL
    }, [currentTab]);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId); // Update state
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set("tab", tabId);
        router.push(
            `${window.location.pathname}?${newSearchParams.toString()}`
        );
    };
    return (
        <>
            <div className="customer-setting-header">
                <ul className="nav nav-pills" id="myTab" role="tablist">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${
                                activeTab === "password" ? "active" : ""
                            }`}
                            id="change-password-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#change-password"
                            type="button"
                            role="tab"
                            onClick={() => handleTabClick("password")}
                        >
                            Change Password
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${
                                activeTab === "transaction" ? "active" : ""
                            }`}
                            id="transaction-otp-pin-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#transaction-otp-pin"
                            type="button"
                            role="tab"
                            onClick={() => handleTabClick("transaction")}
                        >
                            Transaction OTP/PIN
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default PasswordTopNav;
