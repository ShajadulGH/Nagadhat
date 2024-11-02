"use client";

import { NagadhatPublicUrl } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const ContainerBookingProduct = ({
    containerProduct,
    selectedProducts,
    setSelectedProducts,
    containerId,
    progressBarValue,
    getTotalQuantity,
    availableQuantity,
}) => {
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab") || "retails-tab";

    // Toggle product selection
    const handleSelectProduct = (product) => {
        const totalQuantity = getTotalQuantity();
        if (selectedProducts.some((p) => p.id === product.id)) {
            setSelectedProducts(
                selectedProducts.filter((p) => p.id !== product.id)
            );
        } else {
            if (totalQuantity + 1 > availableQuantity) {
                toast.error("Quantity cannot exceed available quantity.");
                return; // Don't proceed with adding the product
            }
            setSelectedProducts([
                ...selectedProducts,
                { ...product, quantity: 1 },
            ]);
        }
    };

    // Handle Link click event
    const handleLinkClick = (event) => {
        event.stopPropagation();
    };

    return (
        <>
            <div className="">
                <div className="px-4 pt-4">
                    <div className="progress">
                        <div
                            className="progress-bar bg-praymary-color"
                            role="progressbar"
                            aria-valuenow={progressBarValue}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{
                                width: `${progressBarValue}%`,
                                fontSize: "12px",
                            }}
                        >
                            <span className="sr-only">
                                {progressBarValue} {""} % Complete
                            </span>
                        </div>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 p-4 row-cols-xxl-4 g-3">
                    {containerProduct.map((product) => (
                        <div
                            key={product?.id}
                            className="flash-sale-content-item col"
                            onClick={() => handleSelectProduct(product)}
                        >
                            <div
                                className={`flash-sale-content-bg nh-hover-box-shadow ${
                                    selectedProducts.some(
                                        (p) => p.id === product.id
                                    )
                                        ? "selected-container-item"
                                        : ""
                                }`}
                            >
                                <div
                                    className="image-hover-effect mx-auto mb-2"
                                    style={{
                                        width: "100%",
                                        height: "160px",
                                        position: "relative",
                                    }}
                                >
                                    <Image
                                        fill
                                        src={
                                            product?.product_thumbnail
                                                ? `${NagadhatPublicUrl}/${product?.product_thumbnail}`
                                                : `/images/placeholder--image.jpg`
                                        }
                                        className="img-fluid mx-auto"
                                        alt={product?.product_name}
                                        style={{
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                                <div className="flash-sale-content-info text-hover-effect">
                                    <h4>{product.product_name}</h4>
                                    <div className="add-to-cart-btn">
                                        <Link
                                            href={`/container-product-details/${product?.id}/${containerId}/${tab}`}
                                            className="add-to-cart-link "
                                            target="_blank"
                                            onClick={handleLinkClick} // Stop event propagation
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ContainerBookingProduct;
