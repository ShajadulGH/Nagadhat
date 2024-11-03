import PayoutSearchForm from "./PayoutSearchForm";

const AffiliateBonusDetail = ({ affiliateBonusResult, affiliateBonusData }) => {
    return (
        <div className="p-3">
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">
                                SL
                            </th>
                            <th scope="col" className="text-start">
                                Date/Time
                            </th>
                            <th scope="col" className="text-end">
                                Amount
                            </th>
                            <th scope="col" className="text-end">
                                From
                            </th>
                            <th scope="col" className="text-end">
                                Invoice
                            </th>
                            <th scope="col" className="text-end">
                                Level
                            </th>
                            <th scope="col" className="text-end">
                                Type
                            </th>
                            <th scope="col" className="text-end pe-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {affiliateBonusData?.map((item, index) => {
                            return (
                                <tr key={item?.id}>
                                    <td className="align-middle text-center">
                                        {index + 1}
                                    </td>

                                    <td className="align-middle text-start">
                                        {item?.date_time || "N/A"}
                                    </td>
                                    <td className="align-middle text-end">
                                        ৳ {item?.earning || "N/A"}
                                    </td>
                                    <td className="align-middle text-end">
                                        {item?.user_name || "N/A"}
                                    </td>
                                    <td className="align-middle text-end">
                                        {item?.invoice || "N/A"}
                                    </td>
                                    <td className="align-middle text-end">
                                        {item?.level || "N/A"}
                                    </td>
                                    <td className="align-middle text-end">
                                        {item?.payout_type || "N/A"}
                                    </td>
                                    <td className="align-middle text-end pe-3">
                                        {item?.purpose || "N/A"}
                                    </td>
                                </tr>
                            );
                        })}

                        <tr>
                            <td colSpan="3" className="align-middle text-end ">
                                {affiliateBonusResult?.total_earning > 0 && (
                                    <strong>
                                        Total : ৳{" "}
                                        {Number(
                                            affiliateBonusResult.total_earning
                                        ).toFixed(2)}
                                    </strong>
                                )}
                            </td>
                            <td
                                colSpan={5}
                                className="align-middle text-center"
                            ></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                Showing{" "}
                {affiliateBonusResult?.current_page
                    ? affiliateBonusResult?.current_page
                    : 0}
                to{" "}
                {affiliateBonusResult?.last_page
                    ? affiliateBonusResult?.last_page
                    : 0}{" "}
                of{" "}
                {affiliateBonusResult?.total_page_count
                    ? affiliateBonusResult?.total_page_count
                    : 0}{" "}
                entries{" "}
            </p>
        </div>
    );
};

export default AffiliateBonusDetail;
