import React from 'react'

const ShippingOrderSection= ({
    subTotal,
    totalPrice,
    handlePlaceOrder,
    isTermsChecked,
    setIsTermsChecked,
    customerAddress,
    cartProduct,
    shippingPrice,
    loading
}) => {
    return (
        <>
            <div className="row order-section">
                <div className="col-12">
                    <div className="order-info-area">
                        <div className="shipping-section-subtitle">
                            <h3>Shopping Summary</h3>
                        </div>

                        <div className="d-flex gap-2 flex-column border-bottom pb-3">
                            <div className="d-flex gap-3 justify-content-between shopping-price-area custom-shopping-price">
                                <p>Subtotal</p>
                                <strong>৳ {subTotal}</strong>
                            </div>
                            <div className="d-flex gap-3 justify-content-between shopping-price-area custom-shopping-price">
                                <p>Discount</p>
                                <strong>৳ { (subTotal - totalPrice).toFixed(2)}</strong>
                            </div>
                            <div className="d-flex gap-2 flex-column border-top pt-3">
                                <div className="d-flex gap-3 justify-content-between align-items-center shopping-price-area custom-shopping-price">
                                    <strong>Total</strong>
                                    <p className="total-order-price">৳ {totalPrice}</p>
                                </div>
                            </div>
                            <div className="d-flex gap-3 justify-content-between shopping-price-area custom-shopping-price">
                                <p>Shipping</p>
                                <div className="d-flex gap-2 align-items-center">
                                    <strong>৳ {shippingPrice || 0}</strong>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex gap-2 flex-column border-bottom pb-3">
                            <div className="d-flex gap-3 justify-content-between align-items-center shopping-price-area custom-shopping-price">
                                <strong>Grand Total</strong>
                                <p className="total-order-price">৳ {totalPrice + parseInt(shippingPrice || 0)}</p>
                            </div>
                        </div>

                        <div className="form-check cart-product-terms-condition">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="terms-condition"
                                onChange={() => setIsTermsChecked(!isTermsChecked)}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="terms-condition"
                            >
                                I agree to the terms and conditions.
                            </label>
                        </div>

                        <div className="place-order-btn">
                            <button
                                onClick={handlePlaceOrder}
                                className="add-to-cart-link border border-0 w-100"
                                disabled={loading && !isTermsChecked && !customerAddress?.length > 0 && !cartProduct?.length > 0}
                                style={{
                                    pointerEvents:
                                        customerAddress?.length > 0 &&
                                            cartProduct?.length > 0 &&
                                            isTermsChecked && !loading
                                            ? "auto"
                                            : "none",
                                    opacity:
                                        customerAddress?.length > 0 &&
                                            cartProduct?.length > 0 &&
                                            isTermsChecked && !loading
                                            ? 1
                                            : 0.5,
                                }}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShippingOrderSection;
