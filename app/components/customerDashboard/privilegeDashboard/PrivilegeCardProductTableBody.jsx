"use client";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa6";
import PrivilegeAddToCard from "./PrivilegeAddToCard";
import { NagadhatPublicUrl, truncateTitle } from "@/app/utils";
import PrivilegeDeleteCardItem from "./PrivilegeDeleteCardItem";
import { useEffect, useMemo, useState, useTransition } from "react";

import { toast } from "react-toastify";

const PrivilegeCardProductTableBody = ({
    item,
    setRendaringCartPrice,
    rendaringCartPrice,
    productCardLimit,
    index,
    privilegeCartItem,
}) => {
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
    const [changeQuantity, setChangeQuantity] = useState(purchase_quantity);
    const [changePrice, setChangePrice] = useState(
        purchases_price * changeQuantity
    );

    const imageUrl = product_thumbnail
        ? `${NagadhatPublicUrl}/${product_thumbnail}`
        : "/images/placeholder--image.jpg";
    const totalAmount = purchases_price * changeQuantity;

    const total = useMemo(
        () => privilegeCartItem.reduce((acc, item) => acc + item.price, 0),
        [privilegeCartItem]
    );

    const handleIncrementWithLimit = (purchase_quantity) => {
        if (
            changeQuantity < purchase_quantity &&
            changePrice + total <= productCardLimit
        ) {
            setChangeQuantity((prev) => prev + 1);
        } else {
            toast.warning("Cannot exceed the limit or quantity.");
        }
    };

    const handleDecrement = () => {
        if (changeQuantity > 1) {
            setChangeQuantity((prev) => prev - 1);
        } else {
            toast.warning("Cannot go below 1.");
        }
    };

    useEffect(() => {
        setChangePrice(purchases_price * changeQuantity);
    }, [changeQuantity]);

    return (
        <>
            <tr key={id}>
                <td>{index + 1}</td>
                <td>
                    <Image src={imageUrl} alt={id} width={60} height={60} />
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
                    <p className="pb-2">৳ {purchases_price.toFixed(2)}</p>
                    {purchases_price !== mrp_price && <del>{mrp_price}</del>}
                </td>
                <td>
                    <span className="d-flex gap-1 align-items-center">
                        <button
                            className={`d-flex p-0 align-items-center justify-content-center border-0 add-to-cart-link rounded-circle ${
                                cart_status === 2 ||
                                changePrice >= productCardLimit
                                    ? "disabled-button"
                                    : ""
                            }`}
                            disabled={
                                cart_status === 2 ||
                                changePrice >= productCardLimit
                            }
                            style={{
                                width: "30px",
                                height: "30px",
                            }}
                            onClick={() =>
                                handleIncrementWithLimit(purchase_quantity)
                            }
                        >
                            <FaPlus />
                        </button>
                        <input
                            type="text"
                            value={
                                privilegeCartItem.find(
                                    (cartPro) => cartPro.product_id == id
                                )?.quantity || changeQuantity
                            }
                            readOnly
                            className="border-0 text-center px-2 py-2 bg-transparent fs-5"
                            style={{ width: "60px" }}
                        />
                        <button
                            className={`d-flex p-0 align-items-center justify-content-center border-0 add-to-cart-link rounded-circle ${
                                cart_status === 2 || changeQuantity <= 1
                                    ? "disabled-button"
                                    : ""
                            }`}
                            disabled={cart_status === 2 || changeQuantity <= 1}
                            style={{
                                width: "30px",
                                height: "30px",
                            }}
                            onClick={() => handleDecrement()}
                        >
                            <FaMinus />
                        </button>
                    </span>
                </td>
                <td>
                    {privilegeCartItem.find(
                        (cartPrice) => cartPrice.product_id === id
                    )?.price || ""}
                </td>
                <td>
                    {cart_status === 1 ? (
                        <PrivilegeAddToCard
                            setRendaringCartPrice={setRendaringCartPrice}
                            rendaringCartPrice={rendaringCartPrice}
                            totalAmount={totalAmount}
                            productsData={item}
                            quantity={changeQuantity}
                            isButtonDisable={
                                changePrice + total <= productCardLimit
                            }
                        />
                    ) : (
                        <PrivilegeDeleteCardItem
                            setRendaringCartPrice={setRendaringCartPrice}
                            rendaringCartPrice={rendaringCartPrice}
                            cartId={cart_id}
                        />
                    )}
                </td>
            </tr>
        </>
    );
};

export default PrivilegeCardProductTableBody;
