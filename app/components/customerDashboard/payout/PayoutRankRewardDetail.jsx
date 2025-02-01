import { FaSearch } from "react-icons/fa";

const PayoutRankRewardDetail = ({
    rankRewardData,
    rankRewardResult,
    serialNumber,
}) => {
    return (
        <>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">SL</th>
                            <th scope="col">Date/Time</th>
                            <th scope="col" className="d-none d-md-table-cell">Rank & reward</th>
                            <th className="text-end" scope="col">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankRewardData?.map((item, index) => {
                            return (
                                <tr key={item?.id || index}>
                                    <td scope="row">
                                        {index + 1 + serialNumber}
                                    </td>
                                    <td style={{minWidth:"172px"}}>{item?.date_time || "N/A"}</td>
                                    <td className="d-none d-md-table-cell">{item?.purpose || "N/A"} </td>
                                    <td className="text-end">
                                        ৳ {item?.earning || "0"}{" "}
                                    </td>
                                </tr>
                            );
                        })}

                        <tr>
                            <td colSpan={2} scope="row"></td>
                            <td  className="d-none d-md-table-cell"></td>
                            <td className="text-end">
                                {rankRewardResult?.total_earning !== null && (
                                    <strong>
                                        Total: ৳{" "}
                                        {rankRewardResult?.total_earning}
                                    </strong>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="pt-2">
                <p className="px-4">
                    Showing
                    {rankRewardResult?.current_page || 0}
                    to{" "}
                    {rankRewardResult?.last_page || 0}{" "}
                    of{" "}
                    {rankRewardResult?.total_page_count || 0}{" "}
                    entries
                </p>
            </div>
        </>
    );
};

export default PayoutRankRewardDetail;
