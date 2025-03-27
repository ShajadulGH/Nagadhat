import { FaCircleCheck, FaRegistered } from "react-icons/fa6";
import { FaBan } from "react-icons/fa";
import Link from "next/link";

const MyTeamList = ({ teamListInfo, teamGrandTotal, serialNumber }) => {
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
        <>
            <div className="table-responsive">
                <table className="table table-hover my-team-table-min-width">
                    <thead>
                        <tr>
                            <th scope="col">SL</th>
                            <th scope="col">Username</th>
                            <th scope="col" className="d-none d-md-table-cell">
                                Full Name
                            </th>
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
                                <td scope="row">{index + 1 + serialNumber}</td>
                                <td>
                                    <span className="d-block ">
                                        {member?.username}
                                    </span>

                                    <Link
                                        href={`/affiliate-team/${member?.id}?member=${member?.name}`}
                                        className=" border-0 d-inline-block d-md-none px-2 py-1 "
                                        style={{
                                            color: "white",
                                            background: "#44bc9d",
                                            minWidth: "130px",
                                        }}
                                    >
                                        {member?.name}
                                    </Link>
                                </td>
                                <td className="d-none d-md-table-cell">
                                    <Link
                                        href={`/affiliate-team/${member?.id}?member=${member?.name}`}
                                        className=" border-0 bg-transparent "
                                        style={{ color: "green" }}
                                    >
                                        {member?.name}
                                    </Link>
                                </td>
                                <td>
                                    {member?.user_customer_rank_tree
                                        ?.placement_user?.name || ""}
                                </td>
                                <td className="text-end">
                                    ৳{" "}
                                    {(
                                        parseInt(
                                            member.affiliate_user
                                                ?.team_total_resell_amount || 0
                                        ) +
                                        parseInt(
                                            member.affiliate_user
                                                ?.team_total_container_amount ||
                                                0
                                        )
                                    ).toLocaleString()}
                                </td>
                                <td className="text-end">
                                    ৳{" "}
                                    {(
                                        parseInt(
                                            member?.affiliate_user
                                                ?.team_total_retail_amount || 0
                                        ) +
                                        parseInt(
                                            member?.affiliate_user
                                                ?.team_total_privilege_card_amount ||
                                                0
                                        )
                                    ).toLocaleString()}
                                </td>
                                <td className="text-center">
                                    {member?.affiliate_user?.refer_count || 0}
                                </td>
                                <td className="text-center">
                                    {member?.affiliate_user
                                        ?.total_team_members || 0}
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

            {/* Sales Team 1 */}
            <div className="">
                <h2
                    className="fs-5 border-bottom py-1 text-white ps-2"
                    style={{ background: "#414042" }}
                >
                    Sales Team 1
                </h2>
                <div className="table-responsive">
                    <table className="table table-hover my-team-table-min-width">
                        <thead>
                            <tr>
                                <th scope="col">SL</th>
                                <th scope="col">Username</th>
                                <th
                                    scope="col"
                                    className="d-none d-md-table-cell"
                                >
                                    Full Name
                                </th>

                                <th className="text-end" scope="col">
                                    Sales
                                </th>
                                <th className="text-center" scope="col">
                                    Refer
                                </th>
                                <th className="text-center" scope="col">
                                    Customer
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row"> 1 </td>
                                <td>
                                    <span className="d-block ">
                                        01739245723
                                    </span>
                                </td>
                                <td>
                                    <Link href="#" style={{ color: "green" }}>
                                        Md.Faisal
                                    </Link>
                                </td>

                                <td className="text-end">৳ 10000</td>

                                <td className="text-center">5</td>
                                <td className="text-center">15</td>
                            </tr>

                            <tr>
                                <td colSpan={4} className="text-end">
                                    <strong>Total ৳ 10000</strong>
                                </td>
                                <td colSpan={2} className="text-end"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Sales Team 2 */}
            <div className="">
                <h2
                    className="fs-5 border-bottom py-1 text-white ps-2"
                    style={{ background: "#414042" }}
                >
                    Sales Team 2
                </h2>
                <div className="table-responsive">
                    <table className="table table-hover my-team-table-min-width">
                        <thead>
                            <tr>
                                <th scope="col">SL</th>
                                <th scope="col">Username</th>
                                <th
                                    scope="col"
                                    className="d-none d-md-table-cell"
                                >
                                    Full Name
                                </th>

                                <th className="text-end" scope="col">
                                    Sales
                                </th>
                                <th className="text-center" scope="col">
                                    Refer
                                </th>
                                <th className="text-center" scope="col">
                                    Customer
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row"> 1 </td>
                                <td>
                                    <span className="d-block ">
                                        01739245724
                                    </span>
                                </td>
                                <td>
                                    <Link href="#" style={{ color: "green" }}>
                                        Md.Kamal
                                    </Link>
                                </td>

                                <td className="text-end">৳ 10000</td>

                                <td className="text-center">5</td>
                                <td className="text-center">15</td>
                            </tr>

                            <tr>
                                <td colSpan={4} className="text-end">
                                    <strong>Total ৳ 10000</strong>
                                </td>
                                <td colSpan={2} className="text-end"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/* sale Team 3 */}
            <div className="">
                <h2
                    className="fs-5 border-bottom py-1 text-white ps-2"
                    style={{ background: "#414042" }}
                >
                    Sales Team 3
                </h2>
                <div className="table-responsive">
                    <table className="table table-hover my-team-table-min-width">
                        <thead>
                            <tr>
                                <th scope="col">SL</th>
                                <th scope="col">Username</th>
                                <th
                                    scope="col"
                                    className="d-none d-md-table-cell"
                                >
                                    Full Name
                                </th>

                                <th className="text-end" scope="col">
                                    Sales
                                </th>
                                <th className="text-center" scope="col">
                                    Refer
                                </th>
                                <th className="text-center" scope="col">
                                    Customer
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row"> 1 </td>
                                <td>
                                    <span className="d-block ">
                                        01739245724
                                    </span>
                                </td>
                                <td>
                                    <Link href="#" style={{ color: "green" }}>
                                        Md.Kamal
                                    </Link>
                                </td>
                                <td className="text-end">৳ 10000</td>
                                <td className="text-center">5</td>
                                <td className="text-center">15</td>
                            </tr>
                            <tr>
                                <td scope="row"> 1 </td>
                                <td>
                                    <span className="d-block ">
                                        01739245724
                                    </span>
                                </td>
                                <td>
                                    <Link href="#" style={{ color: "green" }}>
                                        Md.Kamal
                                    </Link>
                                </td>
                                <td className="text-end">৳ 10000</td>
                                <td className="text-center">5</td>
                                <td className="text-center">15</td>
                            </tr>
                            <tr>
                                <td scope="row"> 1 </td>
                                <td>
                                    <span className="d-block ">
                                        01739245724
                                    </span>
                                </td>
                                <td>
                                    <Link href="#" style={{ color: "green" }}>
                                        Md.Kamal
                                    </Link>
                                </td>
                                <td className="text-end">৳ 10000</td>
                                <td className="text-center">5</td>
                                <td className="text-center">15</td>
                            </tr>
                            <tr>
                                <td scope="row"> 1 </td>
                                <td>
                                    <span className="d-block ">
                                        01739245724
                                    </span>
                                </td>
                                <td>
                                    <Link href="#" style={{ color: "green" }}>
                                        Md.Kamal
                                    </Link>
                                </td>
                                <td className="text-end">৳ 10000</td>
                                <td className="text-center">5</td>
                                <td className="text-center">15</td>
                            </tr>
                            <tr>
                                <td scope="row"> 1 </td>
                                <td>
                                    <span className="d-block ">
                                        01739245724
                                    </span>
                                </td>
                                <td>
                                    <Link href="#" style={{ color: "green" }}>
                                        Md.Kamal
                                    </Link>
                                </td>
                                <td className="text-end">৳ 10000</td>
                                <td className="text-center">5</td>
                                <td className="text-center">15</td>
                            </tr>

                            <tr>
                                <td colSpan={4} className="text-end">
                                    <strong>Total ৳ 10000</strong>
                                </td>
                                <td colSpan={2} className="text-end"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default MyTeamList;
