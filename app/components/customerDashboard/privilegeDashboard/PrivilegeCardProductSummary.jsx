"use client";

import { addToCartSelectedProduct } from "@/app/services/postCartSelectedProducts";
import { placeOrder } from "@/app/services/postPlaceOrder";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

const PrivilegeCardProductSummary = ({ privilegeCartItem, token }) => {
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
    console.log("privilegeCartItem===>", { privilegeCartItem });

    const router = useRouter();

    const netPrice = useMemo(
        () => privilegeCartItem.reduce((acc, item) => acc + item.price, 0),
        [privilegeCartItem]
    );

    const totalDiscount = useMemo(
        () =>
            privilegeCartItem.reduce(
                (acc, item) => acc + parseFloat(item.discountPrice),
                0
            ),
        [privilegeCartItem]
    );

    const deliveryCharge = 0;
    const subTotal = netPrice + totalDiscount + deliveryCharge;

    // const handleCheckoutPrivilegeProduct = async () => {
    //     try {
    //         const cartIds = privilegeCartItem.map((cartItem) => ({
    //             cart_id: cartItem?.cart_id,
    //         }));
    //         const response = await placeOrder(cartIds, token);
    //         if (response?.code === 200) {
    //             toast.success("Checkout successful!");
    //             router.push("/shipping-page-resale/cart-product");
    //         } else {
    //             toast.error(
    //                 "Checkout failed. Please try again.",
    //                 response?.message
    //             );
    //             console.error("Checkout failed:", response?.message);
    //         }
    //     } catch (error) {
    //         toast.error("An error occurred during checkout.");
    //         console.error("Error during checkout:", error);
    //     }
    // };

    const handleCheckoutPrivilegeProduct = async () => {
        try {
            const cartItem = privilegeCartItem.map((product) => ({
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
            const orderData = {
                outlet_id: outletId,
                location_id: districtId,
                shipping_address_id: "",
                sub_total: subTotal || 0,
                discount_amount: totalDiscount,
                total_products_price: subTotal || 0,
                total_delivery_charge: deliveryCharge,
                grand_total: netPrice || 0,
                delivery_note: "",
                shipping_email: "",
                outlet_pickup_point_id: "",
                order_product_type: 4,
                place_order_with: "place order with Privilege card",
                cart_items: cartItem,
            };
            const response = await placeOrder(orderData, token);

            if (response?.code === 200) {
                const order_id = response?.results?.order_id;
                toast.success("Checkout successful!");
                if (order_id) {
                    router.push(
                        `/shipping-page-resale/${order_id}?order-type=${4}`
                    );
                } else {
                    toast.error("Order ID not found. Please contact support.");
                }
            } else {
                toast.error(
                    "Checkout failed. Please try again.",
                    response?.message
                );
                console.error("Checkout failed:", response?.message);
            }
        } catch (error) {
            toast.error("An error occurred during checkout.");
            console.error("Error during checkout:", error);
        }
    };

    return (
        <>
            <div className="row justify-content-end px-4 pt-2 pb-4">
                <div className="col-md-5 col-sm-12">
                    <ul className="table-bordered pb-4">
                        <li className="fs-6 pb-2 d-flex align-items-center justify-content-between">
                            <span>Sub Total Amount:</span>
                            <strong>৳ {subTotal.toFixed(2)}</strong>
                        </li>
                        <li className="fs-6 pb-2 d-flex align-items-center justify-content-between">
                            <span>Total Discount:</span>
                            <strong>৳ {totalDiscount.toFixed(2)}</strong>
                        </li>
                        <li className="fs-6 pb-2 d-flex align-items-center justify-content-between">
                            <span>Delivery Charge:</span>
                            <strong>৳ {deliveryCharge.toFixed(2)}</strong>
                        </li>
                        <li className="fs-6 pb-2 d-flex align-items-center justify-content-between">
                            <span>Net Total:</span>
                            <strong>৳ {netPrice.toFixed(2)}</strong>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center justify-content-end gap-3">
                        <button
                            onClick={handleCheckoutPrivilegeProduct}
                            className="border-0 add-to-cart-link"
                        >
                            Proceed to Checkout
                        </button>
                        <Link
                            href="/privilege-card-shopping-list"
                            className=" btn-secondary border-0 add-to-cart-link"
                        >
                            View Cart
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivilegeCardProductSummary;
