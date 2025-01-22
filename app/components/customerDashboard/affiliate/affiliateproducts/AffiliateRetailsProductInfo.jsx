"use client";
import NoDataFound from "@/app/components/NoDataFound";
import { NagadhatPublicUrl, truncateTitle } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CopyToClipboard from "react-copy-to-clipboard";

const AffiliateRetailsProductInfo = ({
    retailProduct,
    outletId,
    handleCopy,
    referralLink,
    copied,
}) => {
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab") || "retails-tab";
    return (
        <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-4 g-2 g-md-3">
            {retailProduct?.length > 0 ? (
                retailProduct?.map((product) => {
                    const imageUrl = `${NagadhatPublicUrl}/${product?.product_thumbnail}`;
                    return (
                        <div
                            key={product.id}
                            className="flash-sale-content-item col"
                        >
                            <div className="flash-sale-content-bg nh-hover-box-shadow">
                                <Link
                                    href={`/products/${product?.slug}?outlet_id=${outletId}&tab=${tab}`}
                                >
                                    <div className="flash-sale-content-img image-hover-effect">
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "150px",
                                                position: "relative",
                                                display: "inline-block",
                                            }}
                                        >
                                            <Image
                                                fill
                                                src={
                                                    imageUrl ||
                                                    "/images/flash-img1.jpg"
                                                }
                                                className="img-fluid"
                                                alt={
                                                    product?.product_name ||
                                                    "Product image"
                                                }
                                                sizes="(max-width: 576px) 100vw, 
                                                (max-width: 768px) 100vw, 
                                                (max-width: 992px) 100vw, 
                                                100vw"
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flash-sale-content-info text-hover-effect">
                                        <h4 title={product.product_name}>
                                            {truncateTitle(
                                                product.product_name,
                                                36
                                            )}
                                        </h4>
                                        <div className=" d-flex align-items-center justify-content-between ">
                                            {product?.after_discount_mrp_price ==
                                            product?.mrp_price ? (
                                                <strong>
                                                    {`৳ ${product?.mrp_price}`}
                                                </strong>
                                            ) : (
                                                <>
                                                    <strong>{`৳ ${product?.after_discount_mrp_price}`}</strong>
                                                    <strong>
                                                        <del
                                                            style={{
                                                                color: "#ACACAC",
                                                            }}
                                                        >
                                                            {`৳ ${product?.mrp_price}`}
                                                        </del>
                                                    </strong>
                                                </>
                                            )}
                                        </div>
                                        <p className="affiliate-commission">
                                            Commission:{" "}
                                            {`৳ ${
                                                product?.calculated_commission ||
                                                "0"
                                            }`}
                                            {""}
                                            <span className="ms-1">
                                                (
                                                {product?.level_commission ||
                                                    "0"}
                                                %)
                                            </span>
                                        </p>
                                    </div>
                                </Link>
                                <CopyToClipboard
                                    text={`${referralLink}/${product.affiliate_product_copy_link}`}
                                    onCopy={handleCopy}
                                >
                                    <button
                                        onClick={(e) => e.stopPropagation()}
                                        className="copy-link-btn"
                                    >
                                        Copy Link
                                    </button>
                                </CopyToClipboard>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className=" w-100">
                    <NoDataFound
                        title={`Affiliate retail products not found.`}
                    />
                </div>
            )}
        </div>
    );
};

export default AffiliateRetailsProductInfo;
