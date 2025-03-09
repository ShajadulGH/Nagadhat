"use client";

import { placeOrder } from "@/app/services/postPlaceOrder";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { useSession } from "next-auth/react";

const PrivilegeBuyNowBtn = ({ privilegeCardInfo }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { data: session } = useSession();

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
                    product_regular_price: privilegeCardInfo?.mrp_price || 0,
                    product_unit_price: privilegeCardInfo?.mrp_price || 0,
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
            startTransition(async () => {
                const response = await placeOrder(
                    cartItems,
                    session?.accessToken
                );
                if (!response?.error) {
                    toast.success("Order placed successfully!");
                    const orderID = response?.results?.order_id;
                    if (orderID) {
                        router.push(`/paynow?orderId=${orderID}`);
                    } else {
                        toast.error(
                            "Order ID not found. Please contact support."
                        );
                    }
                } else {
                    toast.error("Failed to place order");
                }
            });
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Failed to place order. Please try again.");
        }
    };

    return (
        <>
            {privilegeCardInfo?.product_name === "Membership Card" &&
                privilegeCardInfo?.status === 4 && (
                    <button
                        onClick={handlePrivilegeBuyNow}
                        className={`add-to-cart-link border-0 rounded-3 text-capitalize`}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <div
                                style={{
                                    height: "21px",
                                    width: "70px",
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
                            <span>Buy Now</span>
                        )}
                    </button>
                )}

            {privilegeCardInfo?.product_name === "Membership Card" && privilegeCardInfo?.status === 0 && (
                <button
                    className={`add-to-cart-link border-0 rounded-3 text-capitalize`}
                    disabled
                >
                    <span>In Review</span>
                </button>
            )}

            {privilegeCardInfo?.product_name === "Membership Card" && privilegeCardInfo?.status === 1 && (
                <button
                    className={`add-to-cart-link border-0 rounded-3 text-capitalize`}
                    disabled
                >
                    <span>Active</span>
                </button>
            )}
            {privilegeCardInfo?.product_name === "Membership Card" && privilegeCardInfo?.status === 3 && (
                <button
                    className={`add-to-cart-link border-0 rounded-3 text-capitalize`}
                    disabled
                >
                    <span>Suspended</span>
                </button>
            )}
        </>
    );
};

export default PrivilegeBuyNowBtn;
