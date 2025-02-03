"use client";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import {
    NagadhatPublicUrl,
    addToCartProductList,
    apiBaseUrl,
    deleteBuyNowProductData,
    getSelectedCardIds,
    getTotalQuantity,
    requestPage,
    setSelectedCardIds,
} from "../utils";
import { useSession } from "next-auth/react";
import { deleteCartProduct } from "../services/getDeleteCartProduct";
import { addToCartQuantityUpdate } from "../services/addToCartQuantityUpdate";
import { deleteProductFromTheApi } from "../services/deleteSelectedProduct";
import { useDispatch, useSelector } from "react-redux";
import { setAddToCart } from "../store/cartSlice";
import {
    FaHeart,
    FaMinus,
    FaPlus,
    FaRegHeart,
    FaTrash,
    FaTrashCan,
} from "react-icons/fa6";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { addToCartSelectedProduct } from "../services/postCartSelectedProducts";
import NoDataFound from "../components/NoDataFound";
import { placeOrder } from "../services/postPlaceOrder";
import LodingFixed from "../components/LodingFixed";
import { fetchCartProducts } from "../services/getShowAddToCartProduct";
import { toast } from "react-toastify";
const CartPage = () => {
    const [checkedProductCard, setCheckedProductCard] = useState([]);
    const [checkingProductFilter, setCheckingProductFilter] = useState([]);
    const [selected, setSelected] = useState([]);
    const { status, data: session } = useSession();
    const [isRemoveOpen, setIsRemoveOpen] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [subTotalPrice, setSubTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    //Update Add To Cart product after operation in localStore addToCart Item
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

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [selectedProductType, setSelectedProductType] = useState(null);

    useEffect(() => {
        // Check if any product has isChecked true and different cart_product_type
        const checkedProducts = checkedProductCard.filter(
            (product) => product.isChecked
        );

        if (checkedProducts.length > 0) {
            const firstProductType = checkedProducts[0].cart_product_type;
            setSelectedProductType(firstProductType);
            const hasDifferentType = checkedProducts.some(
                (product) => product.cart_product_type !== firstProductType
            );

            if (hasDifferentType) {
                toast.error("Different product types selected!");
                setIsButtonDisabled(true);
            } else {
                setIsButtonDisabled(false);
            }
        } else {
            setSelectedProductType(null);
            setIsButtonDisabled(false);
        }
    }, [checkedProductCard]);

    const updateLocalStorage = (items) => {
        localStorage.setItem("addToCart", JSON.stringify(items));
    };
    const [quanticUpdateLoader, setQuantityUpdateLoader] = useState(false);

    function updateProductWithChecked(cartInfoIds, updateProduct) {
        // Get an array of cart_ids from cartInfoIds
        const cartIds = cartInfoIds.map((item) => item.cart_id);

        // Iterate through updateProduct array
        updateProduct.forEach((product) => {
            // If the product's cart_id is in the cartIds array, add isChecked: true
            if (cartIds.includes(product.cart_id)) {
                product.isChecked = true;
            }
        });

        return updateProduct;
    }

    const handleDelete = async (cart_id) => {
        const wantToDelete = await Swal.fire({
            title: "Are you sure?",
            text: "Remove the product from cart !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Remove",
            backdrop: false,
        });

        try {
            if (wantToDelete.isConfirmed) {
                setLoading(true);

                if (session) {
                    const checkingProductFilter =
                        isAnyChecked(checkedProductCard);
                    const cartIds = checkingProductFilter.map((item) => ({
                        cart_id: item?.cart_id,
                    }));
                    setSelectedCardIds(cartIds);
                    const deleteProduct = await deleteCartProduct(
                        cart_id,
                        session?.accessToken
                    );
                    // console.log(deleteProduct);

                    const updatedCartProducts = await fetchCartProducts(
                        session?.accessToken,
                        outletId,
                        districtId
                    );

                    if (updatedCartProducts?.success) {
                        toast.success("Product delete successfully");
                        const selectedProductIds = getSelectedCardIds();
                        const updatedProducts = updateProductWithChecked(
                            selectedProductIds,
                            updatedCartProducts?.data
                        );
                        setCheckedProductCard(updatedProducts);
                        // setCheckedProductCard(updatedCartProducts?.data);

                        const quantityTotal = getTotalQuantity(
                            updatedCartProducts?.data
                        );
                        dispatch(
                            setAddToCart({
                                hasSession: true,
                                length: quantityTotal,
                            })
                        );
                    }
                } else {
                    const updatedItemsInCard = checkedProductCard.filter(
                        (item, i) => i !== cart_id
                    );
                    setCheckedProductCard(updatedItemsInCard);
                    updateLocalStorage(updatedItemsInCard);
                    const addToCartProductLength = addToCartProductList();
                    const quantityTotal = getTotalQuantity(
                        addToCartProductLength
                    );
                    dispatch(
                        setAddToCart({
                            hasSession: false,
                            length: quantityTotal,
                        })
                    );
                }
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const handleSelectedItemDelete = async () => {
        const wantToDelete = await Swal.fire({
            title: "Are you sure?",
            text: "Remove the product from cart !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Remove",
        });
        try {
            if (wantToDelete.isConfirmed) {
                setLoading(true);
                if (session) {
                    const checkingProductFilter =
                        isAnyChecked(checkedProductCard);
                    const cartIds = checkingProductFilter.map((item) => ({
                        cart_id: item?.cart_id,
                    }));
                    setSelectedCardIds(cartIds);

                    const updatedItemsInCard = checkedProductCard
                        .filter((item) => item.isChecked)
                        .map((item) => ({
                            cart_id: item?.cart_id,
                        }));

                    await deleteProductFromTheApi(
                        updatedItemsInCard,
                        session?.accessToken
                    );
                    const updatedCartProducts = await fetchCartProducts(
                        session?.accessToken,
                        outletId,
                        districtId
                    );

                    if (updatedCartProducts?.success) {
                        const selectedProductIds = getSelectedCardIds();
                        const updatedProducts = updateProductWithChecked(
                            selectedProductIds,
                            updatedCartProducts?.data
                        );
                        setCheckedProductCard(updatedProducts);
                        const quantityTotal = getTotalQuantity(
                            updatedCartProducts?.data
                        );

                        dispatch(
                            setAddToCart({
                                hasSession: true,
                                length: quantityTotal,
                            })
                        );
                    }
                } else {
                    const updatedItemsInCard = checkedProductCard.filter(
                        (item) => !item.isChecked
                    );
                    setCheckedProductCard(updatedItemsInCard);
                    updateLocalStorage(updatedItemsInCard);
                    const addToCartProductLength = addToCartProductList();
                    const quantityTotal = getTotalQuantity(
                        addToCartProductLength
                    );
                    dispatch(
                        setAddToCart({
                            hasSession: false,
                            length: quantityTotal,
                        })
                    );
                }
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }

    };

    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (name === "allSelect") {
            let tempCard = checkedProductCard.map((checkCard) => {
                return { ...checkCard, isChecked: checked };
            });

            setCheckedProductCard(tempCard);
            setSelected(tempCard);
        } else {
            let tempCard = checkedProductCard.map((checkCard, index) =>
                index.toString() === name
                    ? { ...checkCard, isChecked: checked }
                    : checkCard
            );
            setCheckedProductCard(tempCard);
            setSelected(tempCard);
        }
    };

    //Start selected checked product item
    const selectedCount = checkedProductCard.reduce(
        (total, card) => (card.isChecked ? total + card.quantity : total),
        0
    );
    //End selected checked product item

    const handleDecrement = async (indexId) => {
        try {
            setQuantityUpdateLoader(true);

            if (session) {
                const checkingProductFilter = isAnyChecked(checkedProductCard);
                const cartIds = checkingProductFilter.map((item) => ({
                    cart_id: item?.cart_id,
                }));
                setSelectedCardIds(cartIds);
                const quantityUpdateInfo = {
                    cart_id: indexId,
                    outlet_id: outletId,
                    quantity: "decrement",
                };
                const decrementApi = await addToCartQuantityUpdate(
                    quantityUpdateInfo,
                    session?.accessToken
                );
                if (decrementApi.code != 200) {
                    toast.error(decrementApi.message)
                }

                const updatedCartProducts = await fetchCartProducts(
                    session?.accessToken,
                    outletId,
                    districtId
                );
                if (updatedCartProducts?.success) {
                    const selectedProductIds = getSelectedCardIds();
                    const updatedProducts = updateProductWithChecked(
                        selectedProductIds,
                        updatedCartProducts?.data
                    );
                    setCheckedProductCard(updatedProducts);
                    const quantityTotal = getTotalQuantity(
                        updatedCartProducts?.data
                    );
                    dispatch(
                        setAddToCart({
                            hasSession: true,
                            length: quantityTotal,
                        })
                    );
                }
            } else {
                const updatedUsers = checkedProductCard.map(
                    (checkCard, index) => {
                        if (index === indexId) {
                            if (checkCard.quantity > 1) {
                                return {
                                    ...checkCard,
                                    quantity: checkCard.quantity - 1,
                                };
                            }
                        }
                        return checkCard;
                    }
                );
                const quantityTotal = getTotalQuantity(updatedUsers);
                dispatch(
                    setAddToCart({
                        hasSession: false,
                        length: quantityTotal,
                    })
                );
                setCheckedProductCard(updatedUsers);
                updateLocalStorage(updatedUsers);
            }
            setQuantityUpdateLoader(false);
        } catch (error) {
            console.log(error);
            setQuantityUpdateLoader(false);
        }
    };

    const handleIncrement = async (indexId, type) => {
        try {
            if (session) {
                const checkingProductFilter = isAnyChecked(checkedProductCard);
                const cartIds = checkingProductFilter.map((item) => ({
                    cart_id: item?.cart_id,
                }));
                setSelectedCardIds(cartIds);
                const quantityUpdateInfo = {
                    cart_id: indexId,
                    outlet_id: outletId,
                    quantity: "increment",

                };
                try {
                    setQuantityUpdateLoader(true)
                    const incrementApi = await addToCartQuantityUpdate(
                        quantityUpdateInfo,
                        session?.accessToken
                    );
                    if (incrementApi.code != 200) {
                        toast.error(incrementApi.message)
                    }
                } catch (error) {
                    console.error('Error updating cart quantity:', error);
                } finally {
                    setQuantityUpdateLoader(false);
                }

                const updatedCartProducts = await fetchCartProducts(
                    session?.accessToken,
                    outletId,
                    districtId
                );

                if (updatedCartProducts?.success) {
                    const selectedProductIds = getSelectedCardIds();
                    const updatedProducts = updateProductWithChecked(
                        selectedProductIds,
                        updatedCartProducts?.data
                    );
                    setCheckedProductCard(updatedProducts);

                    const quantityTotal = getTotalQuantity(
                        updatedCartProducts?.data
                    );

                    dispatch(
                        setAddToCart({
                            hasSession: true,
                            length: quantityTotal,
                        })
                    );
                }
            } else {
                const updatedUsers = checkedProductCard.map(
                    (checkCard, index) => {
                        if (checkCard.quantity >= checkCard.productStoke) {
                            toast.error("Product out of stock")
                        }
                        if (index === indexId) {
                            return {
                                ...checkCard,
                                quantity: checkCard.quantity < checkCard.productStoke ? checkCard.quantity + 1 : checkCard.quantity,
                            };
                        }
                        return checkCard;
                    }
                );
                const quantityTotal = getTotalQuantity(updatedUsers);
                dispatch(
                    setAddToCart({
                        hasSession: false,
                        length: quantityTotal,
                    })
                );
                setCheckedProductCard(updatedUsers);
                updateLocalStorage(updatedUsers);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const cartProduct = addToCartProductList();
            setCheckedProductCard(cartProduct);
        }
    }, []);

    useEffect(() => {
        const handleCheckout = async () => {
            try {
                if (session?.accessToken) {
                    setLoading(true)
                    const updatedCartProducts = await fetchCartProducts(
                        session?.accessToken,
                        outletId,
                        districtId
                    );
                    if (updatedCartProducts?.success) {
                        setCheckedProductCard(updatedCartProducts?.data);
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        };
        handleCheckout();
    }, [session?.accessToken]);

    function isAnyChecked(products) {
        const isCheckedProduct = [];
        for (let product of products) {
            if (product.isChecked) {
                isCheckedProduct.push(product);
            }
        }
        return isCheckedProduct;
    }

    useEffect(() => {
        const checkingProductFilter = isAnyChecked(checkedProductCard);;
        setCheckingProductFilter(checkingProductFilter)

        const checkedProductTotalPrice = checkingProductFilter.reduce(
            (sum, product) => {
                return sum + parseFloat(product.price) * product.quantity;
            },
            0
        );
        const checkedProductSubTotalPrice = checkingProductFilter.reduce(
            (sum, product) => {
                return (
                    sum +
                    parseFloat(product.regular_price || product.price) *
                    product.quantity
                );
            },
            0
        );
        const checkedProductTotalDiscount = checkingProductFilter.reduce(
            (sum, product) => {
                return (
                    sum +
                    parseFloat(
                        (product.regular_price
                            ? product.regular_price
                            : product.price) - product.price
                    ) *
                    product.quantity
                );
            },
            0
        );

        setTotalPrice(checkedProductTotalPrice);
        setSubTotalPrice(checkedProductSubTotalPrice);
        setTotalDiscount(checkedProductTotalDiscount);

        setIsRemoveOpen(checkingProductFilter.length > 0 ? true : false);
    }, [checkedProductCard]);

    const handleCheckoutNavigation = async () => {
        const checkingProductFilter = isAnyChecked(checkedProductCard);
        if (checkingProductFilter.length > 0) {
            if (session) {
                const updatedItemsInCard = checkingProductFilter.map(
                    (item) => ({
                        cart_id: item?.cart_id,
                    })
                );
                // console.log("updatedItemsInCard", updatedItemsInCard);
                await addToCartSelectedProduct(
                    updatedItemsInCard,
                    session?.accessToken
                );
                router.push(`/shipping-page/cart-product`);
            } else {
                requestPage("cart-page");
                router.push("/login?from=cart-page");
                toast.error("Log in to access shipping");
            }
        } else {
            toast.error("Please select product first");
        }
    };

    const handlePlaceOrder = async () => {
        const cartItems = checkingProductFilter.map((product) => ({
            product_id: product.product_id,
            product_quantity: product.quantity,
            product_regular_price: product.regular_price,
            product_unit_price: product.price,
            product_variation_id: product.product_variation_id || "",
            product_shipping_charge: "", // You can add this if available
            product_discount_type: product.discount_type || "",
            product_discount_amount: product.discountPrice || "",
            vendor_id: "",
            thumbnail: product.product_thumbnail || "",
        }));

        const data = {
            outlet_id: outletId,
            location_id: districtId,
            sub_total: subTotalPrice,
            discount_amount: totalDiscount,
            total_products_price: totalPrice,
            total_delivery_charge: 0,
            grand_total: totalPrice,
            delivery_note: "",
            shipping_email: "",
            outlet_pickup_point_id: null,
            order_product_type: selectedProductType,
            place_order_with: "add to cart",
            shipping_address_id: null,
            payment_type: "",
            cart_items: cartItems,
        };

        // Calculate the total quantity of the selected products
        const quantityTotal = getTotalQuantity(checkingProductFilter);
        const quantityTotalAll = getTotalQuantity(checkedProductCard);

        try {
            if (session) {
                setLoading(true);
                const order = await placeOrder(data, session?.accessToken);
                if (order.code == 200) {
                    deleteBuyNowProductData();
                    router.push(`/paynow?orderId=${order?.results?.order_id}`);
                    dispatch(
                        setAddToCart({
                            hasSession: true,
                            length: quantityTotalAll - quantityTotal,
                        })
                    );
                } else {
                    toast.error(order.message);
                }
                setLoading(false);
            } else {
                requestPage("cart-page");
                router.push("/login?from=cart-page");
                toast.error("Log in to access shipping");
            }
        } catch (error) {
            setLoading(false);
            console.error("An error occurred while placing the order:", error);
            toast.error("Something went wrong, please try again later.");
        }
    };


    return (
        <section className="cart-section-area">
            <div className="container">
                {(loading || quanticUpdateLoader) && <LodingFixed />}
                <div className="row gx-4 gy-5">
                    <div className="col-lg-9">
                        <div className="row cart-top-area">
                            <div className="col-12">
                                <div className="cart-top-holder">
                                    <div className="d-flex gap-3 card-top-info">
                                        <input
                                            className="cart-checkbox"
                                            type="checkbox"
                                            id="select-all"
                                            name="allSelect"
                                            checked={
                                                checkedProductCard?.length >
                                                0 &&
                                                !checkedProductCard.some(
                                                    (item) =>
                                                        item?.isChecked !== true
                                                )
                                            }
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="select-all">
                                            Select All
                                        </label>
                                    </div>
                                    <div className="cart-top-remove-btn">
                                        <button
                                            onClick={handleSelectedItemDelete}
                                            disabled={!isRemoveOpen}
                                            style={{
                                                opacity: isRemoveOpen
                                                    ? "100%"
                                                    : 0.5,
                                                cursor: isRemoveOpen
                                                    ? "pointer"
                                                    : "not-allowed",
                                            }}
                                        >
                                            <FaTrashCan /> REMOVE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row product-cart-details-area">
                            <div className="col-12">
                                <div className="product-cart-details-continer overflow-x-auto w-100">
                                    <div
                                        className="table align-middle"
                                    >
                                        <div className="d-flex flex-column-reverse gap-2">
                                            {checkedProductCard.length > 0 ? (
                                                checkedProductCard.map(
                                                    (item, index) => {
                                                        const price = item.price * item.quantity;
                                                        const regularPrice = item.regular_price * item.quantity;
                                                        return (
                                                            <div className="d-flex justify-content-between gap-2 product-cart-details-item" key={index}>
                                                                <div className="d-flex gap-2 g-md-3">
                                                                    <div className="d-flex justify-content-center align-items-center">
                                                                        <input
                                                                            className="cart-checkbox"
                                                                            type="checkbox"
                                                                            name={`${index}`}
                                                                            checked={item?.isChecked || false}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>

                                                                    <div>
                                                                        <div className="product-cart-product-img">
                                                                            <Image
                                                                                fill={true}
                                                                                src={`${NagadhatPublicUrl}/${item?.product_thumbnail}`}
                                                                                alt="black-friday"
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div>
                                                                        <h2 className="product-cart-text">
                                                                            <Link href={`/products/${item?.slug}?outlet_id=${item?.outlet_id}`}>
                                                                                {item.product_name}
                                                                            </Link>
                                                                        </h2>
                                                                        <div className="cart-prodect-variants">
                                                                            {Array.isArray(item?.selectedVariants) &&
                                                                                item.selectedVariants.slice(0, 2).map((variant, inx) => {
                                                                                    if (
                                                                                        variant &&
                                                                                        typeof variant === "object" &&
                                                                                        Object.entries(variant).length > 0
                                                                                    ) {
                                                                                        const [key, value] = Object.entries(variant)[0];
                                                                                        const keyDisplay = key.split("_")[1];

                                                                                        return (
                                                                                            <React.Fragment key={inx}>
                                                                                                <p>
                                                                                                    <span>{keyDisplay}:</span>
                                                                                                    <span className="cart-prodect-variants-item">
                                                                                                        <label>{value}</label>
                                                                                                    </span>
                                                                                                </p>
                                                                                            </React.Fragment>
                                                                                        );
                                                                                    }
                                                                                    return null;
                                                                                })}
                                                                        </div>
                                                                        <div className="cart-prodect-variants">
                                                                            Product Type:
                                                                            <span className="cart-prodect-variants-item">
                                                                                {item.cart_product_type == 2 ? "Resale" : "Retail"}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div style={{ minWidth: "100px" }}>
                                                                    <p>
                                                                        <strong className="product-cart-price">৳ {price}</strong>
                                                                    </p>
                                                                    {price !== regularPrice && (
                                                                        <p>
                                                                            <del className="product-cart-discount-price">৳ {regularPrice}</del>
                                                                        </p>
                                                                    )}
                                                                    <div className="d-flex gap-2">
                                                                        <button
                                                                            className="product-cart-remov-btn"
                                                                            onClick={() => handleDelete(session ? item?.cart_id : index)}
                                                                        >
                                                                            <FaTrashCan />
                                                                        </button>
                                                                        <button className="product-cart-remov-btn">
                                                                            <FaRegHeart />
                                                                        </button>
                                                                    </div>
                                                                    <div
                                                                        className="btn-group quantity-area p-0 rounded-1 d-md-none mt-1"
                                                                        role="group"
                                                                        aria-label="Basic example"
                                                                        style={{ maxWidth: "100px", minWidth: "60px" }}
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            className="quantity-increase ps-2 py-1"
                                                                            onClick={() => handleDecrement(session ? item?.cart_id : index, item.cart_product_type)}
                                                                            disabled={quanticUpdateLoader}
                                                                        >
                                                                            <FaMinus />
                                                                        </button>
                                                                        <input
                                                                            className="quantity-fild"
                                                                            min="1"
                                                                            step="1"
                                                                            autoComplete="off"
                                                                            type="text"
                                                                            value={item?.quantity}
                                                                            readOnly
                                                                        />
                                                                        <button
                                                                            className="quantity-decrease pe-2 py-1"
                                                                            type="button"
                                                                            onClick={() => handleIncrement(session ? item?.cart_id : index, item.cart_product_type)}
                                                                            disabled={quanticUpdateLoader}
                                                                        >
                                                                            <FaPlus />
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                                <div className="my-auto d-none d-md-block">
                                                                    <div className="btn-group quantity-area" role="group" aria-label="Basic example">
                                                                        <button
                                                                            type="button"
                                                                            className="quantity-increase"
                                                                            onClick={() => handleDecrement(session ? item?.cart_id : index, item.cart_product_type)}
                                                                            disabled={quanticUpdateLoader}
                                                                        >
                                                                            <FaMinus />
                                                                        </button>
                                                                        <input
                                                                            className="quantity-fild"
                                                                            min="1"
                                                                            step="1"
                                                                            autoComplete="off"
                                                                            type="text"
                                                                            value={item?.quantity}
                                                                            readOnly
                                                                        />
                                                                        <button
                                                                            className="quantity-decrease"
                                                                            type="button"
                                                                            onClick={() => handleIncrement(session ? item?.cart_id : index, item.cart_product_type)}
                                                                            disabled={quanticUpdateLoader}
                                                                        >
                                                                            <FaPlus />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                !loading &&
                                                <NoDataFound
                                                    title={"No Cart Items"}
                                                    description={
                                                        "There are no items in this cart"
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        {/* <div className="row promo-code-section">
                            <div className="col-12">
                                <div className="d-flex gap-3 align-items-center">
                                    <div className="discount-code-img">
                                        <Image
                                            fill={true}
                                            src="/images/discount-code.png"
                                            alt=""
                                        />
                                    </div>

                                    <h3 className="promo-code-title">
                                        I Have promo code
                                    </h3>
                                </div>
                                <div className="promo-code-input-area">
                                    <input
                                        type="text"
                                        name="promo"
                                        className="form-control"
                                        placeholder="Enter promo code"
                                    />
                                    <button className="add-to-cart-link border border-0">
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div> */}
                        <div className="row shopping-section pt-0">
                            <div className="col-12">
                                <div className="shopping-info-area">
                                    <h3 className="shopping-title">
                                        Shopping Summary
                                    </h3>
                                    <div className="d-flex gap-3 align-items-center justify-content-between shopping-price-area py-1">
                                        <p
                                            className="fw-normal"
                                            style={{
                                                fontSize: "14px",
                                            }}
                                        >
                                            SubTotal{" "}
                                            {checkedProductCard.length > 0 &&
                                                totalPrice > 0 && (
                                                    <span
                                                        style={{
                                                            color: "#414241",
                                                            fontSize: "14px",
                                                            fontWeight: "400",
                                                        }}
                                                    >
                                                        ( Item {selectedCount} )
                                                    </span>
                                                )}
                                        </p>
                                        <strong
                                            style={{
                                                fontSize: "16px",
                                            }}
                                        >
                                            ৳ {totalPrice}
                                        </strong>
                                    </div>
                                    {selectedProductType == 2 ? (
                                        <button
                                            onClick={(e) => {
                                                handlePlaceOrder();
                                            }}
                                            className="add-to-cart-link border border-0 w-100"
                                            disabled={!totalPrice}
                                            style={{
                                                pointerEvents:
                                                    totalPrice &&
                                                        !isButtonDisabled
                                                        ? "auto"
                                                        : "none",
                                                opacity:
                                                    totalPrice &&
                                                        !isButtonDisabled
                                                        ? 1
                                                        : 0.5,
                                            }}
                                        >
                                            {totalPrice
                                                ? "place order"
                                                : "Select First"}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={(e) => {
                                                handleCheckoutNavigation();
                                            }}
                                            className="add-to-cart-link border border-0 w-100"
                                            disabled={!totalPrice}
                                            style={{
                                                pointerEvents:
                                                    totalPrice &&
                                                        !isButtonDisabled
                                                        ? "auto"
                                                        : "none",
                                                opacity:
                                                    totalPrice &&
                                                        !isButtonDisabled
                                                        ? 1
                                                        : 0.5,
                                            }}
                                        >
                                            {totalPrice
                                                ? "CHECKOUT"
                                                : "Select First"}
                                        </button>
                                    )}
                                    <Link
                                        href="/"
                                        className="shopping-back-btn"
                                    >
                                        Back to Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default CartPage;
