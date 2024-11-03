import FinanceTopTitle from "@/app/components/customerDashboard/finance/FinanceTopTitle";
import TransferForm from "@/app/components/customerDashboard/finance/TransferForm";


const FinanceTransfer = () => {    

    return (
        <div className="customer-dashboard-order-history-area">
            <FinanceTopTitle title="Transfer" />
            <div className="p-4">
                {/*Transfer section */}
                {/* transfer form */}
                <TransferForm />
            </div>
        </div>
    );
};

export default FinanceTransfer;
