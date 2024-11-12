"use client";
import { useEffect, useState, useTransition } from "react";
import PrivilegeCardShoppingSummary from "./PrivilegeCardShoppingSummary";
import PrivilegeCardShoppingTable from "./PrivilegeCardShoppingTable";
import { useSession } from "next-auth/react";
import { getPrivilegeAddToCartProducts } from "@/app/services/privilegeCard/getPrivilegeAddToCartProducts";
import NoDataFound from "../../NoDataFound";
import LodingFixed from "../../LodingFixed";

const PrivilegeCardShoppingWrapper = ({ perCardLimit }) => {
    const [isPending, startTransition] = useTransition();
    const [privilegeCartProduct, setPrivilegeCartProduct] = useState([]);
    const [rendaringPrice, setRendaringPrice] = useState(false);

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
                        setPrivilegeCartProduct(response?.results);
                    } catch (err) {
                        console.error("Error fetching cart products:", err);
                    }
                });
            }
        };
        fetchPrivilegeCartProducts();
    }, [session?.accessToken, outletId, districtId, rendaringPrice]);

    return (
        <>
            <div className="customer-dashboard-order-history-area pt-4">
                {isPending && <LodingFixed />}
                <h4 className="text-center mb-3">Selected Products</h4>
                {privilegeCartProduct?.length > 0 ? (
                    <PrivilegeCardShoppingTable
                        privilegeCartProduct={privilegeCartProduct}
                        setRendaringPrice={setRendaringPrice}
                        rendaringPrice={rendaringPrice}
                        perCardLimit={perCardLimit}
                        token={session?.accessToken}
                    />
                ) : (
                    <NoDataFound />
                )}

                <PrivilegeCardShoppingSummary
                    privilegeCartItem={privilegeCartProduct}
                    token={session?.accessToken}
                />
            </div>
        </>
    );
};

export default PrivilegeCardShoppingWrapper;
