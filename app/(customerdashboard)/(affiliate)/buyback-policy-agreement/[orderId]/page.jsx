import SellOnNgadhatDetailWrapp from "@/app/components/customerDashboard/affiliate/saleonnagadhatdetail/SellOnNgadhatDetailWrapp";

const page = ({ params }) => {
    const orderId = params.orderId;
    return (
        <>
            <SellOnNgadhatDetailWrapp orderId={orderId} />
        </>
    );
};

export default page;
