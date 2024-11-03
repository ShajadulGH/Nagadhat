import { NagadhatPublicUrl } from "@/app/utils";
import Image from "next/image";

const PartnerDetailImage = ({ partnerDetail }) => {
    const imageUrl = partnerDetail?.company_logo
        ? `${NagadhatPublicUrl}/${partnerDetail.company_logo}`
        : `/images/placeholder--image.jpg`;

    return (
        <div className="col-md-6 col-12">
            <div
                className="mb-4 position-relative w-100"
                style={{ height: "320px" }}
            >
                <Image
                    fill
                    src={imageUrl}
                    alt="Company Logo"
                    style={{ objectFit: "cover" }}
                />
            </div>
        </div>
    );
};

export default PartnerDetailImage;
