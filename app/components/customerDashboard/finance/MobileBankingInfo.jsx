"use client";
import { useEffect, useState } from "react";
import { getAffiliateFinanceMobileBankingInfo } from "@/app/services/affiliate-finance/getAffiliateFinanceMobileBankingInfo";
import { useSession } from "next-auth/react";
import { updateAffiliateFinanceMobileBankInfo } from "@/app/services/affiliate-finance/updateAffiliateFinanceMobileBankInfo";
import { toast } from "react-toastify";

const MobileBankingInfo = () => {
    const { data: session } = useSession();
    const [mobileBankingInfo, setMobileBankingInfo] = useState({
        bkash_number: "",
        nagad_number: "",
        rocket_number: "",
        dbbl_agent_number: ""
    });
    const [isEditable, setIsEditable] = useState(true);
    const [update, setUpdate] = useState(true);

    useEffect(() => {
        const fetchMobileBankInfo = async () => {
            try {
                if (session?.accessToken) {
                    const response = await getAffiliateFinanceMobileBankingInfo(session.accessToken);
                    if (response?.results?.data) {
                        const data = response.results.data;
                        setMobileBankingInfo({
                            bkash_number: data.bkash_number || "",
                            nagad_number: data.nagad_number || "",
                            rocket_number: data.rocket_number || "",
                            dbbl_agent_number: data.dbbl_agent_number || ""
                        });
                        setIsEditable(data.mobile_edit === 2);
                    }
                }
            } catch (error) {
                console.error("Error fetching bank details", error);
                toast.error("Failed to fetch mobile banking info.");
            }
        };

        fetchMobileBankInfo();
    }, [session?.accessToken, update]);

    const handleInputChange = (e) => {
        setMobileBankingInfo({
            ...mobileBankingInfo,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateAffiliateFinanceMobileBankInfo(session.accessToken, mobileBankingInfo);
            if (response.code === 200) {
                toast.success('Mobile Banking details updated successfully');
                setUpdate(!update);
            } else {
                toast.error(response.message);
                console.log('Error updating mobile banking details', response.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log('Error updating mobile banking details', error);
        }
    };

    return (
        <div className="accordion-item border-0 mb-4 rounded">
            <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed rounded bg-white customer-dashboard-subtitle"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mobile-main-collapse"
                    aria-expanded="true"
                    aria-controls="mobile-main-collapse"
                >
                    Mobile Banking
                </button>
            </h2>
            <div
                id="mobile-main-collapse"
                className="accordion-collapse collapse"
                data-bs-parent="#accordion-parent-id"
            >
                <div className="accordion-body border-top">
                    <div className="customer-manage-profile-from-area">
                        <form className="row" onSubmit={handleSubmit}>
                            <div className="col-md-6 pb-3">
                                <label htmlFor="bkash_number" className="form-label">
                                    Bkash:
                                </label>
                                <input
                                    type="number"
                                    name="bkash_number"
                                    className="form-control"
                                    id="bkash_number"
                                    placeholder="Enter Bkash Number..."
                                    value={mobileBankingInfo.bkash_number}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                />
                            </div>
                            <div className="col-md-6 pb-3">
                                <label htmlFor="nagad_number" className="form-label">
                                    Nagad:
                                </label>
                                <input
                                    type="number"
                                    name="nagad_number"
                                    className="form-control"
                                    id="nagad_number"
                                    placeholder="Enter Nagad Number..."
                                    value={mobileBankingInfo.nagad_number}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                />
                            </div>
                            <div className="col-md-6 pb-3">
                                <label htmlFor="rocket_number" className="form-label">
                                    Rocket:
                                </label>
                                <input
                                    type="number"
                                    name="rocket_number"
                                    className="form-control"
                                    id="rocket_number"
                                    placeholder="Enter Rocket Number..."
                                    value={mobileBankingInfo.rocket_number}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                />
                            </div>
                            <div className="col-md-6 pb-3">
                                <label htmlFor="agent_banking" className="form-label">
                                    DBBL Agent Banking:
                                </label>
                                <input
                                    type="number"
                                    name="dbbl_agent_number"
                                    className="form-control"
                                    id="agent_banking"
                                    placeholder="Enter DBBL Agent Number..."
                                    value={mobileBankingInfo.dbbl_agent_number}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
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
                                    className={`add-to-cart-link border-0 mx-auto ${!isEditable ? "disabled-button" : ""}`}
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

export default MobileBankingInfo;
