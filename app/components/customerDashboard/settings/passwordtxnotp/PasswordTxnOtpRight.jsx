
import FinanceTopTitle from "../../finance/FinanceTopTitle";
import ChangeTransactionOtp from "./ChangeTransactionOtp";

const PasswordTxnOtpRight = () => {
    return (
        <>
            <div className="customer-setting">
                <FinanceTopTitle title="Transaction OTP/PIN" />
                <div className="tab-content customer-setting-body">
                    {/* <ChangePasswordForm /> */}
                    <ChangeTransactionOtp />
                </div>
            </div>
        </>
    );
};

export default PasswordTxnOtpRight;
