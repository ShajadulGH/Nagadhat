"use client";
import { useEffect, useState } from "react";
import TeamListNotFound from "../affiliatemyteam/TeamListNotFound";
import RankRewardList from "./RankRewardList";
import RankRewardTop from "./RankRewardTop";
import { useSession } from "next-auth/react";
import { getRanks } from "@/app/services/rankreward/getRanks";
import { getAffiliateHomeDashboard } from "@/app/services/affiliate/getAffiliateHomeDashboard";
import NoDataFound from "@/app/components/NoDataFound";
import LodingFixed from "@/app/components/LodingFixed";

const AffiliateRankWrapp = () => {
    const [rankList, setRankList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statusChange, setStatusChange] = useState(false);
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            if (status === "authenticated" && session?.accessToken) {
                try {
                    const rankInfo = await getRanks(session?.accessToken);
                    setRankList(rankInfo?.results || []);
                } catch (error) {
                    console.error("Failed to fetch data:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [status, session?.accessToken, statusChange]);
    const lavelList = rankList?.map((item) => item?.next_target_rank?.level);

    return (
        <>
            {isLoading && <LodingFixed />}
            <div className="customer-dashboard-order-history-area h-100">
                <div className="pt-4 pb-2 ps-4" style={{ borderBottom: "1px solid #D8D8D8" }}>
                    <h1 className="fs-4 text-capitalize mb-0">
                        Next Promotion Chart
                    </h1>
                </div>
                {rankList.length > 0 ? (
                    <>
                        <RankRewardTop affiliateData={rankList} />
                        <div className="customer-dashboard-order-history px-2">
                            <RankRewardList
                                rankList={rankList}
                                setStatusChange={setStatusChange}
                                statusChange={statusChange}
                                lavelList={lavelList}
                            />
                        </div>
                    </>
                ) : (
                    !isLoading && <NoDataFound message="No ranks available" />
                )}
            </div>
        </>
    );
};

export default AffiliateRankWrapp;
