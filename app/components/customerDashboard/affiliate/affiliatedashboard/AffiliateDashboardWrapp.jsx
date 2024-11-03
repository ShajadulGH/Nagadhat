import { getAffiliateHomeDashboard } from "@/app/services/affiliate/getAffiliateHomeDashboard";
import AffiliateDashboardInfo from "./AffiliateDashboardInfo";
import AffiliateDashboardRank from "./AffiliateDashboardRank";
import AffiliateReferFriend from "./AffiliateReferFriend";
import AffiliateDashboardChartAndData from "./AffiliateDashboardChartAndData";
import { getAffiliateIncomeHistory } from "@/app/services/affiliate/getAffiliateIncomeHistory";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const AffiliateDashboardWrapp = async () => {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
        return <div>Please log in to view your dashboard.</div>;
    }

    try {
        // Fetch affiliate dashboard data
        const affiliateInfo = await getAffiliateHomeDashboard(session.accessToken);
        const affiliateData = affiliateInfo?.results || {};

        // Fetch income history data
        const incomeHistory = await getAffiliateIncomeHistory(session.accessToken);
        const incomeHistoryInfo = incomeHistory?.results?.data || [];

        return (
            <>
                <div className="customer-dashboard-section">
                    <div className="customer-dashboard-card h-100">
                        <div className="customer-dashboard-title-bar">
                            <div>
                                <h1 className="customer-dashboard-title">
                                    Affiliate Program
                                </h1>
                            </div>
                            <div className="fs-4">
                                <i className="fa-solid fa-bell"></i>
                            </div>
                        </div>
                        <AffiliateDashboardRank affiliateData={affiliateData} />
                        <AffiliateReferFriend affiliateData={affiliateData} />
                        <AffiliateDashboardInfo affiliateData={affiliateData} />
                        <AffiliateDashboardChartAndData
                            incomeHistoryInfo={incomeHistoryInfo}
                        />
                    </div>
                </div>
            </>
        );
    } catch (error) {
        console.error("Failed to fetch dashboard or income history data:", error);
        return <div>Error loading dashboard data. Please try again later.</div>;
    }
};

export default AffiliateDashboardWrapp;
