"use client";

import Image from "next/image";
import Link from "next/link";
// import StarRating from "./StarRating";
import AddToCartButton from "../AddToCartButton";
import { NagadhatPublicUrl } from "../../utils";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const CategoryProductArchiveItems = ({ productItem }) => {
    let imageUrl = null;
    const { product_name: title, id } = productItem;

    const slicedTitle =
        title?.length > 43 ? `${title.slice(0, 43)} ...` : title;
    if (productItem?.product_thumbnail) {
        imageUrl = `${NagadhatPublicUrl}/${productItem?.product_thumbnail}`;
    }

    const [outletId, setOutletId] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("outletId") || 3;
        }
        return 3;
    });

    const defaultVariant = productItem?.variations?.find(
        (variant) => variant.variations_default === 1
    );

    const selectedVariantProductInfo = {
        product_variation_id: defaultVariant?.id,
        discount_type: defaultVariant?.discount_type,
        discount_amount: defaultVariant?.discount_amount,
    };

    let productPrice = {
        prices: 0,
        discountPrice: 0,
    };
    let productStoke;

    if (productItem?.variations?.length > 0) {
        productPrice.prices =
            defaultVariant?.discount_amount > 0
                ? defaultVariant?.price?.discounted_price
                : defaultVariant?.price?.regular_price;

        productPrice.discountPrice =
            defaultVariant?.price?.regular_price -
            defaultVariant?.price?.discounted_price;
        productStoke =
            defaultVariant?.variation_max_quantity === null
                ? 0
                : defaultVariant?.variation_max_quantity;
    } else {
        productPrice.prices =
            productItem?.price?.discounted_price > 0
                ? productItem?.price?.discounted_price
                : productItem?.mrp_price;
        // (productPrice.discountPrice = productItem?.discount_price > 0 && productItem?.mrp_price);
        productPrice.discountPrice =
            productItem?.price?.regular_price -
            productItem?.price?.discounted_price;
        productStoke =
            productItem?.max_quantity === null ? 0 : productItem?.max_quantity;
    }

    const selectedVariants = [];
    if (defaultVariant?.variation_size !== null) {
        selectedVariants.push({
            variation_size: defaultVariant?.variation_size?.title,
        });
    }

    if (defaultVariant?.variation_color !== null) {
        selectedVariants.push({
            variation_color: defaultVariant?.variation_color?.title,
        });
    }

    if (defaultVariant?.variation_weight !== null) {
        selectedVariants.push({
            variation_weight: defaultVariant?.variation_weight?.title,
        });
    }

    return (
        <div className="flash-sale-content-item">
            <ToastContainer />
            <Link
                href={`/products/get-product-details?outlet_id=${outletId}&product_id=${id}`}
            >
                <div className="flash-sale-content-bg nh-hover-box-shadow">
                    <div className="product-category-image">
                        {imageUrl ? (
                            <div className="flash-sale-content-img image-hover-effect">
                                <Image
                                    fill={true}
                                    src={imageUrl ? imageUrl : null}
                                    className="img-fluid"
                                    alt={title}
                                />
                            </div>
                        ) : (
                            "Image Not Found"
                        )}
                    </div>
                    <div className="flash-sale-content-info text-hover-effect">
                        <h4>{slicedTitle}</h4>
                        <div className="category-product-price  ">
                            {productItem?.product_type === "variants" ? (
                                productItem.variations?.map((variant_item) =>
                                    variant_item?.variations_default === 1 ? (
                                        <div key={variant_item.id}>
                                            {variant_item?.price
                                                ?.discount_amount > 0 ? (
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <strong>
                                                        ট {""}
                                                        {
                                                            variant_item?.price
                                                                ?.discounted_price
                                                        }
                                                    </strong>
                                                    <strong>
                                                        <del>
                                                            ট {""}
                                                            {
                                                                variant_item
                                                                    ?.price
                                                                    ?.regular_price
                                                            }
                                                        </del>
                                                    </strong>
                                                </div>
                                            ) : (
                                                <strong>
                                                    ট {""}
                                                    {
                                                        variant_item?.price
                                                            ?.regular_price
                                                    }
                                                </strong>
                                            )}
                                        </div>
                                    ) : null
                                )
                            ) : productItem?.product_type === "single" &&
                              productItem?.price?.discounted_price > 0 ? (
                                <div className="d-flex align-items-center justify-content-between">
                                    <strong>
                                        ট {""}
                                        {productItem?.price?.discounted_price}
                                    </strong>
                                    <strong>
                                        <del>
                                            ট {""}
                                            {productItem?.price?.regular_price}
                                        </del>
                                    </strong>
                                </div>
                            ) : (
                                <strong>
                                    ট {""}
                                    {productItem?.price?.regular_price}
                                </strong>
                            )}

                            {/* <StarRating ratingCount={ratingCount} ratingImg={ratingImg} /> */}
                        </div>
                        <div className="add-to-cart-holder">
                            <AddToCartButton
                                fullWidth={`category-product-add-btn`}
                                productInfo={productItem}
                                quantity={1}
                                selectedVariantProductInfo={
                                    selectedVariantProductInfo
                                }
                                selectedVariants={selectedVariants}
                                productPrice={productPrice}
                                productStoke={productStoke}
                            />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CategoryProductArchiveItems;
