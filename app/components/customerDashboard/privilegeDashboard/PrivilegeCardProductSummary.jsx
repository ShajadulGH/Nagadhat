"use client";
import { getPrivilegeAddToCartProducts } from "@/app/services/privilegeCard/getPrivilegeAddToCartProducts";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

const PrivilegeCardProductSummary = ({ rendaringCartPrice }) => {
    const [isPending, startTransition] = useTransition();
    const [privilegeCartProduct, setPrivilegeCartProduct] = useState([]);

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
                        // const subTotalInfo = response?.results.reduce(
                        //     (acc, current) =>
                        //         acc + (Number(current.price) || 0),
                        //     0
                        // );

                        // setSubTotal(subTotalInfo);

                        // Calculate totalDiscount (sum of mrp - price)
                        // const totalDiscountInfo = response?.results.reduce(
                        //     (acc, current) =>
                        //         acc +
                        //         ((Number(current.mrp_price) || 0) -
                        //             (Number(current.price) || 0)),
                        //     0
                        // );

                        setTotalDiscount(totalDiscountInfo);
                    } catch (err) {
                        console.error("Error fetching cart products:", err);
                    }
                });
            }
        };
        fetchPrivilegeCartProducts();
    }, [session?.accessToken, outletId, districtId, rendaringCartPrice]);

    return (
        <div className="row justify-content-end px-4 pt-2 pb-4">
            <div className="col-md-5 col-sm-12">
                <ul className="table-bordered pb-4">
                    <li className="fs-6 pb-2 d-flex align-items-center justify-content-between">
                        <span>Sub Total Amount:</span>
                        <strong>৳ subTotal</strong>
                    </li>
                    <li className="fs-6 pb-2 d-flex align-items-center justify-content-between">
                        <span>Total Discount:</span>
                        <strong>৳ totalDiscount</strong>
                    </li>
                    <li className="fs-6 pb-2 d-flex align-items-center justify-content-between">
                        <span>Delivery Charge:</span>
                        <strong>৳ deliveryCharge</strong>
                    </li>
                    <li className="fs-6 pb-2 d-flex align-items-center justify-content-between">
                        <span>Net Total:</span>
                        <strong>৳ netPrice</strong>
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
