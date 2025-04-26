"use client";
import { useEffect, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import SearchMyTeam from "@/app/components/customerDashboard/affiliate/affiliatemyteam/SearchMyTeam";
import MyTeamList from "@/app/components/customerDashboard/affiliate/affiliatemyteam/MyTeamList";
import TeamListNotFound from "@/app/components/customerDashboard/affiliate/affiliatemyteam/TeamListNotFound";
import { getAffiliateMembersTeam } from "@/app/services/affiliate/getAffiliateMembersTeam";
import { useSearchParams } from "next/navigation";
import Pagination from "@/app/components/productCategory/Pagination";
import Link from "next/link";
import NoDataFound from "@/app/components/NoDataFound";
import DefaultLoader from "@/app/components/defaultloader/DefaultLoader";

const Page = ({ params }) => {
    const { userId } = params;
    const [isPending, startTransition] = useTransition();
    const [teamData, setTeamData] = useState({});
    const [firstHighestTeam, setFirstHighestTeam] = useState({});
    const [secondHighestTeam, setSecondHighestTeam] = useState({});
    const [otherTeam, setOtherTeam] = useState([]);
    const [totalMember, settotalMember] = useState("");
    const [teamGrandTotal, setTeamGrandTotal] = useState("");
    const [otherTotalMembers, setOtherTotalMembers] = useState("");
    const [childTotalMembers, setChildTotalMembers] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const { data: session, status } = useSession();
    const [lastPage, setLastPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const searchParam = useSearchParams();
    const affiliateUser = searchParam.get("member");
    const [teamResultData, setTeamResultDat] = useState({});


    useEffect(() => {
        const page = searchParam.get("page");
        if (page && parseInt(page) !== currentPage) {
            setCurrentPage(parseInt(page));
        }
    }, [searchParam, currentPage]);

    const limit = 20; 

    useEffect(() => {
        const fetchTeamData = async () => {
            if (status === "authenticated" && session?.accessToken) {
                try {
                    let searchParam = {};                    
                    if (searchQuery.length >= 2) {
                        searchParam.search = searchQuery;
                    }
                    searchParam.page = currentPage;
                    searchParam.limit = limit;
                    startTransition(async () => {
                        const teamMember = await getAffiliateMembersTeam(
                            session?.accessToken,
                            userId,
                            searchParam
                        );
                        setTeamResultDat(teamMember?.results);
                        const teamMemberData = teamMember?.results?.myTeam;
                        const child_total_members = teamMember?.results?.child_total_members || 0;
                        setChildTotalMembers(child_total_members);
                        const allMemberCount = teamMember?.results?.total_members || 0;
                        const otherTotalMembers = teamMember?.results?.all_other_total_members || 0;
                        setOtherTotalMembers(otherTotalMembers);
                        const grandTotal = teamMember?.results;
                        setTeamGrandTotal(grandTotal);
                        settotalMember(allMemberCount);
                        setTeamData(teamMemberData || {});
                        setFirstHighestTeam(  teamMemberData?.data?.first_highest_team || {} );
                        setSecondHighestTeam( teamMemberData?.data?.second_highest_team || {} );
                        setOtherTeam( teamMemberData?.data?.other_teams || [] );
                        setLastPage(teamMemberData?.last_page);
                    });
                } catch (error) {
                    console.error(
                        "Failed to fetch affiliate team member data:",
                        error
                    );
                }
            }
        };

        fetchTeamData();
    }, [session?.accessToken, searchQuery, currentPage, userId]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const teamListInfo = teamData?.data || {};
    const serialNumber = (currentPage - 1) * 20;

    return (
        <>
            <div className="customer-dashboard-order-history-area h-100">
                <div className="customer-dashboard-order-history-title p-0 ">
                    <h1 className="customer-dashboard-title px-4 m-0">
                        <Link
                            href="/affiliate-team"
                            className=" px-3 py-1 d-inline-block "
                        >
                            My Sales Team ({totalMember})
                        </Link>
                        {affiliateUser && (
                            <span
                                className=" px-3 py-1 d-inline-block"
                                style={{
                                    background: "#414042",
                                    color: "#fff",
                                }}
                            >
                                {affiliateUser} (
                                {childTotalMembers})
                            </span>
                        )}
                    </h1>
                </div>
                {Object.keys(teamListInfo).length > 0 && (
                    <SearchMyTeam onSearch={handleSearch} />
                )}

                <div className="customer-dashboard-order-history table-responsive">
                    {isPending ? (
                        <DefaultLoader />
                    ) : Object?.keys(teamListInfo).length > 0 ? (
                        <MyTeamList
                            firstHighestTeam={firstHighestTeam}
                            otherTeam={otherTeam}
                            secondHighestTeam={secondHighestTeam}
                            teamGrandTotal={teamGrandTotal}
                            serialNumber={serialNumber}
                            otherTotalMembers={otherTotalMembers}
                            teamResultData={teamResultData}
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

export default Page;
