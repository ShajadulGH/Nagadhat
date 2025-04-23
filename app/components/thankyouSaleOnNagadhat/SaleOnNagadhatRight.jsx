import { truncateTitle } from "@/app/utils";
import { log } from "console";

const SaleOnNagadhatRight = ({ responseData }) => {
    return (
        <div className="col-lg-7">
            <div className="position-relative order-summary-row">
                <div
                    className="order-summary-area mx-3 "
                    style={{ paddingLeft: "15px", paddingRight: "15px" }}
                >
                    <div className="border-bottom order-summary-title">
                        <h2>Sale On Nagadhat Info</h2>
                    </div>
                    <div className="order-summary-table-holder">
                        <div className="pt-3 border-bottom table-responsive order-summary-table-one">
                            <div className="" style={{ minWidth: "460px" }}>
                                <div className="table-responsive">
                                    <table className="table table-bordered thnks-sale-on-nagadhat">
                                        <thead>
                                            <tr>
                                                <th>Invoice</th>
                                                <th>Reference No</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{responseData?.order_invoice}</td>
                                                <td>{responseData?.package_invoice}</td>
                                                <td>
                                                    {responseData?.status === 0 ? "Active" : "Sell On Nagadhat"}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Duration</th>
                                            </tr>
                                            <tr>
                                                <td>{responseData?.end_date}</td>
                                                <td>{responseData?.start_date}</td>
                                                <td>{responseData?.duration} Month</td>
                                            </tr>
                                            <tr>
                                                <th>Product</th>
                                                <th>Trade Price</th>
                                                <th>Mrp Price</th>
                                            </tr>
                                            <tr>
                                                <td>{truncateTitle(responseData?.product?.product_name,30)}</td>
                                                <td>৳ {responseData?.order_value}</td>
                                                <td>৳ {responseData?.mrp_value}</td>
                                            </tr>
                                            <tr>
                                                <th>No of Instalment</th>
                                                <th>Approx (monthly sale) Amount</th>
                                                <th>Quantity</th>
                                            </tr>
                                            <tr>
                                                <td>{responseData?.duration} Time</td>
                                                <td>৳{" "}{responseData?.monthly_bonus.toFixed(2)}</td>
                                                <td>{responseData?.quantity}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaleOnNagadhatRight;
