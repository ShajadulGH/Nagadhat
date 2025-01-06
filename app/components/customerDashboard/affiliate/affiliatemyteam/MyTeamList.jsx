import { FaCircleCheck, FaRegistered } from "react-icons/fa6";
import { FaBan } from "react-icons/fa";
import Link from "next/link";

const MyTeamList = ({ teamListInfo, teamGrandTotal }) => {
    // Filter members based on the conditions
    const generalMembers = teamListInfo.filter(
        (member) =>
            member.affiliate_user_status === "General" &&
            member.affiliate_user === null
    );
    const affiliateMembers = teamListInfo.filter(
        (member) =>
            member.affiliate_user_status === "Affiliate" &&
            member.affiliate_user !== null
    );
    const displayMembers = [...generalMembers, ...affiliateMembers];

    return (
        <div className="table-responsive">
            <table className="table table-hover" style={{ minWidth: "950px" }}>
                <thead>
                    <tr>
                        <th scope="col">SL</th>
                        <th scope="col">Username</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Sponsor</th>
                        <th className="text-center" scope="col">
                            Resell
                        </th>
                        <th className="text-center" scope="col">
                            Retail
                        </th>
                        <th scope="col">Total Refer</th>
                        <th scope="col">Members</th>
                        <th scope="col">User Type</th>
                        <th scope="col">KYC</th>
                    </tr>
                </thead>
                <tbody>
                    {displayMembers?.map((member, index) => (
                        <tr key={member.id}>
                            <td scope="row">{index + 1}</td>
                            <td>{member?.username}</td>
                            <td>
                                <Link
                                    href={`/affiliate-team/${member?.id}?member=${member?.name}`}
                                    className=" border-0 bg-transparent "
                                    style={{ color: "green" }}
                                >
                                    {member?.name}
                                </Link>
                            </td>
                            <td>
                                {member?.user_customer_rank_tree?.placement_user
                                    ?.name || ""}
                            </td>
                            <td className="text-end">
                                ৳{" "}
                                {(
                                    parseInt(member.affiliate_user?.team_total_resell_amount || 0) +
                                    parseInt(member.affiliate_user?.team_total_container_amount || 0)
                                ).toLocaleString()}
                            </td>
                            <td className="text-end">
                                ৳{" "}
                                {(
                                    parseInt(member?.affiliate_user?.team_total_retail_amount || 0) +
                                    parseInt(member?.affiliate_user?.team_total_privilege_card_amount || 0)
                                ).toLocaleString()}
                            </td>
                            <td className="text-center">
                                {member?.affiliate_user?.refer_count || 0}
                            </td>
                            <td className="text-center">
                                {member?.affiliate_user?.total_team_members || 0}
                            </td>
                            <td>{member?.affiliate_user_status}</td>
                            <td className="text-center">
                                {member?.status === 1 ? (
                                    <FaCircleCheck className="text-success" />
                                ) : member?.status === 2 ? (
                                    <FaBan className="text-danger" />
                                ) : (
                                    <FaRegistered className="text-warning" />
                                )}
                            </td>
                        </tr>
                    ))}

                    <tr>
                        <td colSpan={5} className="text-end">
                            <strong>
                                Total ৳{" "}
                                {teamGrandTotal?.grand_total_resell_amount
                                    ? teamGrandTotal?.grand_total_resell_amount.toFixed(
                                          2
                                      )
                                    : 0}
                            </strong>
                        </td>
                        <td colSpan={2}>
                            <strong>
                                Total ৳{" "}
                                {teamGrandTotal?.grand_total_retail_amount
                                    ? teamGrandTotal?.grand_total_retail_amount.toFixed(
                                        2
                                    )
                                    : 0}
                            </strong>
                        </td>

                        <td colSpan={3}>
                            <strong>
                                Total{" "}
                                {teamGrandTotal?.grand_total_members
                                    ? teamGrandTotal?.grand_total_members
                                    : 0}
                            </strong>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MyTeamList;
