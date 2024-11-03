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
    const [affiliateData, setAffiliateData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [statusChange, setStatusChange] = useState(false);
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            if (status === "authenticated" && session?.accessToken) {
                try {
                    const [rankInfo, affiliateInfo] = await Promise.all([
                        getRanks(session.accessToken),
                        getAffiliateHomeDashboard(session.accessToken),
                    ]);

                    setRankList(rankInfo?.results || []);
                    setAffiliateData(affiliateInfo?.results || {});
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

    const isDataEmpty =
        !affiliateData || Object.keys(affiliateData).length === 0;

    return (
        <>
            {isLoading && <LodingFixed />}
            <div className="customer-dashboard-order-history-area h-100">
                {isDataEmpty ? (
                    !isLoading && <NoDataFound message="No data available" />
                ) : (
                    <RankRewardTop affiliateData={affiliateData} />
                )}

                <div className="customer-dashboard-order-history px-2">
                    {rankList.length > 0 ? (
                        <RankRewardList
                            rankList={rankList}
                            setStatusChange={setStatusChange}
                        />
                    ) : (
                        !isLoading && (
                            <NoDataFound message="No ranks available" />
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default AffiliateRankWrapp;
