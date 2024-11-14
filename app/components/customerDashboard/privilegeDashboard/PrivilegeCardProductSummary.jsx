"use client";

import { addToCartSelectedProduct } from "@/app/services/postCartSelectedProducts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "react-toastify";

const PrivilegeCardProductSummary = ({ privilegeCartItem, token }) => {
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

    const handleCheckoutPrivilegeProduct = async () => {
        try {
            const cartIds = privilegeCartItem.map((cartItem) => ({
                cart_id: cartItem?.cart_id,
            }));
            const response = await addToCartSelectedProduct(cartIds, token);
            if (response?.code === 200) {
                toast.success("Checkout successful!");
                router.push("/shipping-page/cart-product");
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
                            className="btn btn-secondary"
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
