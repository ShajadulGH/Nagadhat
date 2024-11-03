"use client";
import { useState, useEffect } from "react";
import { FaCheck, FaRegEye, FaRegStar, FaStar } from "react-icons/fa6";
import ResaleBuyNowBtn from "./ResaleBuyNowBtn";
import ResaleAddToCartBtn from "./ResaleAddToCartBtn";

const ResaleProductDetailsContent = ({ productDetails }) => {
    // Ensure the prices are numbers
    const productPrice = parseFloat(productDetails?.resell_purchases_price) || 0;
    const productMRP = parseFloat(productDetails?.resell_mrp_price) || 0;

    // State to manage quantity, total price, and total MRP price
    const [quantity, setQuantity] = useState(1);  // Initial quantity set to 1 or fallback
    const [totalPrice, setTotalPrice] = useState(0); 
    const [totalMRPPrice, setTotalMRPPrice] = useState(0); 

    // Function to update prices based on quantity
    const updatePrices = (newQuantity) => {
        setTotalPrice(productPrice * newQuantity);
        setTotalMRPPrice(productMRP * newQuantity);
    };

    // Function to handle quantity increment
    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updatePrices(newQuantity);
    };

    // Function to handle quantity decrement
    const handleDecrease = () => {
        if (quantity > productDetails?.min_quantity) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updatePrices(newQuantity);
        }
    };

    // Update prices when the product price, MRP, or quantity changes
    useEffect(() => {
        if (productDetails) {
            const initialQuantity = productDetails?.min_quantity || 1;
            setQuantity(initialQuantity);
            updatePrices(initialQuantity);
        }
    }, [productDetails, productPrice, productMRP]);

    return (
        <>
            <div className="product-details-content">
                <h1>{productDetails?.product_name}</h1>
                <div className="product-details-rating-area d-flex align-items-center justify-content-between flex-wrap">
                    <div className="product-details-rating-item d-flex">
                        <div className="rating-star d-flex text-warning">
                            <div className="rating-star-image">
                                <FaStar />
                            </div>
                            <div className="rating-star-image">
                                <FaStar />
                            </div>
                            <div className="rating-star-image">
                                <FaStar />
                            </div>
                            <div className="rating-star-image">
                                <FaStar />
                            </div>
                            <div className="rating-star-image">
                                <FaRegStar />
                            </div>
                        </div>
                        <div className="rating-star">
                            <p>10 Ratings</p>
                        </div>
                    </div>
                    <div className="product-details-rating-item d-flex align-items-center">
                        <div className="text-black-50">
                            <FaCheck />
                        </div>
                        <div className="product-Sold">
                            <p>415 Sold</p>
                        </div>
                    </div>
                    <div className="product-details-rating-item d-flex align-items-center">
                        <div className="text-black-50">
                            <FaRegEye />
                        </div>
                        <div className="product-Sold">
                            <p>50 Viewed</p>
                        </div>
                    </div>
                </div>
                <div className="product-details-price-area align-items-center d-flex">
                    <strong>
                        <span>৳ </span>
                        {totalPrice.toFixed(2)}
                    </strong>
                    <del>৳ {totalMRPPrice.toFixed(2)}</del>
                </div>

                <div className="product-info-rtk-content pt-4">
                    <form>
                        <div></div>
                        <div className="product-details-quantity-area d-flex align-items-center justify-content-start">
                            <div className="product-details-quantity d-flex align-items-center">
                                <div className="product-details-inner-quantity d-flex align-items-center">
                                    <p>Quantity:</p>
                                </div>
                                <div className="product-details-inner-quantity product-details-inner-qty d-flex align-items-center">
                                    <button type="button" onClick={handleDecrease} disabled={quantity <= productDetails?.min_quantity}>
                                        -
                                    </button>
                                    <input
                                        readOnly
                                        type="text"
                                        value={quantity}
                                    />
                                    <button type="button" onClick={handleIncrease}>
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="product-details-add-cart-area d-flex align-items-center">
                            <div className="product-details-add-cart">
                                <div className="add-to-cart-btn">
                                    <ResaleBuyNowBtn
                                        product={{ ...productDetails, updateQuantity: quantity }}
                                    />
                                </div>
                            </div>
                            <div className="product-details-add-cart">
                                <div className="add-to-cart-btn">
                                    <ResaleAddToCartBtn
                                        product={{ ...productDetails, updateQuantity: quantity }}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="pt-4">{productDetails?.short_description}</div>
            </div>
        </>
    );
};

export default ResaleProductDetailsContent;
