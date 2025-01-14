import ChangePasswordForm from "@/app/components/customerDashboard/settings/passwordtxnotp/ChangePasswordForm";

const ChangePasswordPage = () => {
    return (
        <>
            <div className="customer-setting">
                <div className="customer-setting-header">
                    <ul className="nav nav-pills" id="myTab" role="tablist">
                        <li className="nav-item w-100">
                            <h6 className={`nav-link active text-center fs-5`}>
                                Change Password
                            </h6>
                        </li>
                    </ul>
                </div>
                <div className="tab-content customer-setting-body">
                    <ChangePasswordForm />
                </div>
            </div>
        </>
    );
};

export default ChangePasswordPage;
