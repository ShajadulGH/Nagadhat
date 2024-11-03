"use client";

import { useEffect, useState, useTransition } from "react";
import WithdrawChart from "./WithdrawChart";
import { useSession } from "next-auth/react";
import { getAffiliateFinanceBalanceChart } from "@/app/services/affiliate-finance/getAffiliateFinanceBalanceChart";
import LodingFixed from "../../LodingFixed";
import NoDataFound from "../../NoDataFound";

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

    const hasChartInfo = Object.keys(chartInfo).length > 0;

    return (
        <>
            <div className="w-100 withdraw-top-section">
                <div className="d-flex flex-column flex-md-row gap-5 justify-content-between align-items-center">
                    <div className="text-black">
                        <h2 className="fw-bold">
                            {chartInfo?.total_withdrawable ?? "N/A"}
                        </h2>
                        <p className="fs-6">Withdrawable Balance</p>
                    </div>
                    {isPending ? (
                        <h2 className="text-center w-100">Loding...</h2>
                    ) : hasChartInfo ? (
                        <WithdrawChart chartInfo={chartInfo} />
                    ) : (
                        <NoDataFound />
                    )}
                </div>
            </div>
        </>
    );
};

export default WithdrawTopBanner;
