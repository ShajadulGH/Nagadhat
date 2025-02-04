"use client";
import { getAffiliateFinanceWithdrawHistory } from "@/app/services/affiliate-finance/getAffiliateFinanceWithdrawHistory";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { FaEye } from "react-icons/fa6";
import NoDataFound from "../../NoDataFound";
import LodingFixed from "../../LodingFixed";
import WithdrawHistoryModal from "./WithdrawHistoryModal";
const LastFiveWithdrawHistory = () => {
    const [lastFiveData, setLastFiveData] = useState([]);
    const [isPending, startTransition] = useTransition();
    const [selectedId, setSelectedId] = useState();
    const { data: session, status } = useSession();

    // function for Last Five Withdraw Data
    useEffect(() => {
        if (status === "authenticated" && session?.accessToken) {
            const fetchLastFiveWithdrawData = async () => {
                try {
                    startTransition(async () => {
                        const response =
                            await getAffiliateFinanceWithdrawHistory(
                                session?.accessToken
                            );
                        setLastFiveData(response?.results?.data || []);
                    });
                } catch (error) {
                    console.error(
                        "Error fetching Last Five Withdraw Data",
                        error
                    );
                }
            };
            fetchLastFiveWithdrawData();
        }
    }, [status, session?.accessToken]);

    const handleViewClick = (id) => {
        setSelectedId(id);
    };

    return (
        <>
            {isPending ? (
                <div>
                    <h3 className="text-center">Loading...</h3>
                </div>
            ) : (
                <div className="table-responsive pt-4">
                    {lastFiveData?.length > 0 ? (
                        <table className="table finance-withdraw-min-with" >
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th className="d-none d-lg-table-cell">Billing Method</th>
                                    <th className="d-none d-lg-table-cell">Account ID/Code</th>
                                    <th className="text-end">Amount</th>
                                    <th className="text-end">Charge</th>
                                    <th className="text-end">Payable</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lastFiveData?.slice(0, 5).map((item) => (
                                    <tr key={item.id || item.account_number}>
                                        <td className="align-middle">
                                            {item.date_time}
                                            <span className="d-block d-lg-none"> <strong>B Method :</strong> {item.billing_method}</span>
                                            <span className="d-block d-lg-none"> <strong>ID/Code :</strong> {item.account_number}</span>
                                        </td>
                                        <td className="d-none d-lg-table-cell align-middle">{item.billing_method}</td>
                                        <td className="d-none d-lg-table-cell align-middle">{item.account_number}</td>
                                        <td className="text-end align-middle">
                                            ৳ {""} {item.amount}
                                        </td>
                                        <td className="text-end align-middle">
                                            ৳ {""}
                                            {item.charge}
                                        </td>
                                        <td className="text-end align-middle">
                                            ৳ {""}
                                            {item.payable}
                                        </td>
                                        <td
                                            className={`align-middle ${
                                                item.status === "Completed" ? "paid" : "pending"
                                            }`}
                                        >
                                            {item.status}
                                        </td>
                                        <td className="text-center align-middle">
                                            <div className="customer-dashboard-order-history-actions justify-content-center">
                                                <button
                                                    type="button"
                                                    className="border-0 "
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#viewWithdrawHistoryModal"
                                                    onClick={() =>
                                                        handleViewClick(
                                                            item?.id
                                                        )
                                                    }
                                                >
                                                    <FaEye />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        ""
                    )}
                </div>
            )}

            {/* Modal */}
            <WithdrawHistoryModal
                selectedId={selectedId}
                token={session.accessToken}
            />
        </>
    );
};

export default LastFiveWithdrawHistory;
