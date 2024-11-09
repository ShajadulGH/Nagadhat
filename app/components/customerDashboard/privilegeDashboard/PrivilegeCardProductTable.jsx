"use client";

import PrivilegeCardProductSummary from "./PrivilegeCardProductSummary";
import PrivilegeProductDetailModal from "./PrivilegeProductDetailModal";
import { useEffect, useState, useTransition } from "react";
import PrivilegeCardProductTableHead from "./PrivilegeCardProductTableHead";
import PrivilegeCardProductTableBody from "./PrivilegeCardProductTableBody";
import { useSession } from "next-auth/react";
import { getPrivilegeAddToCartProducts } from "@/app/services/privilegeCard/getPrivilegeAddToCartProducts";

// const DEFAULT_QUANTITY = 1;

const PrivilegeCardProductTable = ({
    productsData,
    setRendaringCartPrice,
    rendaringCartPrice,
    productCardLimit,
}) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showingProModal, setShowingProModal] = useState(false);
    const [privilegeCartItem, setPrivilegeCartItem] = useState([]);
    const [isPending, startTransition] = useTransition();
    const { data: session } = useSession();

    // Fetching outlet and district IDs from local storage
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

    // Fetch cart products based on session token and IDs
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
                            session?.accessToken,
                            params
                        );
                        setPrivilegeCartItem(response?.results || []);
                    });
                } catch (error) {
                    console.error("Error fetching cart products:", error);
                    toast.error("Failed to fetch cart products.");
                }
            }
        };
        fetchPrivilegeCartProducts();
    }, [session?.accessToken, outletId, districtId, rendaringCartPrice]);

    return (
        <>
            <div className="table-responsive px-4">
                <table
                    className="table table-bordered border-secondary table-hover table-striped"
                    style={{ minWidth: "750px" }}
                >
                    <PrivilegeCardProductTableHead />

                    <tbody>
                        {productsData?.length > 0 ? (
                            productsData.map((item, index) => (
                                <PrivilegeCardProductTableBody
                                    key={index}
                                    setRendaringCartPrice={
                                        setRendaringCartPrice
                                    }
                                    rendaringCartPrice={rendaringCartPrice}
                                    productCardLimit={productCardLimit}
                                    item={item}
                                    index={index}
                                    privilegeCartItem={privilegeCartItem}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="100%">No products available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="p-4">pagination...</div>

            <PrivilegeCardProductSummary
                rendaringCartPrice={rendaringCartPrice}
                privilegeCartItem={privilegeCartItem}
                token={session.accessToken}
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
