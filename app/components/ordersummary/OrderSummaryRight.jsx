import Image from "next/image";
import ProductOrderPriceSummary from "./ProductOrderPriceSummary";
import OrderProductItems from "./OrderProductItems";

const OrderSummaryRight = ({ orderProduct, orderSummary }) => {
    return (
        <>
            <div className="col-lg-7">
                <div className="position-relative order-summary-row">
                    <div className="order-summary-area mx-3">
                        <div className="border-bottom order-summary-title">
                            <h2>Order Summary</h2>
                        </div>
                        <div className="order-summary-table-holder">
                            <div className="py-2 border-bottom table-responsive order-summary-table-one">
                                <table className="summary-header">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Invoice No</th>
                                            <th>Payment Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{orderSummary?.date}</td>
                                            <td>{orderSummary?.invoice}</td>
                                            <td className="fs-5">
                                            {orderSummary?.payment_status && (
                                                orderSummary?.payment_status === "Paid" ? (
                                                <span className="badge bg-success-subtle text-success fw-semibold">
                                                    {orderSummary?.payment_status}
                                                </span>
                                                ) : orderSummary?.payment_status === "Unpaid" ? (
                                                <span className="badge bg-danger-subtle text-danger fw-semibold">
                                                    {orderSummary?.payment_status}
                                                </span>
                                                ) : orderSummary?.payment_status === "Partial Paid" ? (
                                                <span className="badge bg-warning-subtle text-warning fw-semibold">
                                                    {orderSummary?.payment_status}
                                                </span>
                                                ) : (
                                                <span className="badge bg-secondary-subtle text-secondary fw-semibold">
                                                    {orderSummary?.payment_status}
                                                </span>
                                                ))}
                                                
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <OrderProductItems orderProduct={orderProduct} />
                        </div>
                        <ProductOrderPriceSummary orderSummary={orderSummary} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderSummaryRight;
