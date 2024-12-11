"use client";

import { useEffect, useState, useTransition } from "react";
import WithdrawChart from "./WithdrawChart";
import { useSession } from "next-auth/react";
import { getAffiliateFinanceBalanceChart } from "@/app/services/affiliate-finance/getAffiliateFinanceBalanceChart";

const WithdrawTopBanner = () => {
    const [chartInfo, setChartInfo] = useState({});
    const [isPending, startTransition] = useTransition();

    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated" && session?.accessToken) {
            const fetchFinanceBalanceChart = async () => {
                try {
                    startTransition(async () => {
                        const response = await getAffiliateFinanceBalanceChart(
                            session?.accessToken
                        );
                        setChartInfo(response?.results);
                    });
                } catch (error) {
                    console.error("Error fetching chart data", error);
                }
            };
            fetchFinanceBalanceChart();
        }
    }, [status, session?.accessToken]);


    return (
        <>
            <div className="w-100 withdraw-top-section">
                {isPending ? (
                    <h2
                        className="text-center w-100"
                        aria-live="polite"
                        aria-busy="true"
                    >
                        Loading...
                    </h2>
                ) : (
                    <div className="d-flex flex-column flex-md-row gap-5 justify-content-between align-items-center">
                        {/* Balance Section */}
                        <div className="text-black">
                            <h2 className="fw-bold">
                                ৳ {chartInfo?.total_withdrawable ?? 0 }
                            </h2>
                            <p className="fs-6">Balance</p>
                        </div>

                        {/* Chart or No Data Section */}
                            <WithdrawChart chartInfo={chartInfo} />
                        
                    </div>
                )}
            </div>
        </>
    );
};

export default WithdrawTopBanner;
