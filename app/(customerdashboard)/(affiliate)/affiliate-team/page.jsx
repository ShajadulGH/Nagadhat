import AffiliateTeamWrapp from "@/app/components/customerDashboard/affiliate/affiliatemyteam/AffiliateTeamWrapp";
import AffiliateRoute from "@/app/components/PrivateRoute/AffiliateRoute";

const AffiliateTeamPage = () => {
    return (
        <>
            <AffiliateRoute>
                <AffiliateTeamWrapp />
            </AffiliateRoute>
        </>
    );
};

export default AffiliateTeamPage;
