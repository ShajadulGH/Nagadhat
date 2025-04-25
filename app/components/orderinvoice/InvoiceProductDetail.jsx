import { NagadhatPublicUrl } from "@/app/utils";
import moment from "moment";

const InvoiceProductDetail = ({ invoiceProduct, orderInvoice }) => {
    return (
        <>
            <div className="invoice-info-continar customer-info d-flex justify-content-between sub-section-margin-t">
                <div className="customer-infossss">
                    <p className="pb-1 font-sm width-80">
                        <span className="fw-bold">Name: </span>
                        {orderInvoice?.customer_name}
                    </p>
                    <p className="pb-1 font-sm width-80">
                        <span className="fw-bold">Phone: </span>
                        {orderInvoice?.customer_phone}
                    </p>
                    <p className="pb-1 font-sm width-80 fw-bold">
                        Shipping Address:{" "}
                        <span className="border-bottom-dotted">
                            {orderInvoice?.shipping_address}
                        </span>
                    </p>
                </div>
                <div className="invoice-info">
                    <div className="d-flex justify-content-end">
                        <div className="customer-info-inner d-flex flex-column">
                            <p className="fw-semibold font-sm">Invoice:</p>
                            <div className="d-flex align-items-center gap-2 font-sm mb-1">
                                <div className="bg-secondary-color rounded-circle invoice-list-doted-h"></div>
                                <p>Invoice No: {orderInvoice?.invoice}</p>
                            </div>
                            <div className="d-flex align-items-center gap-2 font-sm mb-1">
                                <div className="bg-secondary-color rounded-circle invoice-list-doted-h"></div>
                                <p>Date: {moment(orderInvoice?.date).format('lll')}</p>
                            </div>
                            <div className="d-flex align-items-center gap-2 font-sm mb-1">
                                <div className="bg-secondary-color rounded-circle invoice-list-doted-h"></div>
                                <div className="d-flex justify-content-between gap-2">
                                    <p>Payment Status:</p>
                                    <p className="text-white bg-secondary-color text-center rounded payment-status-w">
                                        {orderInvoice?.payment_status}
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-2 font-sm mb-1 w-100">
                                <div className="bg-secondary-color rounded-circle invoice-list-doted-h"></div>
                                <div className="d-flex justify-content-between gap-2">
                                    <p>Order Status:</p>
                                    <p className="text-white bg-secondary-color text-center rounded payment-status-w">
                                        {orderInvoice?.order_status}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sub-section-margin-t invoice-product-table">
                <table className="table border">
                    <thead>
                        <tr>
                            <th className="bg-lite-dark">#SL</th>
                            <th className="bg-lite-dark">Image</th>
                            <th className="bg-lite-dark">Product Name</th>
                            <th className="bg-lite-dark">Qty</th>
                            {/* <th className="bg-lite-dark">Discount</th> */}
                            <th className="bg-lite-dark">Price</th>
                            <th className="bg-lite-dark">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceProduct &&
                            invoiceProduct.length > 0 &&
                            invoiceProduct.map((productItem, index) => {
                                const imageUrl = `${NagadhatPublicUrl}/${productItem?.product_thumbnail}`;
                                const {
                                    product_id,
                                    product_name,
                                    quantity,
                                    unit_price,
                                    product_discount,
                                    discount_type,
                                    regular_price
                                } = productItem;
                                return (
                                    <tr key={product_id}>
                                        <td>{index + 1}</td>
                                        <td className="product-img-h">
                                            <div className="">
                                                <img
                                                    className="img-fluid"
                                                    src={
                                                        imageUrl
                                                            ? imageUrl
                                                            : null
                                                    }
                                                    alt={
                                                        product_name
                                                            ? product_name
                                                            : "product image"
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td className="lh-1">{product_name}</td>
                                        <td>{quantity}</td>
                                        {/* <td>
                                            {product_discount !== null && (
                                                <>
                                                    {discount_type === "Flat"
                                                        ? "৳"
                                                        : "%"}{" "}
                                                    {product_discount}
                                                </>
                                            )}
                                        </td> */}
                                        <td>{regular_price}</td>
                                        <td>{quantity * regular_price}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default InvoiceProductDetail;
