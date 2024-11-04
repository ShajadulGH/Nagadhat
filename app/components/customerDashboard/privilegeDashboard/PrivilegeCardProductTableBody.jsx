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

const PrivilegeCardProductTableBody = ({
    handleDecrement,
    handleIncrement,
    handleProductClick,
    quantities,
    productsData,
    DEFAULT_QUANTITY,
    showPriceAddCart,
    handleSetShowPrice,
    setRendaringCartPrice,
    rendaringCartPrice,
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
            if (session?.accessToken) {
                startTransition(async () => {
                    try {
                        const params = {
                            outlet_id: outletId,
                            location_id: districtId,
                        };
                        const response = await getPrivilegeAddToCartProducts(
                            session.accessToken,
                            params
                        );

                        setPrivilegeCartItem(response?.results);
                    } catch (error) {
                        console.error("Error fetching cart products:", error);
                    }
                });
            }
        };
        fetchPrivilegeCartProducts();
    }, [session?.accessToken, outletId, districtId, rendaringCartPrice]);

    return (
        <>
            <tbody>
                {productsData.length > 0 ? (
                    productsData.map((item, index) => {
                        const {
                            product_thumbnail,
                            product_name,
                            purchases_price,
                            purchase_quantity,
                            id,
                            cart_status,
                        } = item;

                        const quantity = quantities[id] || DEFAULT_QUANTITY; // Use id for quantity
                        const imageUrl = product_thumbnail
                            ? `${NagadhatPublicUrl}/${product_thumbnail}`
                            : "/images/dan-cake-chocolate-muffin-30g-24-pieces_550.jpeg";
                        const totalAmount = purchases_price * quantity;

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
                                    ৳ {parseFloat(purchases_price).toFixed(2)}
                                </td>
                                <td>
                                    <div className="d-flex gap-1 align-items-center">
                                        <button
                                            className={`d-flex p-0 align-items-center justify-content-center border-0 add-to-cart-link rounded-circle `}
                                            disabled={
                                                quantity >= purchase_quantity
                                            }
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                cursor:
                                                    quantity >=
                                                    purchase_quantity
                                                        ? "not-allowed"
                                                        : "pointer",
                                            }}
                                            onClick={() =>
                                                handleIncrement(
                                                    id,
                                                    purchase_quantity
                                                )
                                            }
                                        >
                                            <FaPlus />
                                        </button>
                                        <input
                                            type="text"
                                            value={quantity}
                                            readOnly
                                            className="border-0 text-center px-2 py-2 bg-transparent fs-5"
                                            style={{ width: "60px" }}
                                        />
                                        <button
                                            className={`d-flex p-0 align-items-center justify-content-center border-0 add-to-cart-link rounded-circle `}
                                            disabled={quantity <= 1}
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                cursor:
                                                    quantity <= 1
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
                                    {(() => {
                                        const findPrice =
                                            privilegeCartItem.find(
                                                (cartPrice) =>
                                                    cartPrice.product_id === id
                                            );
                                        return findPrice ? findPrice.price : "";
                                    })()}
                                </td>

                                <td>
                                    {cart_status === 1 ? (
                                        <PrivilegeAddToCard
                                            quantity={quantity}
                                            productsData={item}
                                            handleSetShowPrice={
                                                handleSetShowPrice
                                            }
                                            totalAmount={totalAmount}
                                            setRendaringCartPrice={
                                                setRendaringCartPrice
                                            }
                                            rendaringCartPrice={
                                                rendaringCartPrice
                                            }
                                        />
                                    ) : (
                                        <PrivilegeDeleteCardItem
                                            setRendaringCartPrice={
                                                setRendaringCartPrice
                                            }
                                            rendaringCartPrice={
                                                rendaringCartPrice
                                            }
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
