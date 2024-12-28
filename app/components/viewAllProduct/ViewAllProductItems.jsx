import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../AddToCartButton";
import Like from "../Like";
import { NagadhatPublicUrl, truncateTitle } from "@/app/utils";

const ViewAllProductitemss = ({ items }) => {
    const {
        product_name: title,
        mrp_price: price,
        slug,
        id,
        outlet_id,
    } = items;

    let imageUrl = `${NagadhatPublicUrl}/${items.product_thumbnail}`;

    const defaultVariant = items?.variations?.find(
        (variant) => variant.variations_default === 1
    );

    const selectedVariantProductInfo = {
        product_variation_id: defaultVariant?.id,
        discount_type: defaultVariant?.discount_type,
        discount_amount: defaultVariant?.discount_amount,
    };

    const productPrice = {
        prices: "",
        discountPrice: "",
    };
    let productStoke;

    if (items?.variations?.length > 0) {
        productPrice.prices =
            defaultVariant?.discount_amount > 0
                ? defaultVariant?.mrp_price - defaultVariant?.discount_amount
                : defaultVariant?.mrp_price;

        productPrice.discountPrice =
            defaultVariant?.discount_amount > 0
                ? defaultVariant?.mrp_price
                : "";
        productStoke =
            defaultVariant?.variation_max_quantity === null
                ? 0
                : defaultVariant?.variation_max_quantity;
    } else {
        (productPrice.prices =
            items?.price?.discounted_price !== 0
                ? items?.price?.discounted_price
                : items?.price?.regular_price),
            (productPrice.discountPrice =
                items?.price?.discounted_price > 0 &&
                items?.price?.regular_price);
        productStoke = items?.outlet_stock_quantity ?? 0;
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
        <div className="flash-sale-content-items">
            <div className="flash-sale-content-bg nh-hover-box-shadow ">
                <Link
                    href={`/products/${slug}?outlet_id=${outlet_id}`}
                    className="d-flex flex-column justify-content-between h-100"
                >
                    <div className="flash-sale-content-img image-hover-effect">
                        <Image
                            src={imageUrl ? imageUrl : null}
                            fill={true}
                            className="img-fluid"
                            alt={title ? title : "Product Title"}
                        />
                    </div>
                    <div className="flash-sale-content-info text-hover-effect">
                        <h4>{truncateTitle(title, 40)}</h4>
                        <div>
                            {items?.product_type === "variants" ? (
                                items.variations?.map((variant_item) =>
                                    variant_item?.variations_default === 1 ? (
                                        <div key={variant_item.id}>
                                            {parseInt(
                                                variant_item?.price
                                                    ?.discount_amount
                                            ) > 0 ? (
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <strong>
                                                        ট {""}
                                                        {
                                                            variant_item?.price
                                                                ?.discounted_price
                                                        }
                                                    </strong>
                                                    <strong className="text-secondary">
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
                            ) : items?.product_type === "single" &&
                              items?.price?.discount_status ? (
                                <div className="d-flex align-items-center justify-content-between">
                                    <strong>
                                        ট {""}
                                        {items?.price?.discounted_price}
                                    </strong>
                                    <strong className="text-secondary">
                                        ট {""}
                                        <del>{items?.price?.regular_price}</del>
                                    </strong>
                                </div>
                            ) : (
                                <strong>
                                    ট {""}
                                    {items?.price?.regular_price}
                                </strong>
                            )}
                        </div>
                        <div className="add-to-cart-holder d-flex align-itemss-center justify-content-between ">
                            <AddToCartButton
                                productInfo={items}
                                quantity={1}
                                selectedVariantProductInfo={
                                    selectedVariantProductInfo
                                }
                                selectedVariants={selectedVariants}
                                productPrice={productPrice}
                                productStoke={productStoke}
                            />
                            <div className="add-to-cart-icon">
                                {/* <Like /> */}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ViewAllProductitemss;
