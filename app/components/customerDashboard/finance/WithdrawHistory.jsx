import WithdrawHistoryModal from "./WithdrawHistoryModal";
import { getAffiliateFinanceWithdrawHistory } from "@/app/services/affiliate-finance/getAffiliateFinanceWithdrawHistory";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NoDataFound from "../../NoDataFound";
import WithdrawHistoryBtn from "./WithdrawHistoryBtn";

const WithdrawHistory = async () => {
    const session = await getServerSession(authOptions);
    const response = await getAffiliateFinanceWithdrawHistory(
        session.accessToken
    );
    let withdrawHistoryData = response?.results?.data;

    return (
        <>
            <div className="table-responsive pt-4">
                {withdrawHistoryData?.length === 0 ? (
                    <NoDataFound />
                ) : (
                    <table className="table" style={{ minWidth: "645px" }}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Billing Method</th>
                                <th>Account ID/Code</th>
                                <th className="text-end">Amount</th>
                                <th className="text-end">Charge</th>
                                <th className="text-end">Payable</th>
                                <th>Status</th>
                                <th className="text-center">View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {withdrawHistoryData?.map((item) => (
                                <tr key={item.id || item.account_number}>
                                    <td>{item.date_time}</td>
                                    <td>{item.billing_method}</td>
                                    <td>{item.account_number}</td>
                                    <td className="text-end">{item.amount}</td>
                                    <td className="text-end">{item.charge}</td>
                                    <td className="text-end">{item.payable}</td>
                                    <td className={item.status === "Completed"? "paid" : "pending"}>
                                        {item.status}
                                    </td>
                                    <WithdrawHistoryBtn
                                        item={item}
                                        token={session.accessToken}
                                    />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default WithdrawHistory;
