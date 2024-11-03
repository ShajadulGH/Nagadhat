import { NagadhatPublicUrl } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";

const BuybackPolicyTopImage = ({ saleOnDetails }) => {
    const saleOnProductInfo = saleOnDetails?.product;
    const imageUrl = saleOnProductInfo?.product_thumbnail
        ? `${NagadhatPublicUrl}/${saleOnProductInfo.product_thumbnail}`
        : "/images/flash-img1.jpg";

    return (
        <>
            <div className="row align-items-center py-4 px-4">
                <div className="col-md-5">
                    <div
                        className="position-relative w-75  mb-md-0 mb-4"
                        style={{ height: "255px" }}
                    >
                        <Image
                            src={imageUrl}
                            alt={
                                saleOnProductInfo?.product_name ||
                                "Default Product Image"
                            }
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                </div>
                <div className=" col-md-7">
                    <h1 className="fs-2">
                        {saleOnProductInfo?.product_name || "N/A"}
                    </h1>
                    <Link
                        className="btn btn-success"
                        href={`/buyback-policy-agreement/${saleOnDetails?.order_id}`}
                    >
                        Resell Agreement
                    </Link>
                </div>
            </div>
        </>
    );
};

export default BuybackPolicyTopImage;
