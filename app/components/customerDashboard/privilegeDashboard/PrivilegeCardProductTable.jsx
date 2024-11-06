"use client";

import PrivilegeCardProductSummary from "./PrivilegeCardProductSummary";
import PrivilegeProductDetailModal from "./PrivilegeProductDetailModal";
import { useState } from "react";
import PrivilegeCardProductTableHead from "./PrivilegeCardProductTableHead";
import PrivilegeCardProductTableBody from "./PrivilegeCardProductTableBody";

const DEFAULT_QUANTITY = 1;

const PrivilegeCardProductTable = ({
    productsData,
    setRendaringCartPrice,
    rendaringCartPrice,
    productCardLimit,
}) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showingProModal, setShowingProModal] = useState(false);

    return (
        <>
            <div className="table-responsive px-4">
                <table
                    className="table table-bordered border-secondary table-hover table-striped"
                    style={{ minWidth: "750px" }}
                >
                    <PrivilegeCardProductTableHead />
                    <PrivilegeCardProductTableBody
                        productsData={productsData}
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
