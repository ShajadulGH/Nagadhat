import moment from "moment";
import FinanceHistoryBtn from "./FinanceHistoryBtn";
import NoDataFound from "../../NoDataFound";

const FinanceHistoryModalTable = ({ data }) => {
    return (
        <div className=" table-responsive">
            <table className="table table-hover h-100" style={{ minWidth: "530px" }}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th className="d-none d-lg-table-cell">Transfer From</th>
                        <th className="d-none d-lg-table-cell">Transfer To</th>
                        <th className="text-end">Amount</th>
                        <th className="text-end">Charge</th>
                        <th className="text-end">To Credit</th>
                        <th className="text-center">View</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((transaction) => (
                        <tr key={transaction.id}>
                            <td className="align-middle">
                                {moment(transaction.created_at).format(
                                    "YYYY-MM-DD hh:mm A"
                                )}
                                <span className="d-block d-lg-none"><strong>From:</strong> {transaction.transfer_form}</span>
                                <span className="d-block d-lg-none"><strong>To:</strong> {transaction.transfer_to}</span>
                            </td>
                            <td className="d-none d-lg-table-cell align-middle">{transaction.transfer_form}</td>
                            <td className="d-none d-lg-table-cell align-middle">{transaction.transfer_to}</td>
                            <td className="text-end align-middle">
                                ৳ {""} {transaction.amount.toFixed(2)}
                            </td>
                            <td className="text-end align-middle">
                                ৳ {""}
                                {transaction.charge.toFixed(2)}
                            </td>
                            <td className="text-end align-middle">
                                ৳ {""}
                                {transaction.payable.toFixed(2)}
                            </td>
                            <td className="text-center align-middle">
                                <FinanceHistoryBtn transaction={transaction} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {!data?.length && <NoDataFound />}
        </div>
    );
};

export default FinanceHistoryModalTable;
