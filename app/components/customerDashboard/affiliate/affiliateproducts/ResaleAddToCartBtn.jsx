"use client";
import { showToast } from '@/app/components/Toast';
import { fetchCartProducts } from '@/app/services/getShowAddToCartProduct';
import { addToCartProduct } from '@/app/services/postAddToCartAfterLogin';
import { setAddToCart } from '@/app/store/cartSlice';
import { getTotalQuantity } from '@/app/utils';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ResaleAddToCartBtn = ({ product }) => {
    const { status, data: session } = useSession();
    const dispatch = useDispatch();
    const router = useRouter();
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

    const handleAddToCart = async (event) => {
        event.stopPropagation();
        event.preventDefault();

        let newQuantity = product.updateQuantity || product.min_quantity || 1;

        const addToCartInfo = {
            product_id: product?.id,
            product_name: product?.product_name,
            regular_price: product.resell_mrp_price,
            discount_type: "",
            discountPrice: 0,
            price: product.resell_purchases_price,
            outlet_id: outletId,
            product_thumbnail: product.product_thumbnail || "",
            quantity: newQuantity || 1,
            selectedVariants: [],
            location_id: districtId,
            order_type: "Resale",
            cart_product_type: product.sell_product_type || 2,
            product_variation_id: null
        }


        try {
            setLoading(true)
            const productAdded = await addToCartProduct(addToCartInfo, session?.accessToken);
            if (productAdded.code == 200) {
                const updatedCartProducts = await fetchCartProducts(
                    session?.accessToken,
                    outletId,
                    districtId
                );
                const quantityTotal = getTotalQuantity(
                    updatedCartProducts?.data
                );
                dispatch(
                    setAddToCart({
                        hasSession: true,
                        length: quantityTotal,
                    })
                );
                showToast(productAdded.message);
            } else {
                showToast(productAdded.message, "error");
            }
        } catch (error) {
            console.error("An error occurred while placing the order:", error);
            showToast("Something went wrong, please try again later.", "error");
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <button
                onClick={handleAddToCart}
                className="add-to-cart-link undefined category-product-add-btn border-0"
                style={{
                    pointerEvents:"auto",
                    opacity: (product?.max_quantity || 0) < (product?.min_quantity || 1) ? 0.5 : 1,
                }}
                disabled={
                    !product ||
                    (product.max_quantity || 0) < (product.min_quantity || 1) ||
                    loading
                }
            >
                {
                    (product?.max_quantity || 0) < (product?.min_quantity || 1) ?
                        'out of stock' :
                        loading ? (
                            <div
                                style={{
                                    height: "21px",
                                    width: "96px",
                                    textAlign: "center",
                                }}
                            >
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
                }
            </button>
        </>

    )
}

export default ResaleAddToCartBtn
