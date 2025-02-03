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
                                            <td>
                                                {orderSummary?.payment_status}
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
