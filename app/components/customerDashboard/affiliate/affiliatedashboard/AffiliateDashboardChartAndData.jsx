import React from "react";
import ApexChart from "./ApexChart";
import AffiliateDashboardBonusDataTable from "./AffiliateDashboardBonusDataTable";

const AffiliateDashboardChartAndData = ({ incomeHistoryInfo }) => {
    return (
        <>
            <div className="p-3">
                <div className="row g-3 mb-4">
                    <div className="col-lg-6">
                        <div className="border rounded pt-3">
                            <div>
                                <ApexChart />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <AffiliateDashboardBonusDataTable
                            incomeHistoryInfo={incomeHistoryInfo}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AffiliateDashboardChartAndData;
