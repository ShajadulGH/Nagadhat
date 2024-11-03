// import DefaultLoader from "@/app/components/defaultloader/DefaultLoader";
import NoDataFound from "@/app/components/NoDataFound";
import React from "react";

const AffiliateDashboardBonusDataTable = ({ incomeHistoryInfo }) => {
    return (
        <div className="border rounded table-responsive">
            <h3 className="px-2 pt-3 fs-6 fw-bold">Last Income History</h3>
            {incomeHistoryInfo.length > 0 ? (
                <div className="table-responsive ">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Sl</th>
                                <th scope="col">From user</th>
                                <th scope="col">Purpose</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incomeHistoryInfo.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        {item?.user?.name || "no data found"}
                                    </td>
                                    <td>{item?.purpose || "no data found"}</td>
                                    <td>৳ {item?.balance || "0"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <NoDataFound />
            )}
        </div>
    );
};

export default AffiliateDashboardBonusDataTable;
