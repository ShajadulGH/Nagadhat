import CompanyBankInfoTop from "./CompanyBankInfoTop";
import CompanyBankInfoLeft from "./CompanyBankInfoLeft";
import CompanyBankInfoRight from "./CompanyBankInfoRight";

const CompanyBankInfoWrapp = () => {
    return (
        <>
            <CompanyBankInfoTop />
            <div className="customer-manage-profile-info bg-white p-4">
                <div className="row gap-4 gap-md-0 align-items-center ">
                    <CompanyBankInfoLeft />
                    <CompanyBankInfoRight />
                </div>
            </div>
        </>
    );
};

export default CompanyBankInfoWrapp;
