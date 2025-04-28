import { useState } from "react";
import TeamMemberRow from "./TeamMemberRow";

const SingleMemberTeam = ({ title, member}) => {
  

  if (!member || Object.keys(member).length === 0) return null;

  return (
    <div className="mb-4">
      <h2 className="fs-5 border-bottom py-1 text-white ps-2" style={{ background: "#44bc9d" }}>
        {title}
      </h2>
      
      {/* for Mobile view */}
        <div className="mt-2 d-md-none">``
          <TeamMemberRow member={member} index={0} isMobile={true} />
          <div className="card mt-2">
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <strong>Total Sales: </strong>৳ {member?.total_sales ?? 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* for Desktop view */}
        <div className="table-responsive d-none d-md-block">
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
    </div>
  );
};

export default SingleMemberTeam;