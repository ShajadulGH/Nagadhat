import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FinanceTopTitle from "@/app/components/customerDashboard/finance/FinanceTopTitle";
import Pagination from "@/app/components/productCategory/Pagination";
import { geAffiliateFinanceTransitions } from "@/app/services/affiliate-finance/geAffiliateFinanceTransitions";
import { getServerSession } from "next-auth";
import { FaCheckCircle, FaTimesCircle, FaUndo, FaExclamationCircle } from "react-icons/fa";

const FinanceTransactions = async ({ searchParams }) => {
    // get server session
    const session = await getServerSession(authOptions);
    const currentPage = parseInt(searchParams?.page) || 1;
    const limit = 20; //Per Page Category

    // fetch affiliate finance transfer history data
    const data = await geAffiliateFinanceTransitions(
        session?.accessToken,
        currentPage,
        limit
    );
    const lastPage = data?.results?.last_page || 1;
    const transactions = data?.results?.data || [];
    const serialNumber = (currentPage - 1) * limit;

    return (
        <div className="customer-dashboard-order-history-area">
            <FinanceTopTitle title="Transactions" />
            <div className="px-md-4 py-4 overflow-x-scroll">
                {/* Transactions section */}
                <table
                    className="table table-hover"
                >
                    <thead>
                        {/* Only Desktop view */}
                        <tr className="d-none d-md-table-row">
                            <th>SL</th>
                            <th>Date/Time</th>
                            <th>Purpose</th>
                            <th className="text-end">Debit</th>
                            <th className="text-end">Credit</th>
                            <th className="text-end">Balance</th>
                            <th className="text-center">Status</th>
                        </tr>
                        {/* Only Mobile view */}
                        <tr className="d-md-none">
                            <th>SL</th>
                            <th>particular</th>
                            <th className="text-end">Debit</th>
                            <th className="text-end">Credit</th>
                            <th className="text-end">Balance</th>
                            <th className="text-center">ST</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions?.length > 0 ? (
                            transactions?.map((transaction, index) => (
                                <>
                                {/* // Only Desktop view */}
                                    <tr key={transaction?.id} className="d-none d-md-table-row">
                                        <td>{index + 1 + serialNumber}</td>
                                        <td>{transaction?.date_time}</td>
                                        <td>{transaction?.purpose}</td>
                                        <td className="text-end">
                                            {transaction?.debit
                                                ? "৳ " + transaction?.debit.toFixed(2)
                                                : "--"}
                                        </td>
                                        <td className="text-end">
                                            {transaction?.credit
                                                ? "৳ " + transaction?.credit.toFixed(2)
                                                : "--"}
                                        </td>
                                        <td className="text-end">
                                            {transaction?.balance && (
                                                "৳ " + transaction?.balance
                                            )}
                                        </td>
                                        <td className="text-center">
                                            <span
                                                className={
                                                    transaction?.status === "Completed"
                                                        ? "text-success"
                                                        : transaction?.status === "Rejected"
                                                            ? "text-danger"
                                                            : transaction?.status === "Refund"
                                                                ? "text-primary"
                                                                : "text-warning"
                                                }
                                            >
                                                {transaction?.status}
                                            </span>
                                        </td>
                                    </tr>
                                {/* // Only Mobile view */}
                                    <tr key={transaction?.id} className="d-md-none">
                                        <td>{index + 1 + serialNumber}</td>
                                        <td style={{ minWidth: "176px" }}>
                                            {transaction?.date_time}, <br />
                                            {transaction?.purpose}
                                        </td>
                                        <td className="text-end">
                                            {transaction?.debit
                                                ? "৳" + transaction?.debit.toFixed(2)
                                                : "--"}
                                        </td>
                                        <td className="text-end">
                                            {transaction?.credit
                                                ? "৳" + transaction?.credit.toFixed(2)
                                                : "--"}
                                        </td>
                                        <td className="text-end">
                                            {transaction?.balance && (
                                                "৳" + transaction?.balance
                                            )}
                                        </td>
                                        <td className="text-center">
                                            {transaction?.status === "Completed" ? (
                                                <FaCheckCircle className="text-success" />
                                            ) : transaction?.status === "Rejected" ? (
                                                <FaTimesCircle className="text-danger" />
                                            ) : transaction?.status === "Refund" ? (
                                                <FaUndo className="text-primary" />
                                            ) : (
                                                <FaExclamationCircle className="text-warning" />
                                            )}
                                        </td>
                                    </tr>
                                </>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No transactions found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Pagination currentPage={currentPage} lastPage={lastPage} />
            </div>
        </div>
    );
};

export default FinanceTransactions;
