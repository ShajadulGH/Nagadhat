import Image from "next/image";
import congratulations from "@/public/images/congratulations.gif";
import { getDiscountPartnerData } from "../services/discountPartner/getDiscountPartnerData";
import Link from "next/link";

const PartnerPage = async ({searchParams}) => {
    // Get the id from search params
    const { id } = searchParams;
    // fetch the partner information
    const partnerData = await getDiscountPartnerData(id);
    const partner = partnerData?.results;

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 py-5">
                    <div className="text-center">
                        <h1 className="mb-3 praymary-color">Congratulations</h1>
                        <div className="done drawn mx-auto mb-3" style={{ width: "320px", height: "220px" }}>
                            <Image className="w-100 h-100" src={congratulations} alt="congratulations" />
                        </div>
                        <div className="pb-4">
                            <p className="fs-6">You have successfully requested to join partnership with us.</p>
                            <div className="py-3">
                                <p className="text-info fs-3 pb-2">{partner?.company_name}</p>
                                <p className="pb-1 fw-semibold">Here are your details:</p>
                                <p>Owned by: {partner?.owner_name}, {partner?.contact_number}.</p>
                                <p>Date: {partner?.Date}</p>
                                <p>Time: {partner?.Time}</p>
                                <p>ID: {partner?.ID}</p>
                            </div>
                            <div>
                                <p className="pb-2 fw-semibold">Eagerly awaiting your visit to our office:</p>
                                <p>Khaja Super Market, 2nd to 7th Floor, Kallyanpur Bus Stop,
                                    Mirpur Road, Dhaka-1207.</p>
                                <p>
                                    Call on{' '}
                                    <a href="tel:+8801906198502" className="text-danger">
                                        01906198502
                                    </a>{' '}
                                    for more details.
                                </p>
                                <p className="pt-3">Regards, Nagadhat Bangladesh Ltd</p>
                            </div>
                        </div>
                        <Link className="add-to-cart-link d-inline-block" href="/">Return To Shop</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerPage;
