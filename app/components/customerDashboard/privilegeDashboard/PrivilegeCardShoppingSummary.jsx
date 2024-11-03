import Link from "next/link";

const PrivilegeCardShoppingSummary = () => {
    return (
        <>
            <div className="row justify-content-end px-4 pt-2 pb-4 ">
                <div className="col-md-5 col-sm-12">
                    <ul className="table-bordered pb-4">
                        <li className=" fs-6 pb-2 d-flex align-items-center justify-content-between">
                            <span>Sub Total Amount:</span>{" "}
                            <strong>৳ 175</strong>
                        </li>
                        <li className=" fs-6 pb-2 d-flex align-items-center justify-content-between">
                            <span>Total Discount:</span> <strong>৳ 0</strong>
                        </li>
                        <li className=" fs-6 pb-2 d-flex align-items-center justify-content-between">
                            <span>Delivery Charge:</span> <strong>৳ 0</strong>
                        </li>
                        <li className=" fs-6 pb-2 d-flex align-items-center justify-content-between">
                            <span>Net Total Amount:</span>{" "}
                            <strong>৳ 175</strong>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center justify-content-end gap-3">
                        <Link
                            className="border-0 add-to-cart-link"
                            href="/privilege-card-dashboard"
                        >
                            Back
                        </Link>
                        <Link className="border-0 add-to-cart-link" href="#">
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivilegeCardShoppingSummary;
