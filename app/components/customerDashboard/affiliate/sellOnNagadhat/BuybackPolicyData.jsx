import { FcCancel } from "react-icons/fc";
import { FaCheckCircle } from "react-icons/fa";

const BuybackPolicyData = ({ saleOnDetails }) => {
    return (
        <>
            <div className="row pb-4 px-4">
                <div className="col-md-6">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-bordered border-secondary">
                            <tbody>
                                <tr>
                                    <th>Invoice</th>
                                    <td>{saleOnDetails?.order_invoice}</td>
                                </tr>
                                <tr>
                                    <th>Referance No.</th>
                                    <td>{saleOnDetails?.package_invoice}</td>
                                </tr>
                                <tr>
                                    <th>Duration:</th>
                                    <td>{saleOnDetails?.duration ? `${saleOnDetails?.duration} Month` :0}</td>
                                </tr>
                                <tr>
                                    <th>Completed:</th>
                                    <td>{saleOnDetails?.completed_months ? `${saleOnDetails?.completed_months} Month` : "0 Month"}</td>
                                </tr>
                                <tr>
                                    <th>Remaining:</th>
                                    <td>{saleOnDetails?.remaining_months} Month</td>
                                </tr>
                                <tr>
                                    <th>Date of activation:</th>
                                    <td>{saleOnDetails?.start_date}</td>
                                </tr>
                                <tr>
                                    <th>Date of completion:</th>
                                    <td>{saleOnDetails?.end_date}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-bordered border-secondary">
                            <tbody>
                                <tr>
                                    <th>Status</th>
                                    <td>
                                        {saleOnDetails?.status === 1 ? (
                                            <span className="text-success">
                                                Sell On Nagadhat
                                            </span>
                                        ) : saleOnDetails?.status === 2 ? (
                                            <span className="text-success">
                                                Completed
                                            </span>
                                        ) : saleOnDetails?.status === 3 ? (
                                            <span className="text-info">
                                                Refunded
                                            </span>
                                        ) : (
                                            <span className="text-danger">
                                                Inactive
                                            </span>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Order Value:</th>
                                    <td>৳ {saleOnDetails?.order_value}</td>
                                </tr>
                                <tr>
                                    <th>MRP Value:</th>
                                    <td>৳ {saleOnDetails?.mrp_value}</td>
                                </tr>
                                <tr>
                                    <th>No of Instalment:</th>
                                    <td>
                                        {saleOnDetails?.is_instalment === 1 ? (
                                            <>
                                                <FaCheckCircle className="text-success" />{" "}
                                                Yes
                                            </>
                                        ) : (
                                            <>
                                                <FcCancel className="text-danger" />
                                                After Duration:{" "}
                                                {saleOnDetails?.duration}
                                            </>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Monthly Return:</th>
                                    <td>৳ {saleOnDetails?.monthly_bonus.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <th>Total Returned:</th>
                                    <td>৳ {saleOnDetails?.total_given}</td>
                                </tr>
                                <tr>
                                    <th className="text-success">
                                        Next bonus on:
                                    </th>
                                    <td className="text-success">
                                        {saleOnDetails?.status === 3 ? (
                                            <span className="text-info">
                                                Refunded
                                            </span>
                                        ) : (
                                            <span className="text-success">
                                                {saleOnDetails?.next_bonus_date}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BuybackPolicyData;
