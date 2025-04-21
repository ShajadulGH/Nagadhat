"use client";
import { useState } from "react";
import {
    addToCartInLocalStorage,
    addToCartProductList,
    getTotalQuantity,
    setProductData,
} from "../utils";
import { useSession } from "next-auth/react";
import { addToCartProduct } from "../services/postAddToCartAfterLogin";
import { useDispatch, useSelector } from "react-redux";
import { setAddToCart } from "../store/cartSlice";
import { fetchCartProducts } from "../services/getShowAddToCartProduct";
import { useRouter } from "next/navigation";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
//  function to check if all three properties (variation_size, variation_color, variation_weight) are present and not null in the decorateVariation object. If they are, the function will only check the first two properties (variation_size and variation_color) against selectedVariantKey.
function findMissingProperties(decorateVariation, selectedVariantKey) {
    const requiredKeys = [
        "variation_size",
        "variation_color",
        "variation_weight",
    ];

    const mainKeys = ["variation_size", "variation_color"];

    const missingProperties = [];

    decorateVariation?.forEach((variant) => {
        const allRequiredKeysPresent = requiredKeys.every(
            (key) => variant[key] !== null && variant[key] !== undefined
        );

        if (allRequiredKeysPresent) {
            mainKeys.forEach((key) => {
                if (!selectedVariantKey.includes(key)) {
                    if (!missingProperties.includes(key)) {
                        missingProperties.push(key);
                    }
                }
            });
        } else {
            requiredKeys.forEach((key) => {
                if (
                    variant[key] !== null &&
                    variant[key] !== undefined &&
                    !selectedVariantKey.includes(key)
                ) {
                    if (!missingProperties.includes(key)) {
                        missingProperties.push(key);
                    }
                }
            });
        }
    });

    return missingProperties;
}
function AddToCartButton({
    title = "",
    path = "#",
    buyNowBtn,
    fullWidth,
    productInfo,
    selectedVariantKeys,
    decorateVariation,
    setProductVariationError,
    productPrice,
    quantity,
    selectedVariants,
    selectedVariantProductInfo,
    isDetailsPage = false,
    productStoke,
}) {
    const { status, data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [outletId, setOutletId] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("outletId") || 3;
        }
        return 3;
    });

    const [districtId, setDistrictId] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("districtId") || 47;
        }
        return 47;
    });
    const dispatch = useDispatch();
    const router = useRouter();

    // Function to handle the "Add To Cart" button click event
    const handleAddToCard = async (e, title) => {
        e.preventDefault();
        if (!title) {
            if (productInfo) {
                if (productInfo?.variations?.length > 0) {
                    const result = findMissingProperties(
                        decorateVariation,
                        selectedVariantKeys
                    );
                    if (result?.length == 2) {
                        setProductVariationError("Please Select variant");
                    } else if (result?.length == 1) {
                        setProductVariationError(
                            `${ result[0].split("_")[1].charAt(0).toUpperCase() + result[0].split("_")[1].slice(1)} not selected`
                        );
                    } else {
                        if (isDetailsPage) { setProductVariationError(" ")}
                        const addToCartInfo = {
                            cart_product_type: 1,
                            product_id: productInfo?.id,
                            product_name: productInfo?.product_name,
                            price: productPrice?.prices,
                            regular_price: productInfo?.mrp_price,
                            outlet_id: outletId,
                            product_thumbnail: productInfo?.product_thumbnail,
                            quantity: quantity,
                            slug: productInfo?.slug,
                            selectedVariants: selectedVariants,
                            location_id: districtId,
                            order_type: "Regular",
                            product_variation_id: selectedVariantProductInfo?.product_variation_id,
                            discount_type: selectedVariantProductInfo?.discount_type,
                            discountPrice: selectedVariantProductInfo?.discount_amount ?? 0,
                        };

                        try {
                            setLoading(true);
                            if (session) {
                                const productAdded = await addToCartProduct( addToCartInfo, session.accessToken );
                                const updatedCartProducts = await fetchCartProducts( session?.accessToken, outletId, districtId );
                                if (productAdded.code == 200 ) {
                                    const quantityTotal = getTotalQuantity( updatedCartProducts?.data );
                                    dispatch( setAddToCart({ hasSession: true, length: quantityTotal,}));
                                    toast.success("Cart Added");
                                } else {
                                    toast.error(productAdded.message);
                                }
                            } else {
                                addToCartInfo.productStoke = productStoke;
                                addToCartInLocalStorage(addToCartInfo);
                                const addToCartProduct = addToCartProductList();
                                toast.success("Add To Cart Success");
                                const quantityTotal = getTotalQuantity(addToCartProduct);

                                dispatch( setAddToCart({ hasSession: false, length: quantityTotal}));
                            }
                        } catch (error) {
                            toast.error("An error occurred");
                        } finally {
                            setLoading(false);
                        }
                    }
                } else {
                    const addToCartInfo = {
                        cart_product_type: 1,
                        product_id: productInfo?.id,
                        product_name: productInfo?.product_name,
                        price: productPrice?.prices,
                        regular_price: productInfo?.mrp_price,
                        outlet_id: outletId,
                        product_thumbnail: productInfo?.product_thumbnail,
                        quantity: quantity,
                        slug: productInfo?.slug,
                        location_id: districtId,
                        order_type: "Regular",
                        product_variation_id: null,
                        discount_type: productInfo?.discount_type,
                        discountPrice: productInfo?.discount_amount ?? 0,
                    };

                    try {
                        setLoading(true);
                        if (session) {
                            const productAdded = await addToCartProduct( addToCartInfo, session.accessToken );
                            const updatedCartProducts = await fetchCartProducts( session?.accessToken, outletId, districtId );

                            if (productAdded.code == 200) {
                                const quantityTotal = getTotalQuantity(updatedCartProducts?.data);

                                dispatch(setAddToCart({ hasSession: true, length: quantityTotal, }));
                                toast.success("Cart Added");
                            } else {
                                toast.error(productAdded.message);
                            }
                        } else {
                            addToCartInfo.productStoke = productStoke;
                            addToCartInLocalStorage(addToCartInfo);
                            const addToCartProduct = addToCartProductList();
                            toast.success("Add To Cart Success");
                            const quantityTotal = getTotalQuantity(addToCartProduct);
                            dispatch( setAddToCart({ hasSession: false, length: quantityTotal, }));
                        }
                    } catch (error) {
                        toast.error("An error occurred");
                    } finally {
                        setLoading(false);
                    }
                }
            }
        }
    };

    // Function to handle the "Buy Now" button click event
    const handleBuyNow = async (e, title) => {
        e.preventDefault();

        if (title) {
            if (productInfo) {
                if (productInfo?.variations?.length > 0) {
                    const result = findMissingProperties(
                        decorateVariation,
                        selectedVariantKeys
                    );

                    if (result?.length == 2) {
                        setProductVariationError("Please Select variant");
                    } else if (result?.length == 1) {
                        setProductVariationError(
                            `${result[0].split("_")[1].charAt(0).toUpperCase() + result[0].split("_")[1].slice(1) } not selected`
                        );
                    } else {
                        setProductVariationError(" ");
                        const addToCartInfo = {
                            cart_product_type: 1,
                            product_id: productInfo?.id,
                            product_name: productInfo?.product_name,
                            price: productPrice?.prices,
                            regular_price: productInfo?.mrp_price,
                            outlet_id: outletId,
                            product_thumbnail: productInfo?.product_thumbnail,
                            quantity: quantity,
                            slug: productInfo.slug,
                            selectedVariants: selectedVariants,
                            location_id: districtId,
                            order_type: "Regular",
                            product_variation_id: selectedVariantProductInfo?.product_variation_id,
                            discount_type: selectedVariantProductInfo?.discount_type,
                            discountPrice: selectedVariantProductInfo?.discount_amount ?? 0,
                        };

                        setProductData(addToCartInfo);
                        router.push("/shipping-page/buy-now");
                    }
                } else {
                    const addToCartInfo = {
                        cart_product_type: 1,
                        product_id: productInfo?.id,
                        product_name: productInfo?.product_name,
                        price: productPrice?.prices,
                        regular_price: productInfo?.mrp_price,
                        outlet_id: outletId,
                        slug: productInfo.slug,
                        product_thumbnail: productInfo?.product_thumbnail,
                        quantity: quantity,
                        location_id: districtId,
                        order_type: "Regular",
                        product_variation_id: null,
                        discount_type: productInfo?.discount_type,
                        discountPrice: productInfo?.discount_amount ?? 0,
                    };

                    setProductData(addToCartInfo);
                    router.push("/shipping-page/buy-now");
                }
            }
        }
    };

    return (
        <div className="add-to-cart-btn">
            <button
                className={`add-to-cart-link border-0 ${buyNowBtn} ${fullWidth}`}
                onClick={(e) => productStoke > 0 && (title == "BUY NOW" ? handleBuyNow(e, title) : !loading && handleAddToCard(e))}
                style={{
                    pointerEvents: productStoke > 0 ? "auto" : "none",
                    opacity: productStoke > 0 ? 1 : 0.5,
                }}
            >
                {!title ? (
                    productStoke > 0 ? (
                        loading ? (
                            <div style={{ height: "21px", width: "96px", textAlign: "center", }} >
                                <RotatingLines
                                    visible={true}
                                    height="18"
                                    width="20"
                                    color="#ffffff"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    ariaLabel="rotating-lines-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="w-25"
                                />
                            </div>
                        ) : (
                            "ADD TO CART"
                        )
                    ) : (
                        "Stock Out"
                    )
                ) : (
                    title
                )}
            </button>
        </div>
    );
}

export default AddToCartButton;
