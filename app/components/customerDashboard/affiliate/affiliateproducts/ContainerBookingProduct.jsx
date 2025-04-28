"use client";

import { NagadhatPublicUrl } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { addToCartProduct } from "@/app/services/postAddToCartAfterLogin";
import { useSession } from "next-auth/react";
import { FaCartPlus, FaE, FaEye } from "react-icons/fa6";

const ContainerBookingProduct = ({
    containerProduct,
    selectedProducts,
    setSelectedProducts,
    containerId,
    progressBarValue,
    getTotalQuantity,
    availableQuantity,
    setLoading,
    cartProductsRerender,
    setCartProductsRender,
}) => {
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab") || "retails-tab";
    const [outletId, setOutletId] = useState(null);
    const { data: session, status } = useSession();

    useEffect(() => {
        const initialOutletId = localStorage.getItem("outletId");
        setOutletId(initialOutletId ? parseInt(initialOutletId) : 3);
    }, []);

    // Toggle product selection
    const handleSelectProduct = async (product) => {
        let newQuantity = product.updateQuantity || product.min_quantity || 1;

        const addToCartInfo = {
            container_id: containerId,
            product_id: product?.id,
            product_name: product?.product_name,
            regular_price: product?.pivot.mrp_price,
            discount_type: "flat",
            discountPrice: product?.pivot.profit,
            price: product?.pivot.trade_price,
            outlet_id: outletId,
            product_thumbnail: product.product_thumbnail || "",
            quantity: newQuantity || 1,
            selectedVariants: [],
            location_id: 47,
            order_type: "Container",
            cart_product_type: product.sell_product_type || 3,
            product_variation_id: null
        }

        try {
            setLoading(true)
            const productAdded = await addToCartProduct(addToCartInfo, session?.accessToken);
            
            if (productAdded.code == 200) {
                toast.success("Cart Added ");
                setCartProductsRender(!cartProductsRerender);
            } else {
                toast.error(productAdded.message,);
            }
        } catch (error) {
            console.error("An error occurred while placing the order:", error);
            toast.error("Something went wrong, please try again later.");
        } finally {
            setLoading(false);
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
                <div className="row row-cols-2 row-cols-md-3 p-4 row-cols-xxl-4 g-3">
                    {containerProduct.map((product) => (
                        <div
                            key={product?.id}
                            className="flash-sale-content-item col"
                            // onClick={() => handleSelectProduct(product)}
                        >
                            <div
                                className={`flash-sale-content-bg nh-hover-box-shadow ${selectedProducts.some((p) => p.product_id === product.id) ? "selected-container-item" : ""}`}
                            >
                                <div
                                    className="image-hover-effect mx-auto mb-2"
                                    style={{ position: "relative", aspectRatio: "1/1" }}
                                >
                                    <Image
                                        height={200}
                                        width={200}
                                        src={product?.product_thumbnail ? `${NagadhatPublicUrl}/${product?.product_thumbnail}` : `/images/placeholder--image.jpg`}
                                        className="img-fluid mx-auto rounded-top-3 overflow-hidden"
                                        alt={product?.product_name}
                                        style={{ objectFit: "cover", aspectRatio: "1/1" }}
                                    />
                                </div>
                                <div className="flash-sale-content-info text-hover-effect">
                                    <h4>{product.product_name}</h4>
                                    <div className="d-flex pb-3 justify-content-between align-items-center">
                                        <span className="fs-6 fw-bold" style={{ color: "#1a9d78" }} >
                                            ট {product?.pivot?.trade_price}
                                        </span>
                                        <del className="fs-6 fw-bold" style={{ color: "#6c757d" }} >
                                            ট {product?.pivot?.mrp_price}
                                        </del>
                                    </div>
                                    <div className="d-flex align-items-center gap-2 w-100 justify-content-between">
                                    <div className="add-to-cart-btn">
                                        <Link
                                            href={`/container-product-details/${product?.id}/${containerId}/${tab}`}
                                            className="add-to-cart-link rounded px-4"
                                            onClick={handleLinkClick} // Stop event propagation
                                        >
                                            <FaEye className="me-1" />
                                        </Link>
                                    </div>
                                    <div className="add-to-cart-btn">
                                        <button
                                            type="button"
                                            // className={`add-to-cart-link ${selectedProducts.some((p) => p.product_id === product.id) ? "selected-container-item" : ""}`}
                                            className="add-to-cart-link rounded border-0 px-4"
                                            onClick={() => handleSelectProduct(product)}
                                        >
                                            <FaCartPlus className="me-1" />
                                            {/* {selectedProducts.some((p) => p.product_id === product.id) ? "Added" : "Add to Cart"} */}
                                        </button>
                                    </div>
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
