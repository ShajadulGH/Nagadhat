import Link from "next/link";
import { FaAt } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa";
import { FaMapMarked } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";

const PartnerDetailInfoRight = ({ partnerDetail }) => {
    return (
        <>
            <div className="col-md-6 col-12">
                <div className="">
                    <h6 className="mb-2 fs-3 text-capitalize">Offer Details</h6>
                    <p className="pb-2 fs-6">
                        {partnerDetail?.company_brief || "N/A"}
                    </p>
                    <p className="pb-2 fs-5">
                        <strong style={{ color: "#44bc9d" }}>
                            Applicability:{" "}
                        </strong>{" "}
                        {partnerDetail?.applicability}
                    </p>

                    <p className="pb-2 fs-5 text-wrap">
                        <strong style={{ color: "#44bc9d" }}>Facebook: </strong>
                        <Link
                            className="text-wrap text-break"
                            href={
                                partnerDetail?.face_book_url ||
                                `https://www.facebook.com`
                            }
                        >
                            {partnerDetail?.face_book_url ||
                                `https://www.facebook.com`}
                        </Link>
                    </p>

                    <p className="pb-2 fs-5 text-wrap">
                        <strong style={{ color: "#44bc9d" }}>
                            <FaGlobe /> Website:{" "}
                        </strong>
                        <Link href={partnerDetail?.website_url || "N/A"}>
                            {partnerDetail?.website_url || "N/A"}
                        </Link>
                    </p>

                    <p className="pb-2 fs-5 text-wrap">
                        <strong style={{ color: "#44bc9d" }}>
                            <FaAt /> E-mail:{" "}
                        </strong>
                        <Link href={`mailto:${partnerDetail?.contact_email}`}>
                            {partnerDetail?.contact_email || "N/A"}
                        </Link>
                    </p>
                    <p className="pb-2 fs-5">
                        <strong style={{ color: "#44bc9d" }}>
                            <FaPhoneVolume /> Hotline Line:{" "}
                        </strong>
                        <Link href={`tel:01778590590`}>01778590590</Link>
                    </p>
                    <p className="pb-2 fs-5 text-wrap">
                        <strong style={{ color: "#44bc9d" }}>
                            <FaMapMarked /> Location/Address:{" "}
                        </strong>
                        <span>{partnerDetail?.location || "N/A"}</span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default PartnerDetailInfoRight;
