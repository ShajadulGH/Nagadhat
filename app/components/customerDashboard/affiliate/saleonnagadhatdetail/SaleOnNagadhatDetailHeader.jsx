import Image from "next/image";

const SaleOnNagadhatDetailHeader = () => {
    return (
        <>
            <div className="customer-dashboard-order-history-title saleon-nagadhat-detail-header">
                <div
                    className=" position-relative w-100 me-4"
                    style={{ height: "100px" }}
                >
                    <Image
                        src={`/images/Pad-1.png`}
                        fill
                        sizes="100vw"
                        alt="image"
                    />
                </div>
            </div>
        </>
    );
};

export default SaleOnNagadhatDetailHeader;
