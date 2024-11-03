"use client";
import { fetchCartProducts } from "@/app/services/getShowAddToCartProduct";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

const PrivilegeCardProductSummary = ({ rendaringCartPrice }) => {
    const [isPending, startTransition] = useTransition();
    const [privilegeCartProduct, setPrivilegeCartProduct] = useState([]);
    const [subTotal, setSubTotal] = useState(0);

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
                        const response = await fetchCartProducts(
                            session.accessToken,
                            outletId,
                            districtId
                        );
                        setPrivilegeCartProduct(response?.data);
                        const subTotalInfo = response?.data.reduce(
                            (acc, current) =>
                                acc + (Number(current.regular_price) || 0),
                            0
                        );
                        setSubTotal(subTotalInfo);
                    } catch (err) {
                        console.error("Error fetching cart products:", err);
                    }
                });
            }
        };
        fetchPrivilegeCartProducts();
    }, [session?.accessToken, outletId, districtId, rendaringCartPrice]);

    const totalDiscount = 0;
    const deliveryCharge = 0;

    const formatCurrency = (value) => {
        const numValue = Number(value);
        return !isNaN(numValue) ? numValue.toFixed(2) : "0.00";
    };

    return (
        <div className="row justify-content-end px-4 pt-2 pb-4">
            <div className="col-md-5 col-sm-12">
                <ul className="table-bordered pb-4">
                    <li className="fs-6 pb-2 d-flex align-items-center justify-content-between">
                        <span>Sub Total Amount:</span>
                        <strong>৳ {formatCurrency(subTotal)}</strong>
                    </li>
                    <li className="fs-6 pb-2 d-flex align-items-center justify-content-between">
                        <span>Total Discount:</span>
                        <strong>৳ {formatCurrency(totalDiscount)}</strong>
                    </li>
                    <li className="fs-6 pb-2 d-flex align-items-center justify-content-between">
                        <span>Delivery Charge:</span>
                        <strong>৳ {formatCurrency(deliveryCharge)}</strong>
                    </li>
                    <li className="fs-6 pb-2 d-flex align-items-center justify-content-between">
                        <span>Net Total:</span>
                        <strong>৳ {formatCurrency(subTotal)}</strong>
                    </li>
                </ul>
                <div className="d-flex align-items-center justify-content-end gap-3">
                    <Link href="/checkout" className="btn btn-primary">
                        Proceed to Checkout
                    </Link>
                    <Link
                        href="/privilege-card-shopping-list"
                        className="btn btn-secondary"
                    >
                        View Cart
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PrivilegeCardProductSummary;
