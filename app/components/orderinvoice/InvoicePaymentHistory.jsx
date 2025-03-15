const InvoicePaymentHistory = ({ orderInvoice, orderPaymentHistory }) => {
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <h5 className=" text-capitalize mb-1 py-2">
                        payment history
                    </h5>
                </div>
            </div>
            <div className="row sub-section-margin-t">
                <div className="col-sm-8 invoice-payment-info">
                    <table className="table border rounded">
                        <thead>
                            <tr>
                                <th>#SL</th>
                                <th>Date</th>
                                <th>Method</th>
                                <th>Note</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody className="border-top-2">
                            {orderPaymentHistory?.payment_history?.length >
                            0 ? (
                                orderPaymentHistory?.payment_history.map(
                                    (item) => {
                                        const {
                                            id,
                                            bank_name,
                                            date,
                                            payment_getway,
                                            payment_method,
                                            transaction_amount,
                                            transaction_id,
                                        } = item;
                                        return (
                                            <tr key={id}>
                                                <td>{date ? date : null}</td>
                                                <td>
                                                    {payment_getway
                                                        ? payment_getway
                                                        : null}
                                                </td>
                                                <td>
                                                    {payment_method
                                                        ? payment_method
                                                        : null}
                                                </td>
                                                <td>
                                                    {bank_name
                                                        ? bank_name
                                                        : null}
                                                </td>
                                                <td>
                                                    {transaction_id
                                                        ? transaction_id
                                                        : null}
                                                </td>
                                                <td>
                                                    {transaction_amount
                                                        ? transaction_amount
                                                        : null}
                                                </td>
                                            </tr>
                                        );
                                    }
                                )
                            ) : (
                                <tr>
                                    <td>
                                        <h6>No Data Found</h6>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-4 invoice-pay-info">
                    <div className="border rounded">
                        <div className="d-flex justify-content-between align-items-center border-bottom px-3 py-2">
                            <p className="text-black">Sub Total</p>
                            {orderInvoice?.sub_total > 0 && (
                                <p className="text-black">
                                    ৳ {orderInvoice?.sub_total}
                                </p>
                            )}
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-bottom px-3 py-2">
                            <p className="text-black">Discount</p>
                                <p className="text-black">
                                    - ৳ {orderInvoice?.discount_amount || "0"}
                                </p>
                        </div>

                        <div className="d-flex justify-content-between align-items-center px-3 pt-2">
                            <p className="text-black">
                                <strong>Total</strong>
                            </p>
                            {orderInvoice?.total_products_price > 0 && (
                                <p className="text-black">
                                    <strong>
                                        ৳ {orderInvoice?.total_products_price}
                                    </strong>
                                </p>
                            )}
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-bottom px-3 py-2">
                            <p className="text-black">Shipping Charge</p>
                            {orderInvoice?.total_delivery_charge > 0 && (
                                <p className="text-black">
                                    ৳ {orderInvoice?.total_delivery_charge}
                                </p>
                            )}
                        </div>
                        <div className="d-flex justify-content-between align-items-center px-3 pt-2">
                            <p className="text-black">
                                <strong>Grand Total</strong>
                            </p>
                            {orderInvoice?.grand_total > 0 && (
                                <p className="text-black">
                                    <strong>
                                        ৳ {orderInvoice?.grand_total}
                                    </strong>
                                </p>
                            )}
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-bottom px-3 pt-2 pb-1">
                            <p className="text-black">Paid</p>
                            <p className="text-black">
                                ৳ {orderPaymentHistory?.total_paid}
                            </p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center px-3 py-2">
                            <p className="text-danger">
                                <strong>Due</strong>
                            </p>
                            <p className="text-danger">
                                <strong>
                                    ৳{" "}
                                    {orderInvoice?.grand_total -
                                        orderPaymentHistory?.total_paid}
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InvoicePaymentHistory;
