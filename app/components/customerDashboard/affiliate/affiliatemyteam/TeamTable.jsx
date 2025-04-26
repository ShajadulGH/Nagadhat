import { useState } from "react";
import TeamMemberRow from "./TeamMemberRow";

const TeamTable = ({ title, members, serialNumber = 0, totalSales, totalMembers }) => {
    const [isMobile] = useState(() => {
        if (typeof window !== "undefined") {
          return window.innerWidth < 768;
        }
        return false;
      });

  if (!members || members.length === 0) return null;

  return (
    <div className="mb-4">
      <h2 className="fs-5 border-bottom py-1 text-white ps-2" style={{ background: "#44bc9d" }}>
        {title}
      </h2>
      
      {isMobile ? (
        <div className="mt-2">
          {members.map((member, index) => (
            <TeamMemberRow 
              key={member?.id} 
              member={member} 
              index={index + serialNumber} 
              isMobile={true} 
            />
          ))}
          <div className="card mt-2">
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <strong>Total Sales:</strong> ৳ {totalSales ?? 0}
                </div>
                <div className="col-6">
                  <strong>Total Members:</strong> {totalMembers}
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
              {members.map((member, index) => (
                <TeamMemberRow 
                  key={member?.id} 
                  member={member} 
                  index={index + serialNumber} 
                  isMobile={false} 
                />
              ))}
              <tr>
                <td colSpan={3} className="text-end"></td>
                <td colSpan={1} className="text-end"> ৳ {totalSales ?? 0} </td>
                <td colSpan={1}></td>
                <td className="text-center" colSpan={1}>
                  <strong>Total: {totalMembers}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeamTable;