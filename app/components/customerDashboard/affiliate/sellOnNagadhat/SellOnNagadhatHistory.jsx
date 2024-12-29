import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";

const SellOnNagadhatHistory = ({ sellOnData }) => {
    return (
        <div>
            <div className="table-responsive pt-4">
                <table className="table table-responsive-md table-hover" style={{ minWidth:"1000px" }}>
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Package</th>
                            <th>Date</th>
                            <th>Duration (Month)</th>
                            <th>Completed (Month)</th>
                            <th>Order value</th>
                            <th>MRP Value</th>
                            <th>Monthly Return</th>
                            <th>Instalment</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellOnData?.map((item, index) => {
                            return (
                                <tr key={item?.id}>
                                    <td>{index + 1}</td>
                                    <td>{item?.package_invoice || "N/A"}</td>
                                    <td>{item?.start_date || "N/A"}</td>
                                    <td>{item?.duration || "N/A"} </td>
                                    <td>{item?.completed_months || "N/A"}</td>
                                    <td>৳ {item?.order_value || "N/A"} </td>
                                    <td>৳ {item?.mrp_value || "N/A"} </td>
                                    <td>{item?.monthly_bonus.toFixed(2) || "N/A"}</td>
                                    <td>
                                        {item?.is_instalment === 1 ? (
                                            <>
                                                <FaCheckCircle className="text-success" />
                                                Yes
                                            </>
                                        ) : (
                                            <>
                                                <FcCancel className="text-danger" />
                                                No
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {item?.active_status === 0 ? (
                                            <span className="text-primary">
                                                Active
                                            </span>
                                        ) : (
                                            <>
                                                <span className="text-success">
                                                    Completed
                                                </span>
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        <Link
                                            // href="/affiliat-sell-on-nagadhat/id"
                                            href={`/affiliate-buyback-policy-details/${item?.id}`}
                                            className="btn btn-success"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellOnNagadhatHistory;
