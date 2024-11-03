import dynamic from "next/dynamic";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
const DiscountPartnerWrapper = dynamic(
    () => import("../components/discountPartner/DiscountPartnerWrapper"),
    { ssr: false }
);

const DiscountPartnersPage = () => {
    return (
        <>
            <PrivateRoute>
                <DiscountPartnerWrapper />
            </PrivateRoute>
        </>
    );
};

export default DiscountPartnersPage;
