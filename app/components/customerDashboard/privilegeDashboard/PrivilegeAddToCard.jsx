"use client";
import { addToCartProduct } from "@/app/services/postAddToCartAfterLogin";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { RotatingLines } from "react-loader-spinner";

const PrivilegeAddToCard = ({
    quantity,
    productsData,
    handleSetShowPrice,
    totalAmount,
    setRendaringCartPrice,
    rendaringCartPrice,
}) => {
    const [isPending, startTransition] = useTransition();
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
    const { data: session, status } = useSession();

    const handlePrivilegeAddToCard = async () => {
        const cartItems = {
            product_id: productsData?.id,
            product_name: productsData?.product_name,
            regular_price: totalAmount,
            discount_type: "",
            discountPrice: 0,
            price: totalAmount,
            outlet_id: outletId,
            product_thumbnail: productsData?.product_thumbnail,
            quantity: quantity,
            selectedVariants: [
                {
                    variation_size: "",
                },
            ],
            location_id: districtId,
            order_type: "Regular",
            cart_product_type: "4",
            product_variation_id: "",
        };
        try {
            startTransition(async () => {
                const response = await addToCartProduct(
                    cartItems,
                    session?.accessToken
                );
                if (response?.code === 200) {
                    handleSetShowPrice(productsData?.id);
                    setRendaringCartPrice(!rendaringCartPrice);
                }
            });
        } catch (error) {
            console.error("", error);
        }
    };

    return (
        <>
            <button
                onClick={handlePrivilegeAddToCard}
                className="border-0 add-to-cart-link rounded-2 flex items-center justify-center"
                aria-label={
                    isPending ? "Adding to cart, please wait" : "Add to cart"
                }
            >
                {isPending ? (
                    <div
                        className="flex items-center justify-center"
                        style={{ height: "21px", width: "30px" }}
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
                    "Add"
                )}
            </button>
        </>
    );
};

export default PrivilegeAddToCard;
