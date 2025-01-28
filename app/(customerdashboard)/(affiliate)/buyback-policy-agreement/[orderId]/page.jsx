import SellOnNgadhatDetailWrapp from "@/app/components/customerDashboard/affiliate/saleonnagadhatdetail/SellOnNgadhatDetailWrapp";
import AffiliateRoute from "@/app/components/PrivateRoute/AffiliateRoute";

const Page = ({ params, searchParams }) => {
    const orderId = params?.orderId;
    const buybackId = searchParams?.["buyback-id"];

    console.log("buybackId", buybackId);

    return (
        <AffiliateRoute>
            <SellOnNgadhatDetailWrapp orderId={orderId} buybackId={buybackId} />
        </AffiliateRoute>
    );
};

export default Page;
