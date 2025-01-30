import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";

const SellOnNagadhatHistory = ({ sellOnData = [] }) => {
    // Calculate sums using reduce
    const totals = sellOnData.reduce(
        (acc, item) => {
            acc.totalOrderValue += item?.order_value || 0;
            acc.totalMrpValue += item?.mrp_value || 0;
            acc.totalMonthlyBonus += item?.monthly_bonus || 0;
            return acc;
        },
        { totalOrderValue: 0, totalMrpValue: 0, totalMonthlyBonus: 0 }
    );

    return (
        <div>
            <div className="table-responsive pt-4">
                <table className="table table-hover" style={{ minWidth: "1000px" }}>
                    <thead>
                        <tr>
                            <th scope="col">SL</th>
                            <th scope="col">Package</th>
                            <th scope="col">Date</th>
                            <th scope="col">Duration (Month)</th>
                            <th scope="col">Completed (Month)</th>
                            <th scope="col">Order Value</th>
                            <th scope="col">MRP Value</th>
                            <th scope="col">Monthly Return</th>
                            <th scope="col">Instalment</th>
                            <th scope="col">Status</th>
                            <th scope="col" className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellOnData.map((item, index) => (
                            <tr key={item?.id}>
                                <td className="align-middle">{index + 1}</td>
                                <td className="align-middle">{item?.package_invoice || "N/A"}</td>
                                <td className="align-middle">{item?.start_date || "N/A"}</td>
                                <td className="align-middle">{item?.duration || "N/A"}</td>
                                <td className="align-middle">{item?.completed_months || "N/A"}</td>
                                <td className="align-middle">৳ {item?.order_value || "N/A"}</td>
                                <td className="align-middle">৳ {item?.mrp_value || "N/A"}</td>
                                <td className="align-middle">৳ {(item?.monthly_bonus || 0).toFixed(2)}</td>
                                <td className="align-middle">
                                    {item?.is_instalment === 1 ? (
                                        <>
                                            <FaCheckCircle className="text-success" /> Yes
                                        </>
                                    ) : (
                                        <>
                                            <FcCancel className="text-danger" /> No
                                        </>
                                    )}
                                </td>
                                <td className="align-middle">
                                    {item?.active_status === 0 ? (
                                        <span className="text-primary">Active</span>
                                    ) : (
                                        <span className="text-success">Completed</span>
                                    )}
                                </td>
                                <td className="align-middle">
                                    <Link
                                        href={`/affiliate-buyback-policy-details/${item?.id}`}
                                        className="btn btn-success"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="5" className="text-end fw-bold">Totals:</td>
                            <td>৳ {totals.totalOrderValue.toFixed(2)}</td>
                            <td>৳ {totals.totalMrpValue.toFixed(2)}</td>
                            <td>৳ {totals.totalMonthlyBonus.toFixed(2)}</td>
                            <td colSpan="3"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default SellOnNagadhatHistory;
