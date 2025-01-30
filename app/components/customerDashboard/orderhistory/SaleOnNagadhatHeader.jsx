import Image from "next/image";

const SaleOnNagadhatHeader = () => {
    return (
        <>
            <div className="modal-header d-flex gap-3">
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

                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
        </>
    );
};

export default SaleOnNagadhatHeader;
