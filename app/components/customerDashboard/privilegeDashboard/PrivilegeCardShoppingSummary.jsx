"use client";
import Link from "next/link";
import { useMemo } from "react";

const PrivilegeCardShoppingSummary = ({ privilegeCartItem }) => {
    const netPrice = useMemo(
        () => privilegeCartItem.reduce((acc, item) => acc + item.price, 0),
        [privilegeCartItem]
    );

    const totalDiscount = useMemo(
        () =>
            privilegeCartItem.reduce(
                (acc, item) => acc + parseFloat(item.discountPrice),
                0
            ),
        [privilegeCartItem]
    );

    const deliveryCharge = 0;
    const subTotal = netPrice + totalDiscount + deliveryCharge;
    return (
        <>
            <div className="row justify-content-end px-4 pt-2 pb-4 ">
                <div className="col-md-5 col-sm-12">
                    <ul className="table-bordered pb-4">
                        <li className=" fs-6 pb-2 d-flex align-items-center justify-content-between">
                            <span>Sub Total Amount:</span>{" "}
                            <strong>৳ {subTotal.toFixed(2)}</strong>
                        </li>
                        <li className=" fs-6 pb-2 d-flex align-items-center justify-content-between">
                            <span>Total Discount:</span>
                            <strong>৳ {totalDiscount.toFixed(2)}</strong>
                        </li>
                        <li className=" fs-6 pb-2 d-flex align-items-center justify-content-between">
                            <span>Delivery Charge:</span>
                            <strong>৳ {deliveryCharge.toFixed(2)}</strong>
                        </li>
                        <li className=" fs-6 pb-2 d-flex align-items-center justify-content-between">
                            <span>Net Total Amount:</span>{" "}
                            <strong>৳ {netPrice.toFixed(2)}</strong>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center justify-content-end gap-3">
                        <Link
                            className="border-0 add-to-cart-link"
                            href="/privilege-card-dashboard"
                        >
                            Back
                        </Link>
                        <Link className="border-0 add-to-cart-link" href="#">
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivilegeCardShoppingSummary;
