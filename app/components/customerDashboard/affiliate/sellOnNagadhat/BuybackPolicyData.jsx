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
                                    <td>Invoice</td>
                                    <td>{saleOnDetails?.order_invoice}</td>
                                </tr>
                                <tr>
                                    <td>Referance No.</td>
                                    <td>{saleOnDetails?.package_invoice}</td>
                                </tr>
                                <tr>
                                    <td>Duration:</td>
                                    <td>{saleOnDetails?.duration}</td>
                                </tr>
                                <tr>
                                    <td>Completed:</td>
                                    <td>{saleOnDetails?.completed_months}</td>
                                </tr>
                                <tr>
                                    <td>Remaining:</td>
                                    <td>{saleOnDetails?.remaining_months}</td>
                                </tr>
                                <tr>
                                    <td>Date of activation:</td>
                                    <td>{saleOnDetails?.start_date}</td>
                                </tr>
                                <tr>
                                    <td>Date of completion:</td>
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
                                    <td>Status</td>
                                    <td className="text-success">
                                        {saleOnDetails?.status === 0
                                            ? "Active"
                                            : "Completed"}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Order Value:</td>
                                    <td>৳ {saleOnDetails?.order_value}</td>
                                </tr>
                                <tr>
                                    <td>MRP Value:</td>
                                    <td>৳ {saleOnDetails?.mrp_value}</td>
                                </tr>
                                <tr>
                                    <td>Instalment:</td>
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
                                    <td>Monthly Return:</td>
                                    <td>৳ {saleOnDetails?.monthly_bonus}</td>
                                </tr>
                                <tr>
                                    <td>Total Returned:</td>
                                    <td>৳ {saleOnDetails?.total_given}</td>
                                </tr>
                                <tr>
                                    <td className="text-success">
                                        Next bonus on:
                                    </td>
                                    <td className="text-success">
                                        {saleOnDetails?.next_bonus_date}
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
