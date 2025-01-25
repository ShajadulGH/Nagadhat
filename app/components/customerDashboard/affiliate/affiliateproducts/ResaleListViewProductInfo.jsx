"use client";
import { NagadhatPublicUrl, truncateTitle } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ResaleBuyNowBtn from "./ResaleBuyNowBtn";

const ResaleListViewProductInfo = ({ resaleProduct }) => {
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab") || "retails-tab";
    return (
        <>
            <div className="table-responsive-xl">
                <div
                    className="d-flex flex-column gap-3 resell-list-view-info-mobile-section"
                    style={{ minWidth: "640px" }}
                >
                    {resaleProduct?.map((product) => (
                        <Link
                            key={product.id}
                            href={`/resale-product-details/${product.id}/${tab}`}
                            className="flash-sale-content-item flash-sale-content-bg affiliate-product-list-item"
                        >
                            <div className="flash-sale-content-info text-hover-effect d-flex gap-3 justify-content-between align-items-center">
                                <div
                                    className="d-flex gap-3  resell-list-view-info-mobile-area"
                                    style={{
                                        minWidth: "200px",
                                        maxWidth: "360px",
                                        flex: "1",
                                    }}
                                >
                                    <div
                                        className="mb-0 image-div"
                                        style={{
                                            height: "100px",
                                            width: "80px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Image
                                            height={150}
                                            width={120}
                                            src={`${NagadhatPublicUrl}/${product.product_thumbnail}`}
                                            className="img-fluid"
                                            alt={product.product_name}
                                        />
                                    </div>
                                    <div className="d-flex flex-column resell-list-view-info-mobile-holder">
                                        <h4
                                            title={product.product_name}
                                            style={{
                                                minWidth: "120px",
                                                maxWidth: "280px",
                                                flex: "1",
                                                marginBottom: "0",
                                            }}
                                        >
                                            {truncateTitle(
                                                product.product_name,
                                                40
                                            )}
                                        </h4>
                                        <div className="resell-list-view-info-mobile">
                                            <div className="category-product-price ">
                                                <p className="fpnh-resale-pricess">
                                                    MRP :{" "}
                                                    <del className="fw-bold">
                                                        ৳{" "}
                                                        {product.resell_mrp_price *
                                                            (product.min_quantity ||
                                                                1)}
                                                    </del>
                                                </p>
                                                <p className="fpnh-resale-pricess">
                                                    TP :{" "}
                                                    <span className="fw-bold">
                                                        ৳{" "}
                                                        {product.resell_purchases_price *
                                                            (product.min_quantity ||
                                                                1)}
                                                    </span>
                                                </p>
                                                <p className="fpnh-resale-pricess">
                                                    Min Qty :{" "}
                                                    <span className="fw-bold">
                                                        {product.min_quantity ||
                                                            "N/A"}
                                                    </span>
                                                </p>
                                                <p className="fpnh-resale-pricess">
                                                    Duration:{" "}
                                                    <span className="fw-bold">
                                                        {`${
                                                            product.is_instalment
                                                                ? "In"
                                                                : "After"
                                                        } ${
                                                            product.fast_moving_duration
                                                        } Months`}
                                                    </span>
                                                </p>
                                                <div className="add-to-cart-btn resell-order-now-mobile">
                                                    <ResaleBuyNowBtn
                                                        product={product}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="category-product-price resell-list-view-info-desktop">
                                    <p className="fpnh-resale-pricess">
                                        MRP :{" "}
                                        <del className="fw-bold">
                                            ৳{" "}
                                            {product.resell_mrp_price *
                                                (product.min_quantity || 1)}
                                        </del>
                                    </p>
                                    <p className="fpnh-resale-pricess">
                                        TP :{" "}
                                        <span className="fw-bold">
                                            ৳{" "}
                                            {product.resell_purchases_price *
                                                (product.min_quantity || 1)}
                                        </span>
                                    </p>
                                    <p className="fpnh-resale-pricess">
                                        Min Qty :{" "}
                                        <span className="fw-bold">
                                            {product.min_quantity || "N/A"}
                                        </span>
                                    </p>
                                    <p className="fpnh-resale-pricess">
                                        Duration:{" "}
                                        <span className="fw-bold">
                                            {`${
                                                product.is_instalment
                                                    ? "In"
                                                    : "After"
                                            } ${
                                                product.fast_moving_duration
                                            } Months`}
                                        </span>
                                    </p>
                                </div>
                                <div className="add-to-cart-holder resell-list-view-info-desktop">
                                    <div className="add-to-cart-btn">
                                        <ResaleBuyNowBtn product={product} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ResaleListViewProductInfo;
