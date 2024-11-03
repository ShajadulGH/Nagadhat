"use client";

import Image from "next/image";
import AddToCartButton from "../AddToCartButton";
import { useEffect, useReducer, useState } from "react";
import { existingIndex, getUserAgent } from "@/app/utils";
const initialState = {
    count: 1,
};
const reducer = (state, action) => {
    switch (action.type) {
        case "INCREMENT":
            return { count: state.count + 1 };
        case "DECREMENT":
            if (state.count !== 1) {
                return { count: state.count - 1 };
            }
        default:
            return state;
    }
};
const ProductInformetion = ({ productInfo, setProductGallery }) => {
    const [productAllVariants, setProductAllVariants] = useState([]);
    const [selectedVariants, setSelectedVariants] = useState([]);
    const [unselected, setUnselected] = useState([]);
    const [decorateVariation, setDecorateVariation] = useState([]);
    const [selectedVariantProductInfo, setSelectedVariantProductInfo] =
        useState({});
    const [state, dispatch] = useReducer(reducer, initialState);
    const [productPrice, setProductPrice] = useState({
        prices: "",
        discountPrice: "",
    });
    const [productVariationsError, setProductVariationError] = useState("");
    const [productStoke, setProductStoke] = useState(0);

    useEffect(() => {
        updateProductInitialVariations();

        defaultVariation();
    }, [productInfo]);

    //// This function finds a variant and updates the productAllVariants with the selected and selectable variants.
    const updateProductInitialVariations = () => {
        const variants = productInfo?.variations;
        const updatedProductAllVariants = [];
        const defaultVariationSelected = [];
        variants?.forEach((variant) => {
            // Create an array of attributes to simplify the loop

            const attributes = [
                {
                    name: "variation_size",
                    value: variant.variation_size?.title,
                },
                {
                    name: "variation_color",
                    value: variant.variation_color?.title,
                },
                {
                    name: "variation_weight",
                    value: variant.variation_weight?.title,
                },
            ];

            attributes.forEach((attribute) => {
                if (!attribute.value) return; // Skip if the attribute value is null or undefined

                const existingAttributeIndex = existingIndex(
                    updatedProductAllVariants,
                    attribute.name
                );

                // console.log(updatedProductAllVariants);

                if (existingAttributeIndex === -1) {
                    updatedProductAllVariants.push({
                        name: attribute.name,
                        variants: [
                            {
                                value: attribute.value,
                                selectAble: true,
                                selected: false,
                            },
                        ],
                    });
                } else {
                    const existingValueIndex = updatedProductAllVariants[
                        existingAttributeIndex
                    ].variants?.findIndex(
                        (item) => item.value === attribute.value
                    );

                    if (existingValueIndex === -1) {
                        updatedProductAllVariants[
                            existingAttributeIndex
                        ]?.variants?.push({
                            value: attribute.value,
                            selectAble: true,
                            selected: false,
                        });
                    }
                }
            });
        });
        setProductAllVariants(updatedProductAllVariants);
    };

    //this function load a default variant when the loaded(productInfo);
    function defaultVariation() {
        if (productInfo?.variations?.length > 0) {
            const defaultProduct = productInfo?.variations?.find(
                (product) => product?.variations_default === 1
            );
            setProductPrice({
                ...productPrice,
                prices:
                    defaultProduct?.discount_amount > 0
                        ? defaultProduct?.discount_type === "percentage"
                            ? defaultProduct?.mrp_price - (defaultProduct?.mrp_price * (defaultProduct?.discount_amount / 100))
                            : defaultProduct?.mrp_price - defaultProduct?.discount_amount
                        : defaultProduct?.mrp_price,
                discountPrice:
                    defaultProduct?.discount_type === "percentage"
                        ? defaultProduct?.mrp_price * (defaultProduct?.discount_amount / 100)
                        : defaultProduct?.discount_amount,
            });
            setProductGallery(defaultProduct?.gallery);
            setProductStoke(
                defaultProduct?.variation_max_quantity === null
                    ? 0
                    : defaultProduct?.variation_max_quantity
            );
        } else {
            // console.log("productInfo?.gallery");
            setProductPrice({
                ...productPrice,
                prices:
                    productInfo?.price?.original?.results?.discounted_price > 0
                        ? productInfo?.price?.original?.results
                            ?.discounted_price
                        : productInfo?.price?.original?.results?.regular_price,
                discountPrice: productInfo?.price?.original?.results?.discount_amount,
            });
            setProductStoke(
                productInfo?.max_quantity === null
                    ? 0
                    : productInfo?.max_quantity
            );

            setProductGallery(productInfo?.gallery);
        }
    }

    // this handler get the value when user select the variations and change the selected,selectable. set the value error.
    const handleVariations = (variantValue, name) => {
        setProductAllVariants((prevProductAllVariants) => {
            const updatedProductAllVariants = prevProductAllVariants.map(
                (item) => {
                    if (item.name === name && Array.isArray(item.variants)) {
                        return {
                            ...item,
                            error: false,
                            variants: item?.variants?.map((variantItem) => ({
                                ...variantItem,
                                selected:
                                    variantItem.value === variantValue
                                        ? !variantItem.selected
                                        : false,
                            })),
                        };
                    }
                    return item;
                }
            );
            return updatedProductAllVariants;
        });

        if (name === "variation_color") {
            const multiGallery = [];
            productInfo?.variations?.map((variation) => {
                if (variation?.variation_color?.title == variantValue) {
                    multiGallery.push(variation.gallery);
                }
            });

            setProductGallery(multiGallery[0]);
        }
    };

    // this function return the sleeted variant
    const getAvailableVariants = () => {
        return productAllVariants?.reduce((acc, curr) => {
            curr?.variants?.forEach((variant) => {
                if (variant.selected) {
                    acc.push({ [curr.name]: variant.value });
                }
            });
            return acc;
        }, []);
    };

    useEffect(() => {
        setSelectedVariants(getAvailableVariants());
        // console.log(selectedVariants);
    }, [productAllVariants, productInfo]);
    // console.log(selectedVariants);
    // return not selected variant name
    const findNotSelectedVariants = () => {
        const selectedVariantKeys = selectedVariants.flatMap(
            (selectedVariant) => Object.keys(selectedVariant)
        );
        return productAllVariants
            .filter((item) => !selectedVariantKeys.includes(item.name))
            .map((item) => item.name);
    };

    useEffect(() => {
        const notSelectedVariants = findNotSelectedVariants();
        setUnselected(notSelectedVariants);
    }, [selectedVariants]);

    //this function return the unselected variant
    const notSelectedVariantFalse = () => {
        unselected.forEach((name) => {
            productAllVariants.forEach((item) => {
                if (item.name == name) {
                    item.variants.forEach((variant) => {
                        variant.selectAble = false;
                    });
                }
            });
        });
    };

    const updateVariantSelectAbility = (name, value, isSelectable) => {
        productAllVariants.forEach((item) => {
            if (item.name == name) {
                item.variants.forEach((variant) => {
                    if (variant.value == value) {
                        variant.selectAble = isSelectable;
                    }
                });
            }
        });
    };

    const updateVariantNameSelectAbility = (name, isSelectable) => {
        productAllVariants.forEach((item) => {
            if (item.name == name) {
                item.variants.forEach((variant) => {
                    variant.selectAble = isSelectable;
                });
            }
        });
    };

    const getColorBySize = (
        size,
        checkVariantName,
        outPutValue,
        productObject
    ) => {
        let matchVariant = new Set();
        let unmatchedValues = new Set();

        productObject.forEach((variant) => {
            if (variant[checkVariantName] === size) {
                matchVariant.add(variant[outPutValue]);
            } else if (
                !productObject.some(
                    (item) =>
                        item[outPutValue] === variant[outPutValue] &&
                        item[checkVariantName] === size
                )
            ) {
                unmatchedValues.add(variant[outPutValue]);
            }
        });

        return {
            matched: Array.from(matchVariant),
            unmatched: Array.from(unmatchedValues),
        };
    };

    useEffect(() => {
        const decorateProductVariation = productInfo?.variations?.map(
            (item) => ({
                product_variation_id: item.id,
                variation_size: item.variation_size
                    ? item.variation_size.title
                    : null,
                variation_color: item.variation_color
                    ? item.variation_color.title
                    : null,
                variation_weight: item.variation_weight
                    ? item.variation_weight.title
                    : null,
                price:
                    item?.discount_amount > 0
                        ? item?.mrp_price - item?.discount_amount
                        : item?.mrp_price,
                discountPrice: item?.discount_amount > 0 ? item?.mrp_price : "",
                discount_type: item?.discount_type,
                discount_amount: item?.discount_amount,
                variation_max_quantity: item?.variation_max_quantity,
            })
        );
        setDecorateVariation(decorateProductVariation);
    }, [productInfo]);

    const availableVariantTrue = () => {
        const selectedVariantKeys = selectedVariants.flatMap(
            (selectedVariant) => Object.keys(selectedVariant)
        );
        const arr = [];
        selectedVariantKeys.map((selectedKey) => {
            selectedVariants?.map((selectedVariantObject) => {
                decorateVariation.map((availableVariant, index) => {
                    if (selectedVariants.length == 1) {
                        if (
                            availableVariant[selectedKey] ===
                            selectedVariantObject[selectedKey] &&
                            !arr.includes(availableVariant)
                        ) {
                            arr.push(decorateVariation[index]);
                        }
                    }
                    if (selectedVariants.length > 1) {
                        if (
                            availableVariant[selectedKey] ===
                            selectedVariantObject[selectedKey] &&
                            !arr.includes(availableVariant)
                        ) {
                            arr.push(decorateVariation[index]);
                        }
                    }
                });
            });
        });
        if (arr.length > 0) {
            if (selectedVariants.length == 1) {
                updateVariantNameSelectAbility(selectedVariantKeys[0], true);
                arr.map((enableVariant) => {
                    // console.log("enableVariant", enableVariant);
                    const enableVariantKey = Object.keys(enableVariant);
                    // console.log("enableVariantKey", enableVariantKey);
                    enableVariantKey.map((enableVariantName) => {
                        updateVariantSelectAbility(
                            enableVariantName,
                            enableVariant[enableVariantName],
                            true
                        );
                    });
                });
            }
            if (selectedVariants.length > 1) {
                selectedVariantKeys?.map((selectedKey) => {
                    selectedVariants?.map((selectedVariantObject, index) => {
                        if (index == 0) {
                            const checkVariantValue =
                                selectedVariantObject[selectedKey];
                            const checkVariantName = selectedKey;
                            const outPutValue = selectedVariantKeys[1];
                            const size = getColorBySize(
                                checkVariantValue,
                                checkVariantName,
                                outPutValue,
                                decorateVariation
                            );
                            // console.log("size", size);
                            if (size.matched.length) {
                                size?.matched.map((enableVariantItem) => {
                                    updateVariantSelectAbility(
                                        outPutValue,
                                        enableVariantItem,
                                        true
                                    );
                                });
                            }
                        }
                        if (index == 1) {
                            const checkVariantValue =
                                selectedVariantObject[selectedKey];
                            const checkVariantName = selectedKey;
                            const outPutValue = selectedVariantKeys[0];
                            const color = getColorBySize(
                                checkVariantValue,
                                checkVariantName,
                                outPutValue,
                                decorateVariation
                            );
                            color?.matched.map((enableVariantItem) => {
                                updateVariantSelectAbility(
                                    outPutValue,
                                    enableVariantItem,
                                    true
                                );
                            });
                            color?.unmatched.map((enableVariantItem) => {
                                updateVariantSelectAbility(
                                    outPutValue,
                                    enableVariantItem,
                                    false
                                );
                            });
                        }
                    });
                });
            }
        } else {
            productAllVariants.forEach((allVariantItem) => {
                allVariantItem.variants.forEach((variant) => {
                    variant.selectAble = true;
                });
            });
        }
    };

    useEffect(() => {
        notSelectedVariantFalse();
        availableVariantTrue();
    }, [selectedVariants]);

    const selectedVariantKeys = selectedVariants.flatMap((selectedVariant) =>
        Object.keys(selectedVariant)
    );

    useEffect(() => {
        // console.log(selectedVariantKeys);
        if (!selectedVariantKeys.includes("variation_color")) {
            defaultVariation();
        }
    }, [!selectedVariantKeys.includes("variation_color")]);

    // selectedVariant objects with those in the decorateVariation objects. The function will count the matches and return the object with the maximum matches.
    function findBestMatch(selectedVariant, decorateVariation) {
        let bestMatch = null;
        let maxMatches = 0;

        decorateVariation?.forEach((decorateItem) => {
            let matches = 0;

            selectedVariant?.forEach((selectedItem) => {
                for (let key in selectedItem) {
                    if (selectedItem[key] === decorateItem[key]) {
                        matches++;
                    }
                }
            });

            if (matches > maxMatches) {
                maxMatches = matches;
                bestMatch = decorateItem;
            }
        });

        return bestMatch;
    }

    useEffect(() => {
        const bestMatch = findBestMatch(selectedVariants, decorateVariation);
        setSelectedVariantProductInfo(bestMatch);
        if (selectedVariants.length > 0) {
            setProductPrice({
                ...productPrice,
                prices: bestMatch?.discount_amount > 0
                    ? (bestMatch?.discount_type === "percentage"
                        ? bestMatch?.discountPrice - (bestMatch?.discountPrice * (bestMatch?.discount_amount / 100))
                        : bestMatch?.discountPrice - bestMatch?.discount_amount)
                    : bestMatch?.discountPrice,
                discountPrice: bestMatch?.discount_type === "percentage"
                    ? bestMatch?.discountPrice * (bestMatch?.discount_amount / 100)
                    : bestMatch?.discount_amount,
            });
            

            setProductStoke(
                bestMatch?.variation_max_quantity === null
                    ? 0
                    : bestMatch?.variation_max_quantity
            );
        } else {
            defaultVariation();
        }
    }, [selectedVariants]);
    // console.log("variant item", productAllVariants);

    return (
        <div className="col-md-6">
            <div className="product-details-content">
                <h1>{productInfo?.product_name}</h1>
                <div className="product-details-rating-area d-flex align-items-center justify-content-between flex-wrap">
                    <div className="product-details-rating-item d-flex align-items-center">
                        <div className="rating-star d-flex align-items-center">
                            <div className="rating-star-image">
                                <Image
                                    className="img-fluid"
                                    src="/images/Star 5.svg"
                                    fill={true}
                                    alt="Star"
                                />
                            </div>
                            <div className="rating-star-image">
                                <Image
                                    className="img-fluid"
                                    src="/images/Star 5.svg"
                                    fill={true}
                                    alt="Star"
                                />
                            </div>
                            <div className="rating-star-image">
                                <Image
                                    className="img-fluid"
                                    src="/images/Star 5.svg"
                                    fill={true}
                                    alt="Star"
                                />
                            </div>
                            <div className="rating-star-image">
                                <Image
                                    className="img-fluid"
                                    src="/images/Star 5.svg"
                                    fill={true}
                                    alt="Star"
                                />
                            </div>
                            <div className="rating-star-image">
                                <Image
                                    className="img-fluid"
                                    src="/images/Star 5.svg"
                                    fill={true}
                                    alt="Star"
                                />
                            </div>
                        </div>
                        <div className="rating-star">
                            <p>10 Ratings</p>
                        </div>
                    </div>
                    <div className="product-details-rating-item d-flex align-items-center">
                        <div className="product-Sold-img">
                            <Image
                                className="img-fluid"
                                src="/images/sold.svg"
                                width={100}
                                height={100}
                                alt="sold"
                            />
                        </div>
                        <div className="product-Sold">
                            <p>415 Sold</p>
                        </div>
                    </div>
                    <div className="product-details-rating-item d-flex align-items-center">
                        <div className="product-Sold-img">
                            <Image
                                className="img-fluid"
                                src="/images/product-view.svg"
                                alt="Viewe image"
                                width={100}
                                height={100}
                            />
                        </div>
                        <div className="product-Sold">
                            <p>{productInfo?.number_of_viewed} Viewed</p>
                        </div>
                    </div>
                </div>
                <div className="product-details-price-area d-flex align-items-center">
                    <strong>
                        {" "}
                        <span>৳</span>{" "}
                        {productPrice?.prices && productPrice?.prices}
                    </strong>
                    <del>
                        {productPrice?.discountPrice &&
                            `৳ ${(parseInt(productPrice?.discountPrice) + parseInt(productPrice?.prices))}`}
                    </del>
                </div>
                <div className="product-short-description-area">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: productInfo?.short_description,
                        }}
                    />
                </div>

                <div className="product-info-rtk-content">
                    <form>
                        <div className="product-details-variant-area">
                            <div className="d-flex align-items-center">
                                {productAllVariants?.map((item, index) => (
                                    <div key={index}>
                                        {item?.name === "variation_color" && (
                                            <>
                                                <div className="product-details-variant-holder d-flex align-items-center mb-4">
                                                    <p className="variantName">
                                                        Color
                                                    </p>
                                                    {item?.variants?.map(
                                                        (variant, inx) =>
                                                            variant.selectAble ? (
                                                                <div
                                                                    key={inx}
                                                                    className="product-details-inner-color product-details-variant-item"
                                                                    onClick={() =>
                                                                        handleVariations(
                                                                            variant.value,
                                                                            item.name
                                                                        )
                                                                    }
                                                                    style={{
                                                                        border: variant.selected
                                                                            ? "3px solid #44bc9d "
                                                                            : "",
                                                                        background:
                                                                            variant?.value.toLowerCase(),
                                                                    }}
                                                                ></div>
                                                            ) : (
                                                                <div
                                                                    className="product-details-inner-color product-details-variant-item"
                                                                    style={{
                                                                        border: "2px solid #7B7B7B",
                                                                        background:
                                                                            variant?.value.toLowerCase(),
                                                                        cursor: "not-allowed",
                                                                        opacity: 0.3,
                                                                    }}
                                                                ></div>
                                                            )
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="product-details-variant-area">
                            <div className="product-details-variant d-flex align-items-center">
                                {productAllVariants?.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            {item?.name ===
                                                "variation_size" && (
                                                    <>
                                                        <div className="product-details-variant-holder d-flex align-items-center mb-4">
                                                            <p>Size:</p>
                                                            {item?.variants?.map(
                                                                (variant, inx) =>
                                                                    variant.selectAble ? (
                                                                        <div
                                                                            key={
                                                                                inx
                                                                            }
                                                                            className={`product-details-variant-item ${variant.selected
                                                                                ? "variantAttributeActive"
                                                                                : "variantAttributeUnitive"
                                                                                }`}
                                                                            onClick={() =>
                                                                                handleVariations(
                                                                                    variant.value,
                                                                                    item.name
                                                                                )
                                                                            }
                                                                        >
                                                                            <label>
                                                                                {
                                                                                    variant?.value
                                                                                }
                                                                            </label>
                                                                        </div>
                                                                    ) : (
                                                                        <div
                                                                            key={
                                                                                inx
                                                                            }
                                                                            className={`product-details-variant-item`}
                                                                            style={{
                                                                                border: "2px solid #7B7B7B",
                                                                                cursor: "not-allowed",
                                                                                opacity: 0.3,
                                                                            }}
                                                                        >
                                                                            <label>
                                                                                {
                                                                                    variant?.value
                                                                                }
                                                                            </label>
                                                                        </div>
                                                                    )
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {productAllVariants.length < 3 && (
                            <div className="product-details-variant-area ">
                                <div className="product-details-variant d-flex align-items-center justify-content-start">
                                    {productAllVariants?.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                {item?.name ===
                                                    "variation_weight" && (
                                                        <>
                                                            <div className="product-details-variant-holder d-flex align-items-center mb-4">
                                                                <p>Weight:</p>
                                                                {item?.variants?.map(
                                                                    (
                                                                        variant,
                                                                        inx
                                                                    ) =>
                                                                        variant.selectAble ? (
                                                                            <div
                                                                                key={
                                                                                    inx
                                                                                }
                                                                                className={`product-details-variant-item ${variant.selected
                                                                                    ? "variantAttributeActive"
                                                                                    : "variantAttributeUnitive"
                                                                                    }`}
                                                                                onClick={() =>
                                                                                    handleVariations(
                                                                                        variant.value,
                                                                                        item.name
                                                                                    )
                                                                                }
                                                                            >
                                                                                <label>
                                                                                    {
                                                                                        variant?.value
                                                                                    }
                                                                                </label>
                                                                            </div>
                                                                        ) : (
                                                                            <div
                                                                                key={
                                                                                    inx
                                                                                }
                                                                                className={`product-details-variant-item`}
                                                                                style={{
                                                                                    border: "2px solid #7B7B7B",
                                                                                    cursor: "not-allowed",
                                                                                    opacity: 0.3,
                                                                                }}
                                                                            >
                                                                                <label>
                                                                                    {
                                                                                        variant?.value
                                                                                    }
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                )}
                                                            </div>
                                                        </>
                                                    )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <div>
                            <p style={{ color: "red", marginBottom: "10px" }}>
                                {productVariationsError
                                    ? productVariationsError
                                    : ""}
                            </p>
                        </div>

                        <div className="product-details-quantity-area d-flex align-items-center justify-content-start">
                            <div className="product-details-quantity d-flex align-items-center">
                                <div className="product-details-inner-quantity d-flex align-items-center">
                                    <p>Quantity:</p>
                                </div>
                                <div className="product-details-inner-quantity product-details-inner-qty d-flex align-items-center">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            dispatch({ type: "DECREMENT" });
                                        }}
                                        disabled={state.count == 1}
                                    >
                                        -
                                    </button>
                                    <input
                                        readOnly
                                        type="text"
                                        value={state.count}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            dispatch({ type: "INCREMENT" });
                                        }}
                                        disabled={state.count >= productStoke}
                                    >
                                        +
                                    </button>
                                </div>
                                <div>
                                    {productStoke > 0
                                        ? productStoke - state.count
                                        : productStoke}{" "}
                                    pieces available
                                </div>
                            </div>
                        </div>

                        <div className="product-details-add-cart-area d-flex align-items-center">
                            <div className="product-details-add-cart">
                                <AddToCartButton
                                    title="BUY NOW"
                                    buyNowBtn="product-details-action-btn"
                                    productInfo={productInfo}
                                    selectedVariantKeys={selectedVariantKeys}
                                    setProductVariationError={
                                        setProductVariationError
                                    }
                                    productPrice={productPrice}
                                    decorateVariation={decorateVariation}
                                    selectedVariants={selectedVariants}
                                    quantity={state.count}
                                    selectedVariantProductInfo={
                                        selectedVariantProductInfo
                                    }
                                    productStoke={productStoke}
                                />
                            </div>
                            <div className="product-details-add-cart">
                                <AddToCartButton
                                    buyNowBtn="product-details-action-btn"
                                    productInfo={productInfo}
                                    selectedVariantKeys={selectedVariantKeys}
                                    setProductVariationError={
                                        setProductVariationError
                                    }
                                    productPrice={productPrice}
                                    decorateVariation={decorateVariation}
                                    selectedVariants={selectedVariants}
                                    quantity={state.count}
                                    selectedVariantProductInfo={
                                        selectedVariantProductInfo
                                    }
                                    isDetailsPage={true}
                                    productStoke={productStoke}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductInformetion;
