"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { NagadhatPublicUrl, truncateTitle } from "@/app/utils";
import DeletePrivilegeCartProduct from "./DeletePrivilegeCartProduct";
import { addToCartQuantityUpdate } from "@/app/services/addToCartQuantityUpdate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrivilegeCardShoppingTable = ({
    privilegeCartProduct,
    setRendaringPrice,
    rendaringPrice,
    token,
    perCardLimit,
}) => {
    const [disableIncrementFlags, setDisableIncrementFlags] = useState([]);

    const handleProductQtyUpdate = async (cartItem, quantity) => {
        try {
            const quantityUpdateInfo = {
                cart_id: cartItem.cart_id,
                outlet_id: cartItem.outlet_id,
                quantity,
            };
            const response = await addToCartQuantityUpdate(
                quantityUpdateInfo,
                token
            );

            if (response?.code === 200) {
                setRendaringPrice(!rendaringPrice);
            }
        } catch (error) {
            console.error("Error incrementing quantity:", error);
        }
    };

    const totalCartPrice = privilegeCartProduct.reduce((acc, item) => {
        return acc + item?.quantity * item?.purchase_price;
    }, 0);

    useEffect(() => {
        const updatedDisableFlags = privilegeCartProduct.map((item) => {
            const potentialTotal = totalCartPrice + item?.purchase_price;
            return (
                item.quantity >= item.max_quantity ||
                potentialTotal > perCardLimit
            );
        });
        setDisableIncrementFlags(updatedDisableFlags);
    }, [privilegeCartProduct, totalCartPrice, perCardLimit]);

    const handleDisabledButton = (index) => {
        if (disableIncrementFlags[index]) {
            toast.warn(
                "Cannot increase quantity: Max quantity or card limit reached."
            );
        }
    };

    return (
        <div className="table-responsive px-4">
            <table
                className="table table-bordered border-secondary table-hover table-striped"
                style={{ minWidth: "750px" }}
            >
                <thead className="table-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Photo</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total Amount</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {privilegeCartProduct?.map((item, index) => {
                        const imageUrl = item?.product_thumbnail
                            ? `${NagadhatPublicUrl}/${item?.product_thumbnail}`
                            : "/images/dan-cake-chocolate-muffin-30g-24-pieces_550.jpeg";
                        const totalPrice =
                            item?.quantity * item?.purchase_price;

                        const incrementButtonDisabled =
                            disableIncrementFlags[index];
                        const decrementButtonDisabled = item?.quantity === 1;

                        return (
                            <tr key={item?.product_id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Image
                                        src={imageUrl}
                                        alt={item?.product_id}
                                        width={60}
                                        height={60}
                                    />
                                </td>
                                <td>
                                    <p>
                                        {truncateTitle(item?.product_name, 40)}
                                    </p>
                                </td>
                                <td>
                                    <p>৳ {item?.purchase_price}</p>
                                    {item?.purchase_price !==
                                        item?.mrp_price && (
                                        <del>{item?.mrp_price}</del>
                                    )}
                                </td>
                                <td>
                                    <div className="d-flex gap-1 align-items-center justify-content-center">
                                        <button
                                            onClick={() => {
                                                handleProductQtyUpdate(
                                                    item,
                                                    "increment"
                                                );
                                                handleDisabledButton(index);
                                            }}
                                            className="d-flex align-items-center justify-content-center border-0 add-to-cart-link rounded-circle"
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                padding: "0",
                                                opacity: incrementButtonDisabled
                                                    ? 0.5
                                                    : 1, // Adjust opacity when disabled
                                                cursor: incrementButtonDisabled
                                                    ? "not-allowed"
                                                    : "pointer",
                                            }}
                                            disabled={incrementButtonDisabled}
                                        >
                                            <FaPlus />
                                        </button>
                                        <div>
                                            <input
                                                type="text"
                                                value={item?.quantity}
                                                readOnly
                                                className="border-0 text-center px-1 py-1 fs-5 bg-transparent"
                                                style={{ width: "70px" }}
                                            />
                                        </div>
                                        <button
                                            onClick={() => {
                                                handleProductQtyUpdate(
                                                    item,
                                                    "decrement"
                                                );
                                            }}
                                            className="d-flex align-items-center justify-content-center border-0 add-to-cart-link rounded-circle"
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                padding: "0",
                                                opacity: decrementButtonDisabled
                                                    ? 0.5
                                                    : 1, // Adjust opacity when disabled
                                                cursor: decrementButtonDisabled
                                                    ? "not-allowed"
                                                    : "pointer",
                                            }}
                                            disabled={decrementButtonDisabled}
                                        >
                                            <FaMinus />
                                        </button>
                                    </div>
                                </td>
                                <td>৳ {Number(totalPrice).toFixed(2)}</td>
                                <td>
                                    <DeletePrivilegeCartProduct
                                        setRendaringPrice={setRendaringPrice}
                                        rendaringPrice={rendaringPrice}
                                        cartItem={item}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default PrivilegeCardShoppingTable;
