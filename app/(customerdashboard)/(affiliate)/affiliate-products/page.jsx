import AffiliateProductWrapper from "@/app/components/customerDashboard/affiliate/affiliateproducts/AffiliateProductWrapper";
import AffiliateRoute from "@/app/components/PrivateRoute/AffiliateRoute";

const AffiliateProductslinkPage = () => {
    return (
        <>
            <AffiliateRoute>
                <AffiliateProductWrapper />
            </AffiliateRoute>
        </>
    );
};

export default AffiliateProductslinkPage;
