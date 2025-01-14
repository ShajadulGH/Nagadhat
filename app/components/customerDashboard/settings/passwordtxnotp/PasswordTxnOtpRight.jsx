"use client";
import { useSearchParams } from "next/navigation";
import ChangePasswordForm from "./ChangePasswordForm";
import ChangeTransactionOtp from "./ChangeTransactionOtp";
import PasswordTopNav from "./PasswordTopNav";

const PasswordTxnOtpRight = () => {
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab") || "password";

    return (
        <>
            <div className="customer-setting">
                <PasswordTopNav />
                <div className="tab-content customer-setting-body">
                    {tab === "password" && (
                        <ChangePasswordForm isActive={tab === "password"} />
                    )}
                    {tab === "transaction" && (
                        <ChangeTransactionOtp
                            isActive={tab === "transaction"}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default PasswordTxnOtpRight;
