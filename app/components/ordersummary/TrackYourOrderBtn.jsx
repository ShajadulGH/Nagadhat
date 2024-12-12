import Link from "next/link";

const TrackYourOrderBtn = ({ orderSummary }) => {
    return (
        <>
            <Link
                href={`/orderview?orderid=${orderSummary?.order_id}`}
                className="add-to-cart-link border-0"
            >
                Track Your Order
            </Link>
        </>
    );
};

export default TrackYourOrderBtn;
