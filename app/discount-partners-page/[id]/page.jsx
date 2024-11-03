import PartnerDetailsWrapper from "@/app/components/discountPartner/PartnerDetailsWrapper";
import PrivateRoute from "@/app/components/PrivateRoute/PrivateRoute";

const DiscountPartnerDetailsPage = ({ params }) => {
    const partnerId = params.id;
    return (
        <PrivateRoute>
            <div className="container py-5">
                <PartnerDetailsWrapper partnerId={partnerId} />
            </div>
        </PrivateRoute>
    );
};

export default DiscountPartnerDetailsPage;
