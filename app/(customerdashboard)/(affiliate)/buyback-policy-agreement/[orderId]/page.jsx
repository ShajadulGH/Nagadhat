import SellOnNgadhatDetailWrapp from "@/app/components/customerDashboard/affiliate/saleonnagadhatdetail/SellOnNgadhatDetailWrapp";
import AffiliateRoute from "@/app/components/PrivateRoute/AffiliateRoute";

const page = ({ params }) => {
    const orderId = params.orderId;
    return (
        <>
            <AffiliateRoute>
                <SellOnNgadhatDetailWrapp orderId={orderId} />
            </AffiliateRoute>
        </>
    );
};

export default page;
