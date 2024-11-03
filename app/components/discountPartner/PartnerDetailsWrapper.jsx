import { getServerSession } from "next-auth";
import PartnerDetailInfo from "./PartnerDetailInfo";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getDiscountPartnerDetailsBySlug } from "@/app/services/discountPartner/getDiscountPartnerDetailsBySlug";
import Link from "next/link";

const PartnerDetailsWrapper = async ({ partnerId }) => {
    const session = await getServerSession(authOptions);
    const response = await getDiscountPartnerDetailsBySlug(
        session?.accessToken,
        partnerId
    );
    const partnerDetail = response?.results || {};
    const companyName = partnerDetail?.company_name;

    return (
        <>
            <div
                className=" text-center fs-1 py-2"
                style={{ background: "#44bc9d" }}
            >
                <h1 className="text-white mb-0">{companyName}</h1>
            </div>
            <PartnerDetailInfo partnerDetail={partnerDetail} />

            <div className="pt-5 pt-md-4 d-flex justify-content-center">
                <Link
                    className="add-to-cart-link w-50 w-md-50"
                    href={`/discount-partners-page`}
                >
                    Back
                </Link>
            </div>
        </>
    );
};

export default PartnerDetailsWrapper;
