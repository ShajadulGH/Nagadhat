"use client";
import { useSession } from "next-auth/react";
import PendingBalanceLists from "./PendingBalanceLists";
import { useEffect, useState, useTransition } from "react";
import { getAffiliatePendingBalance } from "@/app/services/affiliatepayout/getAffiliatePendingBalance";
import LodingFixed from "../../LodingFixed";
import NoDataFound from "../../NoDataFound";
import { useSearchParams } from "next/navigation";
import Pagination from "../../productCategory/Pagination";

const PendingBalanceWrapper = () => {
    const [pendingBalance, setPendingBalance] = useState([]);
    const [isPending, startTransition] = useTransition();
    const { data: session } = useSession();
    const [lastPage, setLastPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const searchParams = useSearchParams();

    useEffect(() => {
        const page = searchParams.get("page");
        if (page && page !== currentPage) {
            setCurrentPage(parseInt(page));
        }
    }, [searchParams, currentPage]);
    const limit = 20; //Per Page Category

    useEffect(() => {
        if (session?.accessToken) {
            const fetchPendingBalance = async () => {
                const params = {
                    page: currentPage,
                    limit,
                };
                try {
                    startTransition(async () => {
                        const response = await getAffiliatePendingBalance(
                            session?.accessToken,
                            params
                        );
                        const results = response?.results?.data || [];
                        setLastPage(response?.results?.last_page);
                        setPendingBalance(results);
                    });
                } catch (error) {
                    console.error(error);
                }
            };
            fetchPendingBalance();
        }
    }, [session?.accessToken, currentPage]);

    const totalAmount = Array.isArray(pendingBalance)
        ? pendingBalance.reduce((sum, item) => sum + item.amount, 0)
        : 0;

    return (
        <div className="customer-dashboard-order-history-area h-100 pb-4">
            <div className="customer-dashboard-order-history-title">
                <h1 className="customer-dashboard-title">Pending Balance</h1>
            </div>
            <div className="px-4">
                {isPending ? (
                    <LodingFixed />
                ) : (
                    <div className="table-responsive">
                        <table className="table" style={{ minWidth: "900px" }}>
                            <thead>
                                <tr>
                                    <th scope="col">SL</th>
                                    <th scope="col">Date/Time</th>
                                    <th scope="col">Particular</th>
                                    <th scope="col">From</th>
                                    <th scope="col">Purpose</th>
                                    <th className="text-end" scope="col">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingBalance?.length > 0 ? (
                                    <>
                                        {pendingBalance?.map((item, index) => (
                                            <PendingBalanceLists
                                                key={index}
                                                item={item}
                                                index={index}
                                            />
                                        ))}
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="text-end"
                                            >
                                                <strong>
                                                    Total: ৳ {totalAmount.toFixed(2)}
                                                </strong>
                                            </td>
                                        </tr>
                                    </>
                                ) : (
                                    <tr>
                                        <td colSpan="6">
                                            <NoDataFound />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
            />
        </div>
    );
};

export default PendingBalanceWrapper;
