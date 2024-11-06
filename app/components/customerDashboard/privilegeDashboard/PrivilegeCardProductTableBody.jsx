"use client";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa6";
import NoDataFound from "../../NoDataFound";
import PrivilegeAddToCard from "./PrivilegeAddToCard";
import { NagadhatPublicUrl, truncateTitle } from "@/app/utils";
import PrivilegeDeleteCardItem from "./PrivilegeDeleteCardItem";
import { useEffect, useState, useTransition } from "react";
import { getPrivilegeAddToCartProducts } from "@/app/services/privilegeCard/getPrivilegeAddToCartProducts";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";

const PrivilegeCardProductTableBody = ({
    productsData,
    setRendaringCartPrice,
    rendaringCartPrice,
    productCardLimit,
}) => {
    const [privilegeCartItem, setPrivilegeCartItem] = useState([]);
    const [isPending, startTransition] = useTransition();
    const { data: session, status } = useSession();

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

    useEffect(() => {
        const fetchPrivilegeCartProducts = async () => {
            if (session?.accessToken && outletId && districtId) {
                try {
                    startTransition(async () => {
                        const params = {
                            outlet_id: outletId,
                            location_id: districtId,
                        };
                        const response = await getPrivilegeAddToCartProducts(
                            session.accessToken,
                            params
                        );
                        setPrivilegeCartItem(response?.results);
                    });
                } catch (error) {
                    console.error("Error fetching cart products:", error);
                    toast.error("Failed to fetch cart products.");
                }
            }
        };
        fetchPrivilegeCartProducts();
    }, [session?.accessToken, outletId, districtId, rendaringCartPrice]);

    const handleIncrementWithLimit = (ID) => {};
    const handleDecrement = (ID) => {};

    return (
        <>
            <ToastContainer />
            <tbody>
                {productsData.length > 0 ? (
                    productsData.map((item, index) => {
                        const {
                            product_thumbnail,
                            product_name,
                            purchases_price,
                            mrp_price,
                            purchase_quantity,
                            id,
                            cart_status,
                            cart_id,
                        } = item;

                        const imageUrl = product_thumbnail
                            ? `${NagadhatPublicUrl}/${product_thumbnail}`
                            : "/images/placeholder.jpg";

                        const totalAmount = purchases_price * purchase_quantity;
                        const isAddToCardDisabled =
                            totalAmount >= productCardLimit;

                        return (
                            <tr key={id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Image
                                        src={imageUrl}
                                        alt="Product Image"
                                        width={60}
                                        height={60}
                                    />
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="border-0 bg-transparent"
                                        onClick={() => handleProductClick(item)}
                                    >
                                        {truncateTitle(product_name, 40)}
                                    </button>
                                </td>
                                <td>
                                    <p className="pb-2">
                                        ৳ {purchases_price.toFixed(2)}
                                    </p>
                                    {purchases_price !== mrp_price && (
                                        <del>{mrp_price}</del>
                                    )}
                                </td>
                                <td>
                                    <div className="d-flex gap-1 align-items-center">
                                        <button
                                            className="d-flex p-0 align-items-center justify-content-center border-0 add-to-cart-link rounded-circle"
                                            disabled={cart_status === 2}
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                cursor:
                                                    cart_status === 2
                                                        ? "not-allowed"
                                                        : "pointer",
                                            }}
                                            onClick={() =>
                                                handleIncrementWithLimit(id)
                                            }
                                        >
                                            <FaPlus />
                                        </button>
                                        <input
                                            type="text"
                                            value={
                                                privilegeCartItem.find(
                                                    (cartPro) =>
                                                        cartPro.product_id ===
                                                        id
                                                )?.quantity || ""
                                            }
                                            readOnly
                                            className="border-0 text-center px-2 py-2 bg-transparent fs-5"
                                            style={{ width: "60px" }}
                                        />
                                        <button
                                            className="d-flex p-0 align-items-center justify-content-center border-0 add-to-cart-link rounded-circle"
                                            disabled={cart_status === 2}
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                cursor:
                                                    cart_status === 2
                                                        ? "not-allowed"
                                                        : "pointer",
                                            }}
                                            onClick={() => handleDecrement(id)}
                                        >
                                            <FaMinus />
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    {privilegeCartItem.find(
                                        (cartPrice) =>
                                            cartPrice.product_id === id
                                    )?.price || ""}
                                </td>
                                <td>
                                    {cart_status === 1 ? (
                                        <PrivilegeAddToCard
                                            setRendaringCartPrice={
                                                setRendaringCartPrice
                                            }
                                            rendaringCartPrice={
                                                rendaringCartPrice
                                            }
                                            isDisabled={isAddToCardDisabled}
                                            totalAmount={totalAmount}
                                        />
                                    ) : (
                                        <PrivilegeDeleteCardItem
                                            setRendaringCartPrice={
                                                setRendaringCartPrice
                                            }
                                            rendaringCartPrice={
                                                rendaringCartPrice
                                            }
                                            cartId={cart_id}
                                        />
                                    )}
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan={7}>
                            <NoDataFound />
                        </td>
                    </tr>
                )}
            </tbody>
        </>
    );
};

export default PrivilegeCardProductTableBody;
