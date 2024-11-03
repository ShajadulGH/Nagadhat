"use client";
import { getAffiliateFinanceBankInfo } from "@/app/services/affiliate-finance/getAffiliateFinanceBankInfo";
import { updateAffiliateFinanceBankInfo } from "@/app/services/affiliate-finance/updateAffiliateFinanceBankInfo";
import { getDistrictForShipping } from "@/app/services/getDistrictForShipping";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const BankDetailsInfo = () => {
    const [bankInfo, setBankInfo] = useState({
        account_holder_name: '',
        bank_name: '',
        districts_id: '',
        bank_branch_name: '',
        account_number: '',
        routing_number: ''
    });
    const [districts, setDistricts] = useState([]); // Store all districts from API
    const [update, setUpdate] = useState(true);
    const [isEditable, setIsEditable] = useState(true);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchBankInfo = async () => {
            try {
                if (session?.accessToken) {
                    const response = await getAffiliateFinanceBankInfo(session.accessToken);
                    const bankData = response.results.data;
                    console.log(response);

                    // Prefill the form with the data received from the API
                    setBankInfo({
                        account_holder_name: bankData.account_holder_name,
                        bank_name: bankData.bank_name,
                        districts_id: bankData.district.id,
                        bank_branch_name: bankData.bank_branch_name,
                        account_number: bankData.account_number,
                        routing_number: bankData.routing_number
                    });
                    setIsEditable(response.results.bank_edit === 3);
                    
                }
            } catch (error) {
                console.error("Error fetching bank details", error);
            }
        };

        fetchBankInfo();
    }, [session?.accessToken, update]);

    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const response = await getDistrictForShipping();
                // Set all available districts for the dropdown
                setDistricts(response.results.districts);
            } catch (error) {
                console.error("Error fetching bank details", error);
            }
        };

        fetchDistricts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBankInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Update bank details 
        try {
            const response = await updateAffiliateFinanceBankInfo(session.accessToken, bankInfo);
            if (response.code === 200) {
                toast.success('Bank details updated successfully');
                setUpdate(!update);
            } else {
                toast.error(response.message);
                console.error('Error updating bank details', response.message);
            } 
        } catch (error) {
            toast.error(error.message);
            console.error('Error updating bank details', error);
        }
    };
    
    return (
        <div className="accordion-item mb-4 border-0 rounded-bottom">
            <ToastContainer/>
            <h2 className="accordion-header">
                <button
                    className="accordion-button shadow-none rounded-bottom bg-white customer-dashboard-subtitle"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#bank-collapseOne"
                    aria-expanded="true"
                    aria-controls="bank-collapseOne"
                >
                    Bank Details
                </button>
            </h2>
            <div
                id="bank-collapseOne"
                className="accordion-collapse collapse border-top show"
                data-bs-parent="#accordion-parent-id"
            >
                <div className="accordion-body">
                    <div className="customer-manage-profile-from-area">
                        <form className="row" onSubmit={handleSubmit}>
                            <div className="col-md-6 pb-3">
                                <label htmlFor="account_holder_name" className="form-label">
                                    Account Holder Name: <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="account_holder_name"
                                    className="form-control"
                                    id="account_holder_name"
                                    placeholder="Enter Account Holder Name.."
                                    value={bankInfo.account_holder_name}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                    required
                                />
                            </div>

                            <div className="col-md-6 pb-3">
                                <label htmlFor="bank_name" className="form-label">
                                    Bank Name: <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="bank_name"
                                    className="form-control"
                                    id="bank_name"
                                    placeholder="Enter Bank Name..."
                                    value={bankInfo.bank_name}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                    required
                                />
                            </div>

                            <div className="col-md-6 pb-3">
                                <label htmlFor="districts_id" className="form-label">
                                    District: <span style={{ color: "red" }}>*</span>
                                </label>
                                <select
                                    className="form-select district-list"
                                    name="districts_id"
                                    id="districts_id"
                                    value={bankInfo.districts_id}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                    required
                                >
                                    <option value="">Select District</option>
                                    {districts.map((district) => (
                                        <option key={district.id} value={district.id}>
                                            {district.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6 pb-3">
                                <label htmlFor="bank_branch_name" className="form-label">
                                    Branch Name: <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="bank_branch_name"
                                    className="form-control"
                                    id="bank_branch_name"
                                    placeholder="Enter Branch Name..."
                                    value={bankInfo.bank_branch_name}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                    required
                                />
                            </div>

                            <div className="col-md-6 pb-3">
                                <label htmlFor="account_number" className="form-label">
                                    Account Number: <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="number"
                                    name="account_number"
                                    className="form-control"
                                    id="account_number"
                                    placeholder="Enter Account Number..."
                                    value={bankInfo.account_number}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                    required
                                />
                            </div>

                            <div className="col-md-6 pb-3">
                                <label htmlFor="routing_number" className="form-label">
                                    Routing Number: <span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="number"
                                    name="routing_number"
                                    className="form-control"
                                    id="routing_number"
                                    placeholder="Enter Routing Number..."
                                    value={bankInfo.routing_number}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                    required
                                />
                            </div>

                            <div className="pb-2">
                                <span className="text-danger">
                                    {isEditable ?
                                        "* You can update this information only once time." :
                                        "* You cannot update this information anymore."}
                                </span>
                            </div>

                            <div className="">
                                <input
                                    className={`add-to-cart-link border-0 mx-auto ${!isEditable && "disabled-button"}`}
                                    type="submit"
                                    value="Update Info"
                                    disabled={!isEditable}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BankDetailsInfo;
