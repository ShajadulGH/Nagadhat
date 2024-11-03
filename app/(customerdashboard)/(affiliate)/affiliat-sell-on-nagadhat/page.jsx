"use client";
import SellOnNagadhatHistory from "@/app/components/customerDashboard/affiliate/sellOnNagadhat/SellOnNagadhatHistory";
import FinanceTopTitle from "@/app/components/customerDashboard/finance/FinanceTopTitle";
import LodingFixed from "@/app/components/LodingFixed";
import NoDataFound from "@/app/components/NoDataFound";
import { getSaleOnNagadhatList } from "@/app/services/affiliate/getSaleOnNagadhatList";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";

const FinanceWithdraw = () => {
    const [sellOnList, setSellOnList] = useState([]);
    const [isPending, startTransition] = useTransition();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated" && session?.accessToken) {
            const fetchSellOnNagadhatList = async () => {
                try {
                    startTransition(async () => {
                        const response = await getSaleOnNagadhatList(
                            session.accessToken
                        );

                        setSellOnList(response?.results || []);
                    });
                } catch (error) {
                    console.error(
                        "Error fetching sell on Nagadhat list:",
                        error
                    );
                }
            };
            fetchSellOnNagadhatList();
        }
    }, [status, session?.accessToken]);

    return (
        <div className="customer-dashboard-order-history-area">
            <FinanceTopTitle title="Sell On Nagadhat" />
            <div className="p-4">
                {isPending ? (
                    <LodingFixed />
                ) : sellOnList.length > 0 ? (
                    <SellOnNagadhatHistory sellOnData={sellOnList} />
                ) : (
                    <NoDataFound />
                )}
            </div>
        </div>
    );
};

export default FinanceWithdraw;
