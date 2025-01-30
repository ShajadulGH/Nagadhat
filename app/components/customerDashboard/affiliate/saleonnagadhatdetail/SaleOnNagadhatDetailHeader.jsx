import Image from "next/image";

const SaleOnNagadhatDetailHeader = () => {
    return (
        <>
            <div className="customer-dashboard-order-history-title saleon-nagadhat-detail-header">
                <div className="d-flex justify-content-between align-items-center gap-4 w-100 ">
                    <div className="">
                        <Image
                            src={`/images/Salle-on-Nagadhat-Logo-1.png`}
                            sizes="100vw"
                            alt="image 1"
                            width={300}
                            height={35}
                            className="img-fluid"
                        />
                    </div>
                    <div className="">
                        <Image
                            src={`/images/Salle-on-Nagadhat-Logo-2.png`}
                            sizes="100vw"
                            alt="image 2"
                            width={300}
                            height={25}
                            className="img-fluid"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SaleOnNagadhatDetailHeader;
