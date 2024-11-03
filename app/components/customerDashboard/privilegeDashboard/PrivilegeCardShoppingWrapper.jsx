import PrivilegeCardShoppingSummary from "./PrivilegeCardShoppingSummary";
import PrivilegeCardShoppingTable from "./PrivilegeCardShoppingTable";

const PrivilegeCardShoppingWrapper = () => {
    return (
        <>
            <div className="customer-dashboard-order-history-area pt-4">
                <h4 className="text-center mb-3">Selected Products</h4>

                <PrivilegeCardShoppingTable />
                <PrivilegeCardShoppingSummary />
            </div>
        </>
    );
};

export default PrivilegeCardShoppingWrapper;
