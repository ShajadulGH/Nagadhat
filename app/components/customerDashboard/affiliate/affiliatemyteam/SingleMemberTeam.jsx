import { useState } from "react";
import TeamMemberRow from "./TeamMemberRow";

const SingleMemberTeam = ({ title, member}) => {
  const [isMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  if (!member || Object.keys(member).length === 0) return null;

  return (
    <div className="mb-4">
      <h2 className="fs-5 border-bottom py-1 text-white ps-2" style={{ background: "#44bc9d" }}>
        {title}
      </h2>
      
      {isMobile ? (
        <div className="mt-2">
          <TeamMemberRow member={member} index={0} isMobile={true} />
          <div className="card mt-2">
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <strong>Total Sales: </strong> ৳ {member?.total_sales ?? 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
              <TeamMemberRow member={member} index={0} isMobile={false} />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SingleMemberTeam;