import AffiliateRankWrapp from "@/app/components/customerDashboard/affiliate/affiliaterankreward/AffiliateRankWrapp";
import AffiliateRoute from "@/app/components/PrivateRoute/AffiliateRoute";

const AffiliateRankRewardPage = () => {
    return (
        <>
            <AffiliateRoute>
                <AffiliateRankWrapp />
            </AffiliateRoute>
        </>
    );
};

export default AffiliateRankRewardPage;
