import Link from "next/link";

const TeamMemberRow = ({ member, index, isMobile }) => {
    if (isMobile) {
        return (
            <div className="card mb-2">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-12">
                            <Link
                                href={`/affiliate-team/${member?.id}?member=${encodeURIComponent(member?.name || "")}`}
                                className="btn btn-sm w-100"
                                style={{ color: "white", background: "#44bc9d"}}
                            >
                                {member?.name || "No Name"}
                            </Link>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-6">
                            <strong>Username:</strong><br />{member?.username || "N/A"}
                        </div>
                        <div className="col-6">
                            <strong>Sales:</strong><br />৳ {member?.total_sales ?? 0}
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-6">
                            <strong>Customer:</strong><br />{member?.affiliate_user?.total_team_members ?? 0}
                        </div>
                        <div className="col-6">
                            <strong>Refer:</strong> <br />{member?.affiliate_user?.refer_count ?? 0}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <tr key={member?.id}>
            <td>{index + 1}</td>
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
            <td className="text-end">৳ {member?.total_sales ?? 0}</td>
            <td className="text-center">{member?.affiliate_user?.refer_count ?? 0}</td>
            <td className="text-center">{member?.affiliate_user?.total_team_members ?? 0}</td>
        </tr>
    );
};

export default TeamMemberRow;