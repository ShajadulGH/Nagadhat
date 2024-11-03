"use client";
import { useSession } from "next-auth/react";
import PayoutRankRewardDetail from "./PayoutRankRewardDetail";
import PayoutRankRewardTop from "./PayoutRankRewardTop";
import { useEffect, useState, useTransition } from "react";
import { getPayoutRankReward } from "@/app/services/affiliatepayout/getPayoutRankReward";
import LodingFixed from "../../LodingFixed";
import NoDataFound from "../../NoDataFound";
import { useSearchParams } from "next/navigation";
import Pagination from "../../productCategory/Pagination";

const PayoutRankRewardWrapper = () => {
    const [rankRewardResult, setRankRewardResult] = useState({});
    const [rankRewardData, setRankRewardData] = useState([]);
    const [isPending, startTransition] = useTransition();
    const { data: session, status } = useSession();
    const searchParam = useSearchParams();
    const [lastPage, setLastPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20;

    useEffect(() => {
        const page = searchParam.get("page");
        if (page && parseInt(page) !== currentPage) {
            setCurrentPage(parseInt(page));
        }
    }, [searchParam]);

    useEffect(() => {
        if (status === "authenticated" && session?.accessToken) {
            const fetchRankReward = async () => {
                let params = { limit, page: currentPage };
                try {
                    startTransition(async () => {
                        const response = await getPayoutRankReward(
                            session?.accessToken,
                            params
                        );
                        setRankRewardResult(response?.results || {});
                        setRankRewardData(response?.results?.data || []);
                        setLastPage(response?.results?.last_page);
                    });
                } catch (error) {
                    console.error("Failed to fetch Rank Reward data:", error);
                }
            };
            fetchRankReward();
        }
    }, [status, session?.accessToken, currentPage]);

    return (
        <>
            {isPending && <LodingFixed />}
            <div className="customer-dashboard-order-history-area h-100 pb-4">
                <PayoutRankRewardTop />
                <div className="customer-dashboard-order-history">
                    {rankRewardData?.length > 0 ? (
                        <div>
                            <PayoutRankRewardDetail
                                rankRewardData={rankRewardData}
                                rankRewardResult={rankRewardResult}
                            />
                            <Pagination
                                currentPage={currentPage}
                                lastPage={lastPage}
                            />
                        </div>
                    ) : (
                        !isPending && <NoDataFound />
                    )}
                </div>
            </div>
        </>
    );
};

export default PayoutRankRewardWrapper;
