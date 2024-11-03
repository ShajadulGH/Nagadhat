const ProductOrderPriceSummary = ({ orderSummary }) => {
    return (
        <>
            <div className="user-product-order-price-summary">
                <div className="order-summary-price">
                    <div className="d-flex gap-3 justify-content-between">
                        <p>Sub Total</p>
                        {orderSummary?.sub_total && (
                            <strong>
                                ৳{" "}
                                {orderSummary?.sub_total
                                    ? orderSummary?.sub_total
                                    : null}
                            </strong>
                        )}
                    </div>
                    <div className="d-flex gap-3 justify-content-between">
                        <p>Discount</p>
                        {orderSummary?.discount_amount > 0 && (
                            <strong>
                                ৳{" "}
                                {orderSummary?.discount_amount
                                    ? orderSummary?.discount_amount
                                    : null}
                            </strong>
                        )}
                    </div>
                </div>
                <div className="d-flex gap-3 justify-content-between pt-3">
                    <p>Total</p>
                    <strong>
                        ৳{" "}
                        {orderSummary?.sub_total - orderSummary?.discount_amount}
                    </strong>
                </div>
                <div className="d-flex gap-3 justify-content-between">
                    <p>Shipping Charge</p>
                    {orderSummary?.total_delivery_charge && (
                        <strong>
                            ৳{" "}
                            {orderSummary?.total_delivery_charge
                                ? orderSummary?.total_delivery_charge
                                : null}
                        </strong>
                    )}
                </div>
                <div className="shopping-price-area">
                    <div className="d-flex gap-3 justify-content-between align-items-center">
                        <strong>Grand Total</strong>
                        {orderSummary?.grand_total && (
                            <p className="total-order-price">
                                ৳{" "}
                                {orderSummary?.grand_total
                                    ? orderSummary?.grand_total
                                    : null}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductOrderPriceSummary;
