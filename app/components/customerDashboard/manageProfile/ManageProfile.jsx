import React, { Suspense } from "react";
import ManageBasicInfo from "./ManageProfileItem.jsx/ManageBasicInfo";
// import ManageShippingAddress from "./ManageProfileItem.jsx/ManageShippingAddress";
import ManageTakePhoto from "./ManageProfileItem.jsx/ManageTakePhoto";
import ManageIDVerification from "./ManageProfileItem.jsx/ManageIDVerification";
import ManageNomineeInfo from "./ManageProfileItem.jsx/ManageNomineeInfo";

const ManageProfile = () => {
    return (
        <>
            <div className="customer-manage-profile-title">
                <h1 className="customer-dashboard-title">Manage Profile/KYC</h1>
            </div>
            <div className="customer-manage-profile-info">
                <div
                    className="accordion accordion-flush rounded-bottom"
                    id="accordionFlushExample"
                >
                    <ManageBasicInfo />
                    {/* <ManageShippingAddress /> */}
                    <ManageTakePhoto />
                    <ManageIDVerification />
                    <ManageNomineeInfo />
                </div>
            </div>
        </>
    );
};

export default ManageProfile;
