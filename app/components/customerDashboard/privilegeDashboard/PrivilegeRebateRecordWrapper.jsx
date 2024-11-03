import PrivilegeRebateRecordData from "./PrivilegeRebateRecordData";

const PrivilegeRebateRecordWrapper = () => {
    return (
        <div className="customer-dashboard-order-history-area  ">
            <div className="customer-dashboard-order-history-title">
                <h4 className="mb-0">Rebate History</h4>
            </div>
            <PrivilegeRebateRecordData />
        </div>
    );
};

export default PrivilegeRebateRecordWrapper;
