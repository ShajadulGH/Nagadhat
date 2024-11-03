import Image from "next/image";

const SaleOnNagadhatHeader = () => {
    return (
        <>
            <div className="modal-header align-items-start">
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
