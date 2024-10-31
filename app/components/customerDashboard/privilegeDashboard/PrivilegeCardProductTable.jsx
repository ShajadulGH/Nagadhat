"use client";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa6";
import PrivilegeCardProductSummary from "./PrivilegeCardProductSummary";
import PrivilegeProductDetailModal from "./PrivilegeProductDetailModal";
import NoDataFound from "../../NoDataFound";
import { NagadhatPublicUrl, truncateTitle } from "@/app/utils";
import { useState } from "react";
import PrivilegeCardProductTableHead from "./PrivilegeCardProductTableHead";

const DEFAULT_QUANTITY = 1;

const PrivilegeCardProductTable = ({ productsData = [] }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showingProModal, setShowingProModal] = useState(false);
    const [quantities, setQuantities] = useState(
        productsData.reduce((acc, item) => {
            acc[item.id] = item.purchase_quantity || DEFAULT_QUANTITY;
            return acc;
        }, {})
    );

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setShowingProModal(true);
    };

    const handleIncrement = (productId, maxQuantity) => {
        setQuantities((prev) => ({
            ...prev,
            [productId]: Math.min(
                maxQuantity,
                (prev[productId] || DEFAULT_QUANTITY) + 1
            ),
        }));
    };

    const handleDecrement = (productId) => {
        setQuantities((prev) => ({
            ...prev,
            [productId]: Math.max(
                DEFAULT_QUANTITY,
                (prev[productId] || DEFAULT_QUANTITY) - 1
            ),
        }));
    };

    return (
        <>
            <div className="table-responsive px-4">
                <table
                    className="table table-bordered border-secondary table-hover table-striped"
                    style={{ minWidth: "750px" }}
                >
                    <PrivilegeCardProductTableHead />
                    <tbody>
                        {productsData.length > 0 ? (
                            productsData.map((item, index) => {
                                const {
                                    product_thumbnail,
                                    product_name,
                                    purchases_price,
                                    purchase_quantity,
                                    id,
                                } = item;
                                const quantity =
                                    quantities[id] || DEFAULT_QUANTITY; // Use id for quantity
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
                                                onClick={() =>
                                                    handleProductClick(item)
                                                }
                                            >
                                                {truncateTitle(
                                                    product_name,
                                                    40
                                                )}
                                            </button>
                                        </td>
                                        <td>
                                            ৳{" "}
                                            {parseFloat(
                                                purchases_price
                                            ).toFixed(2)}
                                        </td>
                                        <td>
                                            <div className="d-flex gap-1 align-items-center">
                                                <button
                                                    className={`d-flex p-0 align-items-center justify-content-center border-0 add-to-cart-link rounded-circle `}
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
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        cursor:
                                                            quantity <= 1
                                                                ? "not-allowed"
                                                                : "pointer",
                                                    }}
                                                    onClick={() =>
                                                        handleDecrement(id)
                                                    }
                                                >
                                                    <FaMinus />
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            ৳{" "}
                                            {parseFloat(totalAmount).toFixed(2)}
                                        </td>
                                        <td>
                                            <button className="border-0 add-to-cart-link rounded-2">
                                                Add
                                            </button>
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
                </table>
            </div>
            <div className="p-4">pagination...</div>

            <PrivilegeCardProductSummary />
            {showingProModal && (
                <PrivilegeProductDetailModal
                    productInfo={selectedProduct}
                    onClose={() => {
                        setShowingProModal(false);
                        setSelectedProduct(null);
                    }}
                />
            )}
        </>
    );
};

export default PrivilegeCardProductTable;
