"use client";
import NoDataFound from "@/app/components/NoDataFound";
import { NagadhatPublicUrl, truncateTitle } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CopyToClipboard from "react-copy-to-clipboard";

const RetailListViewProductInfo = ({
    retailProduct,
    outletId,
    handleCopy,
    referralLink,
    copied,
}) => {
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab") || "retails-tab";
    return (
        <div className="table-responsive-xl">
            <div
                className="d-flex flex-column gap-3"
                style={{ minWidth: "600px" }}
            >
                {retailProduct?.length > 0 ? (
                    retailProduct?.map((product) => {
                        const imageUrl = `${NagadhatPublicUrl}${product?.product_thumbnail}`;
                        return (
                            <div
                                key={product.id}
                                className="flash-sale-content-item flash-sale-content-bg affiliate-product-list-item"
                            >
                                <div className="flash-sale-content-info text-hover-effect d-flex gap-3 justify-content-between align-items-center">
                                    <Link
                                        href={`/products/${product?.slug}?outlet_id=${outletId}&tab=${tab}`}
                                        className="d-flex gap-3 flex-1 flex-shrink-0 flex-grow-1"
                                    >
                                        <div
                                            className="mb-0 flex-shrink-0"
                                            style={{
                                                height: "80px",
                                                width: "80px",
                                                position: "relative",
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
                                        <h4
                                            title={product.product_name}
                                            style={{
                                                maxWidth: "400px",
                                                minWidth: "160px",
                                            }}
                                        >
                                            {truncateTitle(
                                                product.product_name,
                                                50
                                            )}
                                        </h4>
                                    </Link>
                                    <Link
                                        href={`/products/${product?.slug}?outlet_id=${outletId}&tab=${tab}`}
                                    >
                                        <div className="flex-shrink-0 ">
                                            <div className="d-flex flex-column justify-content-center">
                                                <div className="d-flex align-items-center gap-2">
                                                    {product?.after_discount_mrp_price ===
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
                                                                >{`৳ ${product?.mrp_price}`}</del>
                                                            </strong>
                                                        </>
                                                    )}
                                                </div>
                                                <p className="affiliate-commission">
                                                    Commission:{" "}
                                                    {`৳ ${product?.calculated_commission ||"0"}`}{" "}
                                                    <span className="ms-1">
                                                        ({product?.level_commission}%)
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="flex-1 d-inline-flex justify-content-end flex-shrink-0 ">
                                        <div>
                                            <CopyToClipboard
                                                text={`${referralLink}/${product.affiliate_product_copy_link}`}
                                                onCopy={handleCopy}
                                            >
                                                <button className="copy-link-btn mt-0 px-3">
                                                    Copy Link
                                                </button>
                                            </CopyToClipboard>
                                        </div>
                                    </div>
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
        </div>
    );
};

export default RetailListViewProductInfo;
