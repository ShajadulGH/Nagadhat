import moment from "moment";
import FinanceHistoryBtn from "./FinanceHistoryBtn";

const FinanceHistoryModalTable = ({data}) => {
    return (
        <div className=" table-responsive">
           <table className="table table-hover" style={{ minWidth: "645px" }}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Transfer From</th>
                            <th>Transfer To</th>
                            <th>Amount</th>
                            <th>Charge</th>
                            <th>To Credit</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{moment(transaction.created_at).format("YYYY-MM-DD hh:mm A")}</td>
                                <td>{transaction.transfer_form}</td>
                                <td>{transaction.transfer_to}</td>
                                <td className="text-end">{transaction.amount.toFixed(2)}</td>
                                <td className="text-end">{transaction.charge.toFixed(2)}</td>
                                <td className="text-end">{transaction.payable.toFixed(2)}</td>
                                <td>
                                    <FinanceHistoryBtn transaction={transaction} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> 
        </div>
    );
};

export default FinanceHistoryModalTable;
