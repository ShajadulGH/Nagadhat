import WithdrawWrapper from "@/app/components/customerDashboard/finance/WithdrawWrapper";
import AffiliateRoute from "@/app/components/PrivateRoute/AffiliateRoute";

const FinanceWithdraw = () => {
    return (
        <AffiliateRoute>
            <WithdrawWrapper />
        </AffiliateRoute>
    );
};

export default FinanceWithdraw;
