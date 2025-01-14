
import ChangeTransactionOtp from "./ChangeTransactionOtp";
import PasswordTopNav from "./PasswordTopNav";

const PasswordTxnOtpRight = () => {
    return (
        <>
            <div className="customer-setting">
                <PasswordTopNav />
                <div className="tab-content customer-setting-body">
                    {/* <ChangePasswordForm /> */}
                    <ChangeTransactionOtp />
                </div>
            </div>
        </>
    );
};

export default PasswordTxnOtpRight;
