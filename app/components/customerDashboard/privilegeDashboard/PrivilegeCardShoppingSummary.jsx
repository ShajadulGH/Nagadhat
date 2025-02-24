"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { placeOrder } from "@/app/services/postPlaceOrder";

const PrivilegeCardShoppingSummary = ({
    privilegeCartItem,
    token,
    districtId,
    outletId,
}) => {
    const [netPrice, setNetPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [deliveryCharge, setDeliveryCharge] = useState(0);

    const router = useRouter();

    useEffect(() => {
        const total = privilegeCartItem.reduce(
            (acc, item) => acc + item?.purchase_price * item?.quantity,
            0
        );

        const subTotal = privilegeCartItem.reduce(
            (acc, item) => acc + parseFloat(item?.mrp_price * item?.quantity),
            0
        );

        const delivery = 0;
        setDeliveryCharge(delivery);
        const disCount = subTotal - total + delivery;

        setNetPrice(total);
        setTotalDiscount(disCount);
        setSubTotal(subTotal);
    }, [privilegeCartItem]);

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
                toast.success("Checkout successful!");
                const order_id = response?.results?.order_id;
                if (order_id) {
                    router.push(
                        `/shipping-page-resale/${order_id}?order-type=${4}`
                    );
                } else {
                    toast.error("Order ID not found. Please contact support.");
                }
            } else {
                toast.error(
                    response?.message,
                    "Checkout failed. Please try again."
                );
            }
        } catch (error) {
            toast.error("An error occurred during checkout.");
            console.error("Error during checkout:", error);
        }
    };

    return (
        <>
            <div className="row justify-content-end px-4 pt-2 pb-4 ">
                <div className="col-md-5 col-sm-12">
                    <ul className="table-bordered pb-4">
                        <li className="fs-6 pb-2 d-flex align-items-center justify-content-between">
                            <span>Sub Total Amount:</span>{" "}
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
                            <span>Net Total Amount:</span>{" "}
                            <strong>৳ {netPrice.toFixed(2)}</strong>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center justify-content-end gap-3">
                        <Link
                            className="border-0 add-to-cart-link"
                            href="/privilege-card-dashboard"
                        >
                            Back
                        </Link>
                        <button
                            onClick={handleCheckoutPrivilegeProduct}
                            className="border-0 add-to-cart-link"
                            disabled={privilegeCartItem.length === 0}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivilegeCardShoppingSummary;
