"use client";
import { useSession } from "next-auth/react";
import PendingBalanceLists from "./PendingBalanceLists";
import { useEffect, useState, useTransition } from "react";
import { getAffiliatePendingBalance } from "@/app/services/affiliatepayout/getAffiliatePendingBalance";
import LodingFixed from "../../LodingFixed";
import NoDataFound from "../../NoDataFound";

const PendingBalanceWrapper = () => {
    const [pendingBalance, setPendingBalance] = useState([]);
    const [isPending, startTransition] = useTransition();
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.accessToken) {
            const fetchPendingBalance = async () => {
                try {
                    startTransition(async () => {
                        const response = await getAffiliatePendingBalance(
                            session?.accessToken
                        );
                        const results = response?.results || [];
                        setPendingBalance(results);
                    });
                } catch (error) {
                    console.error(error);
                }
            };
            fetchPendingBalance();
        }
    }, [session?.accessToken]);

    return (
        <div className="customer-dashboard-order-history-area h-100 pb-4">
            <div className="customer-dashboard-order-history-title">
                <h1 className="customer-dashboard-title">Pending Balance</h1>
            </div>
            <div className=" px-4">
                <div className="table-responsive">
                    <table className="table" style={{ minWidth: "900px" }}>
                        <thead>
                            <tr>
                                <th scope="col">SL</th>
                                <th scope="col">Date/Time</th>
                                <th scope="col">From</th>
                                <th scope="col">Purpose</th>
                                <th className="text-end" scope="col">
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {isPending ? (
                                <tr>
                                    <td colSpan="5">
                                        <LodingFixed />
                                    </td>
                                </tr>
                            ) : pendingBalance.length > 0 ? (
                                pendingBalance.map((item, index) => {
                                    return (
                                        <PendingBalanceLists
                                            key={index}
                                            item={item}
                                            index={index}
                                        />
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5">
                                        <NoDataFound />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PendingBalanceWrapper;
