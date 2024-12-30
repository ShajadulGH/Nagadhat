import Image from "next/image";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";

const OrderInvoiceTop = () => {
    return (
        <>
            <div className="row invoice-download-btn-section">
                <div className="col-12">
                    <div className="invoice-download-btn text-end py-3">
                        <button className="btn btn-success ms-2" onClick={() => window.print()}>
                            Download Invoice
                        </button>
                        <button className="btn btn-primary ms-2" onClick={() => window.print()}>
                            Print Invoice
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="invoice-contact-info col-6 fs-6">
                    <div className="d-flex align-items-start gap-2 font-xs fw-semibold">
                        <FaPhoneAlt className=" bg-praymary-color text-white rounded-circle p-1 " />
                        <p className="mb-2">Hotline: 09647-444-444</p>
                    </div>
                    <div className="d-flex align-items-start gap-2 font-xs fw-semibold">
                        <FaRegEnvelope className="bg-praymary-color text-white rounded-circle p-1" />
                        <p className="mb-2">Email: support@nagadhat.com.bd</p>
                    </div>
                    <div className="d-flex align-items-start gap-2 font-xs fw-semibold">
                        <FaGlobe className="bg-praymary-color text-white rounded-circle p-1" />
                        <p className="mb-2">Web: nagadhat.com.bd</p>
                    </div>
                </div>
                <div className="invoice-section-ph-logo col-6">
                    <div className="d-flex justify-content-end">
                        <Link href="/">
                            <div className="invoice-logo ">
                                <Image
                                    fill={true}
                                    className="img-fluid"
                                    src="/images/nagadhat-logo.png"
                                    alt="logo"
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="invoice-title text-center sub-section-margin-t">
                <h5 className="px-3 fw-bold py-1 d-inline border border-secondary rounded-pill">
                    INVOICE
                </h5>
            </div>
        </>
    );
};

export default OrderInvoiceTop;
