"use client";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { FaDownload, FaRegFaceFrown, FaXmark } from "react-icons/fa6";
import Pagination from "../../productCategory/Pagination";
import { postOrderCancel } from "@/app/services/userdashboard/postOrderCancel";
import { toast } from "react-toastify"; // Import Toastify
import { useEffect, useState } from "react";
import LodingFixed from "../../LodingFixed";
import SaleOnNagadhatModal from "./SaleOnNagadhatModal";

const CustomerRightsids = ({
    customerOrders,
    lastPage,
    currentPage,
    session,
    setOrderCancel,
    orderCancel,
    isPending,
}) => {
    const [cancelStatus, setCancelStatus] = useState(null);
    const [resaleOrderID, setResaleOrderID] = useState({});

    const handleOrderCanceled = async (orderID) => {
        try {
            const token = session?.accessToken;
            if (!token) {
                toast.error("Authorization token is missing.");
                return;
            }
            const response = await postOrderCancel(orderID, token);
            if (response.code === 200 && !response?.error) {
                setOrderCancel(!orderCancel);
                setCancelStatus(response?.message?.status);
                toast.success(response?.message?.message);
            } else {
                console.error("Error response:", response);
                toast.error(
                    response?.message?.message || "Something went wrong"
                );
            }
        } catch (error) {
            console.error("Error occurred while canceling the order:", error);
            toast.error("An error occurred while canceling the order.");
        }
    };
    const serialNumber = (currentPage - 1) * 20;

    return (
        <>
            {isPending && <LodingFixed />}
            <div className="customer-dashboard-order-history-area h-100">
                <div className="customer-dashboard-order-history-title">
                    <h1 className="customer-dashboard-title">Order History</h1>
                </div>
                {customerOrders?.length > 0 ? (
                    <div className="customer-dashboard-order-history table-responsive table-responsive-md h-100">
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th scope="col">Invoice ID</th>
                                    <th
                                        scope="col"
                                        className="d-none d-md-block"
                                    >
                                        Date
                                    </th>
                                    <th scope="col" className="text-end">
                                        Grand Total
                                    </th>
                                    <th scope="col">Order Status</th>
                                    <th scope="col">Payment Status</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customerOrders &&
                                    customerOrders.length > 0 &&
                                    customerOrders.map((orderItem, index) => {
                                        const {
                                            order_id,
                                            invoice_id,
                                            order_date,
                                            order_status,
                                            grand_total,
                                            payment_status,
                                            affiliate_buyback_package_id,
                                        } = orderItem;
                                        return (
                                            <tr key={index}>
                                                <td className="align-middle">
                                                    {index + 1 + serialNumber}
                                                </td>
                                                <td className="align-middle">
                                                    <span>{invoice_id}</span>
                                                    <span className=" d-block d-md-none">{order_date}</span>
                                                </td>
                                                <td className="align-middle d-none d-md-table-cell">
                                                    <span>{order_date}</span>
                                                </td>
                                                <td className="text-end align-middle">
                                                    ৳ {grand_total}
                                                </td>
                                                <td
                                                    className={`align-middle${
                                                        order_status ===
                                                        "Canceled"
                                                            ? "text-danger fw-bolder"
                                                            : ""
                                                    }`}
                                                >
                                                    {order_status ===
                                                        "Processing" &&
                                                    (orderItem?.order_product_type ===
                                                        "2" ||
                                                        orderItem?.order_product_type ===
                                                            "3") ? (
                                                        <div className="dropdown">
                                                            <button
                                                                className="btn text-success dropdown-toggle border border-success py-1 px-2 "
                                                                type="button"
                                                                data-bs-toggle="dropdown"
                                                                aria-expanded="false"
                                                            >
                                                                {order_status ||
                                                                    "Processing"}
                                                            </button>
                                                            <ul className="dropdown-menu shadow sale-on-nagadhat-hover">
                                                                <li>
                                                                    <button
                                                                        type="button"
                                                                        className="dropdown-item"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#sale-on-nagadhat-modal"
                                                                        onClick={() =>
                                                                            setResaleOrderID(
                                                                                {
                                                                                    order_id:
                                                                                        order_id,
                                                                                    buyback_package_id:
                                                                                        affiliate_buyback_package_id,
                                                                                }
                                                                            )
                                                                        }
                                                                    >
                                                                        Sale on
                                                                        Nagadhat
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        className="dropdown-item"
                                                                        href={`/shipping-page-resale/${order_id}`}
                                                                    >
                                                                        Get
                                                                        Product
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    ) : (
                                                        order_status ||
                                                        "Pending"
                                                    )}
                                                </td>

                                                <td
                                                    className={`paid ${
                                                        payment_status ===
                                                        "Under Review"
                                                            ? "text-warning"
                                                            : ""
                                                    } align-middle`}
                                                >
                                                    {(order_status !==
                                                        "Canceled" &&
                                                        payment_status ===
                                                            "Unpaid") ||
                                                    payment_status ===
                                                        "Partial Paid" ? (
                                                        <>
                                                            {payment_status}
                                                            <Link
                                                                href={`/paynow?orderId=${order_id}`}
                                                                className="customer-dashboard-order-history-pay"
                                                            >
                                                                Pay Now
                                                            </Link>
                                                        </>
                                                    ) : (
                                                        payment_status
                                                    )}
                                                </td>

                                                <td className="align-middle">
                                                    <div className="customer-dashboard-order-history-actions">
                                                        <button
                                                            title="Order View"
                                                            className="border-0"
                                                        >
                                                            <Link
                                                                href={`/orderview?orderid=${order_id}`}
                                                                style={{
                                                                    color: "white",
                                                                }}
                                                            >
                                                                <FaEye />
                                                            </Link>
                                                        </button>
                                                        <button title="Order invoice">
                                                            <Link
                                                                href={`/orderinvoice?orderId=${order_id}`}
                                                                style={{
                                                                    color: "white",
                                                                }}
                                                            >
                                                                <FaDownload />
                                                            </Link>
                                                        </button>
                                                        {payment_status ===
                                                            "Unpaid" &&
                                                            order_status ===
                                                                "New Order" && (
                                                                <button
                                                                    title="Order Cancel"
                                                                    onClick={() =>
                                                                        handleOrderCanceled(
                                                                            order_id
                                                                        )
                                                                    }
                                                                >
                                                                    <FaXmark />
                                                                </button>
                                                            )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        <Pagination
                            currentPage={currentPage}
                            lastPage={lastPage}
                        />
                    </div>
                ) : (
                    !isPending && (
                        <div className="d-flex justify-content-center align-items-center flex-column gap-3 p-4">
                            <FaRegFaceFrown className="fs-2" />
                            <p className="fs-5">Nothing Found</p>
                        </div>
                    )
                )}
            </div>

            <SaleOnNagadhatModal resaleOrderID={resaleOrderID} />
        </>
    );
};

export default CustomerRightsids;
