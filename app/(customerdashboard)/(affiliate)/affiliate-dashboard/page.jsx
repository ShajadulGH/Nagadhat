import AffiliateDashboardWrapp from "@/app/components/customerDashboard/affiliate/affiliatedashboard/AffiliateDashboardWrapp";
import AffiliateRoute from "@/app/components/PrivateRoute/AffiliateRoute";

const AffiliateDashboardPage = () => {
    return (
        <>
            <AffiliateRoute>
                <AffiliateDashboardWrapp />
            </AffiliateRoute>
        </>
    );
};

export default AffiliateDashboardPage;
