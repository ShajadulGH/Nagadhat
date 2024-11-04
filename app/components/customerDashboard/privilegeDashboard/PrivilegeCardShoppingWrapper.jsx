"use client";
import { useEffect, useState, useTransition } from "react";
import PrivilegeCardShoppingSummary from "./PrivilegeCardShoppingSummary";
import PrivilegeCardShoppingTable from "./PrivilegeCardShoppingTable";
import { useSession } from "next-auth/react";
import { getPrivilegeAddToCartProducts } from "@/app/services/privilegeCard/getPrivilegeAddToCartProducts";
import DefaultLoader from "../../defaultloader/DefaultLoader";
import NoDataFound from "../../NoDataFound";

const PrivilegeCardShoppingWrapper = () => {
    const [isPending, startTransition] = useTransition();
    const [privilegeCartProduct, setPrivilegeCartProduct] = useState([]);
    const [rendaringPrice, setRendaringPrice] = useState(false);
    const [subTotal, setSubTotal] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);

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

                        // Calculate subTotal
                        const subTotalInfo = response?.results.reduce(
                            (acc, current) =>
                                acc + (Number(current.price) || 0),
                            0
                        );
                        setSubTotal(subTotalInfo);

                        // Calculate totalDiscount (sum of mrp - price)
                        const totalDiscountInfo = response?.results.reduce(
                            (acc, current) =>
                                acc +
                                ((Number(current.mrp_price) || 0) -
                                    (Number(current.price) || 0)),
                            0
                        );
                        setTotalDiscount(totalDiscountInfo);
                    } catch (err) {
                        console.error("Error fetching cart products:", err);
                    }
                });
            }
        };
        fetchPrivilegeCartProducts();
    }, [session?.accessToken, outletId, districtId, rendaringPrice]);

    const deliveryCharge = 0;
    let netPrice = subTotal - totalDiscount + deliveryCharge;
    const formatCurrency = (value) => {
        const numValue = Number(value);
        return !isNaN(numValue) ? numValue.toFixed(2) : "0.00";
    };
    return (
        <>
            <div className="customer-dashboard-order-history-area pt-4">
                <h4 className="text-center mb-3">Selected Products</h4>
                {isPending ? (
                    <DefaultLoader />
                ) : privilegeCartProduct?.length > 0 ? (
                    <PrivilegeCardShoppingTable
                        privilegeCartProduct={privilegeCartProduct}
                        setRendaringPrice={setRendaringPrice}
                        rendaringPrice={rendaringPrice}
                    />
                ) : (
                    <NoDataFound />
                )}

                <PrivilegeCardShoppingSummary
                    deliveryCharge={deliveryCharge}
                    subTotal={subTotal}
                    netPrice={netPrice}
                    formatCurrency={formatCurrency}
                />
            </div>
        </>
    );
};

export default PrivilegeCardShoppingWrapper;
