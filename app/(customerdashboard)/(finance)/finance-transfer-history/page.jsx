import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FinanceTopTitle from "@/app/components/customerDashboard/finance/FinanceTopTitle";
import { geAffiliateFinanceTransferHistory } from "@/app/services/affiliate-finance/geAffiliateFinanceTransferHistory";
import { getServerSession } from "next-auth";
import FinanceHistoryModalTable from "@/app/components/customerDashboard/finance/FinanceHistoryModalTable";

const FinanceTransferHistory = async () => {
    // Get server session
    const session = await getServerSession(authOptions);
    
    // Fetch affiliate finance transfer history data
    const { results: data } = await geAffiliateFinanceTransferHistory(session?.accessToken);

    return (
        <div className="customer-dashboard-order-history-area">
            <FinanceTopTitle title="Transfer History" />
            <div className="p-4 overflow-x-scroll">
                {/* Transactions section */}
                <FinanceHistoryModalTable data={data}/>
            </div>
        </div>
    );
};

export default FinanceTransferHistory;
