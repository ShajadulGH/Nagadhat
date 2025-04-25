
import Link from "next/link";
import NoDataFound from "@/app/components/NoDataFound";

const MyTeamList = ({
    firstHighestTeam,
    secondHighestTeam,
    otherTeam,
    teamGrandTotal,
    serialNumber,
    otherTotalMembers,
    teamResultData
}) => {
    const isFirstTeamEmpty = Object.keys(firstHighestTeam).length === 0;
    const isSecondTeamEmpty = Object.keys(secondHighestTeam).length === 0;
    const isOtherTeamEmpty = otherTeam?.length === 0;

    const allTeamsEmpty = isFirstTeamEmpty && isSecondTeamEmpty && isOtherTeamEmpty;

    if (allTeamsEmpty) {
        return <NoDataFound title="Sales Team  Not Found" />;
    }

    return (
        <>
            {/* Sales Team 1 */}
            {!isFirstTeamEmpty && (
                <div className="">
                    <h2 className="fs-5 border-bottom py-1 text-white ps-2" style={{ background: "#44bc9d" }}>
                        Sales Team 1
                    </h2>
                    <div className="table-responsive">
                        <table className="table table-hover my-team-table-min-width">
                            <thead>
                                <tr>
                                    <th scope="col">SL</th>
                                    <th scope="col">Username</th>
                                    <th className="d-none d-md-table-cell">Full Name</th>
                                    <th className="text-end" scope="col">Sales</th>
                                    <th className="text-center" scope="col">Refer</th>
                                    <th className="text-center" scope="col">Customer</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td scope="row"> 1 </td>
                                    <td>
                                        <span className="d-block">
                                            {firstHighestTeam?.username}
                                        </span>
                                    </td>
                                    <td>
                                        <Link
                                            href={`/affiliate-team/${firstHighestTeam?.id}?member=${firstHighestTeam?.name}`}
                                            className="border-0 px-2 py-1"
                                            style={{
                                                color: "white",
                                                background: "#44bc9d",
                                                minWidth: "130px",
                                            }}
                                        >
                                            {firstHighestTeam?.name}
                                        </Link>
                                    </td>
                                    {/* <td className="text-end"> {teamResultData?.is_line_01_sales_completed ? (<p className=" text-success">Achieved</p>):`৳ ${firstHighestTeam?.total_sales ?? 0}`}</td> */}
                                    <td className="text-end"> {`৳ ${firstHighestTeam?.total_sales ?? 0}`}</td>

                                    <td className="text-center">{firstHighestTeam?.affiliate_user?.refer_count || 0}</td>
                                    <td className="text-center">{firstHighestTeam?.affiliate_user?.total_team_members || 0}</td>
                                </tr>
                                {/* <tr>
                                    <td colSpan={4} className="text-end">
                                        <strong>Total ৳ {firstHighestTeam?.total_sales}</strong>
                                    </td>
                                    <td colSpan={2}></td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Sales Team 2 */}
            {!isSecondTeamEmpty && (
                <div className="">
                    <h2 className="fs-5 border-bottom py-1 text-white ps-2" style={{ background: "#44bc9d" }}>
                        Sales Team 2
                    </h2>
                    <div className="table-responsive">
                        <table className="table table-hover my-team-table-min-width">
                            <thead>
                                <tr>
                                    <th scope="col">SL</th>
                                    <th scope="col">Username</th>
                                    <th className="d-none d-md-table-cell">Full Name</th>
                                    <th className="text-end" scope="col">Sales</th>
                                    <th className="text-center" scope="col">Refer</th>
                                    <th className="text-center" scope="col">Customer</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td scope="row"> 1 </td>
                                    <td>
                                        <span className="d-block">
                                            {secondHighestTeam?.username}
                                        </span>
                                    </td>
                                    <td>
                                        <Link
                                            href={`/affiliate-team/${secondHighestTeam?.id}?member=${secondHighestTeam?.name}`}
                                            className="border-0 px-2 py-1"
                                            style={{
                                                color: "white",
                                                background: "#44bc9d",
                                                minWidth: "130px",
                                            }}
                                        >
                                            {secondHighestTeam?.name}
                                        </Link>
                                    </td>
                                    {/* <td className="text-end"> {teamResultData?.is_line_02_sales_completed ? (<p className=" text-success">Achieved</p>):`৳ ${secondHighestTeam?.total_sales ?? 0}`}</td> */}
                                    <td className="text-end"> {`৳ ${secondHighestTeam?.total_sales ?? 0}`}</td>
                                    <td className="text-center">{secondHighestTeam?.affiliate_user?.refer_count || 0}</td>
                                    <td className="text-center">{secondHighestTeam?.affiliate_user?.total_team_members || 0}</td>
                                </tr>
                                {/* <tr>
                                    <td colSpan={4} className="text-end">
                                        <strong>Total ৳ {secondHighestTeam?.total_sales}</strong>
                                    </td>
                                    <td colSpan={2}></td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Sales Team 3 */}
            {!isOtherTeamEmpty && (
                <div className="">
                    <h2 className="fs-5 border-bottom py-1 text-white ps-2" style={{ background: "#44bc9d" }}>
                        Sales Team 3
                    </h2>
                    <div className="table-responsive">
                        <table className="table table-hover my-team-table-min-width">
                            <thead>
                                <tr>
                                    <th scope="col">SL</th>
                                    <th scope="col">Username</th>
                                    <th className="d-none d-md-table-cell">Full Name</th>
                                    <th className="text-end" scope="col">Sales</th>
                                    <th className="text-center" scope="col">Refer</th>
                                    <th className="text-center" scope="col">Customer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {otherTeam.map((member, index) => (
                                    <tr key={member?.id}>
                                        <td>{index + 1 + serialNumber}</td>
                                        <td><span className="d-block">{member?.username || "N/A"}</span></td>
                                        <td>
                                            <Link
                                                href={`/affiliate-team/${member?.id}?member=${encodeURIComponent(member?.name || "")}`}
                                                className="border-0 px-2 py-1"
                                                style={{
                                                    color: "white",
                                                    background: "#44bc9d",
                                                    minWidth: "130px",
                                                }}
                                            >
                                                {member?.name || "No Name"}
                                            </Link>
                                        </td>
                                        {/* <td className="text-end"> {teamResultData?.is_line_03_sales_completed ? (<p className=" text-success">Achieved</p>):`৳ ${member?.total_sales ?? 0}`}</td> */}
                                        <td className="text-end"> {`৳ ${member?.total_sales ?? 0}`}</td>
                                        <td className="text-center">{member?.affiliate_user?.refer_count ?? 0}</td>
                                        <td className="text-center">{member?.affiliate_user?.total_team_members ?? 0}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={3} className="text-end"></td>
                                    <td colSpan={1} className="text-end">{teamResultData?.is_line_03_sales_completed?(<p className=" text-success">Achieved</p>):`৳ ${teamResultData?.other_team_total_sales ?? 0}`}</td>
                                    <td colSpan={1}></td>
                                    <td className="text-center" colSpan={1}><strong >Total: {otherTotalMembers}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyTeamList;
