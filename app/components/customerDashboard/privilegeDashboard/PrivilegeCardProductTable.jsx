"use client";

import PrivilegeCardProductSummary from "./PrivilegeCardProductSummary";
import PrivilegeProductDetailModal from "./PrivilegeProductDetailModal";
import { useState } from "react";
import PrivilegeCardProductTableHead from "./PrivilegeCardProductTableHead";
import PrivilegeCardProductTableBody from "./PrivilegeCardProductTableBody";

const DEFAULT_QUANTITY = 1;

const PrivilegeCardProductTable = ({
    productsData = [],
    showPriceAddCart,
    handleSetShowPrice,
    setRendaringCartPrice,
    rendaringCartPrice,
    productCardLimit,
}) => {
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
                    <PrivilegeCardProductTableBody
                        handleDecrement={handleDecrement}
                        handleIncrement={handleIncrement}
                        handleProductClick={handleProductClick}
                        quantities={quantities}
                        productsData={productsData}
                        DEFAULT_QUANTITY={DEFAULT_QUANTITY}
                        showPriceAddCart={showPriceAddCart}
                        handleSetShowPrice={handleSetShowPrice}
                        setRendaringCartPrice={setRendaringCartPrice}
                        rendaringCartPrice={rendaringCartPrice}
                        productCardLimit={productCardLimit}
                    />
                </table>
            </div>
            <div className="p-4">pagination...</div>

            <PrivilegeCardProductSummary
                rendaringCartPrice={rendaringCartPrice}
            />
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
