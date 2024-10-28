"use client";
import { useEffect, useState, useTransition } from "react";
import MyTeamList from "./MyTeamList";
import SearchMyTeam from "./SearchMyTeam";
import TeamListNotFound from "./TeamListNotFound";
import { useSession } from "next-auth/react";
import { getAffiliateTeam } from "@/app/services/affiliate/getAffiliateTeam";
import { useSearchParams } from "next/navigation";
import Pagination from "@/app/components/productCategory/Pagination";
import NoDataFound from "@/app/components/NoDataFound";
import DefaultLoader from "@/app/components/defaultloader/DefaultLoader";

const AffiliateTeamWrapp = () => {
    const [isPending, startTransition] = useTransition();
    const [teamData, setTeamData] = useState([]);
    const [totalMember, setTotalMember] = useState("");
    const [teamGrandTotal, setTeamGrandTotal] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const { data: session, status } = useSession();
    const [lastPage, setLastPage] = useState(1); // New state for last page
    const [currentPage, setCurrentPage] = useState(1); // New state for current page
    const searchParams = useSearchParams();

    useEffect(() => {
        const page = searchParams.get("page");
        if (page && parseInt(page) !== currentPage) {
            setCurrentPage(parseInt(page));
        }
    }, [searchParams, currentPage]);

    const limit = 20; //Per Page Category

    useEffect(() => {
        if (status === "authenticated" && session?.accessToken) {
            const fetchTeamData = async () => {
                try {
                    let searchParams = {};
                    if (searchQuery.length >= 2) {
                        searchParams.search = searchQuery;
                    }
                    searchParams.page = currentPage;
                    searchParams.limit = limit;
                    startTransition(async () => {
                        const affiliateTeam = await getAffiliateTeam(
                            session?.accessToken,
                            searchParams
                        );
                        const affiliateTeamData =
                            affiliateTeam?.results?.myTeam;
                        const allMemberCount =
                            affiliateTeam?.results?.total_members;
                        const grandTotal = affiliateTeam?.results;
                        setTeamGrandTotal(grandTotal);
                        setTotalMember(allMemberCount);
                        setTeamData(affiliateTeamData);
                        setLastPage(affiliateTeamData.last_page || 1);
                    });
                } catch (error) {
                    console.error(
                        "Failed to fetch affiliate team data:",
                        error
                    );
                }
            };
            fetchTeamData();
        }
    }, [session?.accessToken, searchQuery, currentPage]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const teamListInfo = teamData?.data || [];

    return (
        <>
            <div className="customer-dashboard-order-history-area h-100">
                <div className="customer-dashboard-order-history-title p-0 ">
                    <h1 className="customer-dashboard-title m-0">
                        <span
                            className="px-3 d-inline-block py-1"
                            style={{ background: "#414042", color: "#fff" }}
                        >
                            My Team ({totalMember})
                        </span>
                    </h1>
                </div>
                {teamListInfo?.length > 0 && (
                    <SearchMyTeam onSearch={handleSearch} />
                )}

                <div className="customer-dashboard-order-history table-responsive">
                    {isPending ? (
                        <DefaultLoader />
                    ) : teamListInfo && teamListInfo.length > 0 ? (
                        <MyTeamList
                            teamListInfo={teamListInfo}
                            teamGrandTotal={teamGrandTotal}
                        />
                    ) : (
                        <NoDataFound title="Team Member Not Found" />
                    )}

                    <Pagination currentPage={currentPage} lastPage={lastPage} />
                </div>
            </div>
        </>
    );
};

export default AffiliateTeamWrapp;
