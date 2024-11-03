import WithdrawWrapper from "@/app/components/customerDashboard/finance/WithdrawWrapper";
import FinanceTopTitle from "@/app/components/customerDashboard/finance/FinanceTopTitle";
import WithdrawHistory from "@/app/components/customerDashboard/finance/WithdrawHistory";
import WithdrawTopBanner from "@/app/components/customerDashboard/finance/WithdrawTopBanner";

const FinanceWithdraw = () => {
    return (
        <div className="customer-dashboard-order-history-area">
            <FinanceTopTitle title="Withdraw History" />
            <div className="p-4">
                {/* withdraw top banner section */}
                <WithdrawTopBanner />

                {/* Withdrawal History*/}
                <WithdrawHistory />
                
            </div>
        </div>
    );
};

export default FinanceWithdraw;
