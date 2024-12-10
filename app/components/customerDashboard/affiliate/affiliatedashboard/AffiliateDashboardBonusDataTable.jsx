"use client"
import React, { useState } from "react";
import NoDataFound from "@/app/components/NoDataFound";

const AffiliateDashboardBonusDataTable = ({
    incomeHistoryInfo,
    withdrawHistoryInfo=incomeHistoryInfo,
}) => {
    const [activeTab, setActiveTab] = useState("income");

    return (
        <div className="border rounded">
            <div className="tabs">
                <button
                    className={`tab-button ${activeTab === "income" ? "active" : ""}`}
                    onClick={() => setActiveTab("income")}
                >
                    Last Income History
                </button>
                <button
                    className={`tab-button ${activeTab === "withdraw" ? "active" : ""}`}
                    onClick={() => setActiveTab("withdraw")}
                >
                    Last Withdrawal History
                </button>
            </div>
            <div className="tab-content">
                {activeTab === "income" && (
                    <div className="income-history">
                        {/* <h3 className="px-2 pt-3 fs-6 fw-bold">Last Income History</h3> */}
                        {incomeHistoryInfo.length > 0 ? (
                            <div className="table-responsive">
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
                                                    {item?.user?.name || "No data found"}
                                                </td>
                                                <td>{item?.purpose || "No data found"}</td>
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
                )}
                {activeTab === "withdraw" && (
                    <div className="withdraw-history">
                        {/* <h3 className="px-2 pt-3 fs-6 fw-bold">
                            Last Withdrawal History
                        </h3> */}
                        {withdrawHistoryInfo?.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sl</th>
                                            <th scope="col">Method</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {withdrawHistoryInfo?.map((item, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item?.method || "No data found"}</td>
                                                <td>৳ {item?.amount || "0"}</td>
                                                <td>{item?.date || "No data found"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <NoDataFound />
                        )}
                    </div>
                )}
            </div>
            <style jsx>{`
                .tabs {
                    display: flex;
                    border-bottom: 1px solid #ddd;
                }
                .tab-button {
                    padding: 10px 20px;
                    cursor: pointer;
                    border: none;
                    background: none;
                    font-weight: bold;
                }
                .tab-button.active {
                    border-bottom: 3px solid #007bff;
                    color: #007bff;
                }
            `}</style>
        </div>
    );
};

export default AffiliateDashboardBonusDataTable;
