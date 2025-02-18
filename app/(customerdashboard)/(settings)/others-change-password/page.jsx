import FinanceTopTitle from "@/app/components/customerDashboard/finance/FinanceTopTitle";
import ChangePasswordForm from "@/app/components/customerDashboard/settings/passwordtxnotp/ChangePasswordForm";

const ChangePasswordPage = () => {
    return (
        <>
            <div className="customer-setting">
                <FinanceTopTitle title="Change Password" />
                <div className="tab-content customer-setting-body">
                    <ChangePasswordForm />
                </div>
            </div>
        </>
    );
};

export default ChangePasswordPage;
