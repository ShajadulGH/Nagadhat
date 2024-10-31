"use client";

import { placeOrder } from "@/app/services/postPlaceOrder";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const PrivilegeBuyNowBtn = ({ session, privilegeCardInfo }) => {
    console.log("privilegeCardInfo=>", { privilegeCardInfo });
    const router = useRouter();

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

    const handlePrivilegeBuyNow = async () => {
        const cartItems = {
            outlet_id: outletId,
            location_id: districtId,
            shipping_address_id: "",
            sub_total: privilegeCardInfo?.purchases_price || 0,
            discount_amount: 0,
            total_products_price: privilegeCardInfo?.purchases_price || 0,
            total_delivery_charge: 0,
            grand_total: privilegeCardInfo?.purchases_price || 0,
            delivery_note: "",
            shipping_email: "",
            outlet_pickup_point_id: "",
            order_product_type: 4,
            place_order_with: "place order with Privilege card",
            cart_items: [
                {
                    product_id: privilegeCardInfo?.id,
                    product_quantity: 1,
                    product_regular_price:
                        privilegeCardInfo?.purchases_price || 0,
                    product_unit_price: privilegeCardInfo?.purchases_price || 0,
                    product_variation_id: "",
                    product_shipping_charge: "",
                    product_discount_type: "",
                    product_discount_amount: "",
                    vendor_id: "",
                    thumbnail: privilegeCardInfo?.privilege_card?.front_image,
                },
            ],
        };
        try {
            const response = await placeOrder(cartItems, session?.accessToken);
            if (!response?.error) {
                toast.success("Order placed successfully!");
                const orderID = response?.order_id;
                if (orderID) {
                    router.push(`/paynow?orderId=${orderID}`);
                } else {
                    toast.error("Order ID not found. Please contact support.");
                }
            } else {
                toast.error("Failed to place order");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Failed to place order. Please try again.");
        }
    };

    return (
        <>
            <button
                onClick={handlePrivilegeBuyNow}
                className="add-to-cart-link border-0 rounded-3 text-capitalize"
            >
                Buy
            </button>
        </>
    );
};

export default PrivilegeBuyNowBtn;
