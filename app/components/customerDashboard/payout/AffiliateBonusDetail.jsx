

const AffiliateBonusDetail = ({
    affiliateBonusResult,
    affiliateBonusData,
    serialNumber,
}) => {

    return (
        <div className="p-md-3">
            <div className="table-responsive">
                <table
                    className="table table-hover"
                >
                    <thead>
                        {/* Desktop view */}
                        <tr className="d-none d-lg-table-row">
                            <th scope="col" className="text-center">
                                SL
                            </th>
                            <th scope="col" className="text-start">Date/Time
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
                            {/* <th scope="col" className="text-end pe-3">
                                Status
                            </th> */}
                        </tr>
                        {/* Mobile view */}
                        <tr className="d-lg-none">
                            <th scope="col" className="text-center">
                                SL
                            </th>
                            <th scope="col" className="text-start">
                                Particular
                            </th>
                            <th scope="col" className="text-end">
                                Amount
                            </th>
                            <th scope="col" className="text-end">
                                Type
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {affiliateBonusData?.map((item, index) => {
                            return (
                                <>
                                {/* Desktop view */}
                                    <tr key={item?.id} className="d-none d-lg-table-row">
                                        <td className="align-middle text-center">
                                            {index + 1 + serialNumber}
                                        </td>
                                        <td className="align-middle text-start">
                                            {item?.date_time || "N/A"}
                                        </td>
                                        <td className="align-middle text-end">
                                            ৳ {item?.earning || "N/A"}
                                        </td>
                                        <td className="align-middle text-end"  style={{ maxWidth: "180px" }}>
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
                                        {/* <td className="align-middle text-end pe-3">
                                            {item?.purpose || "N/A"}
                                        </td> */}
                                    </tr>
                                {/* Mobile view */}
                                    <tr key={item?.id} className="d-lg-none">
                                        <td className="align-middle text-center">
                                            {index + 1 + serialNumber}
                                        </td>
                                        <td className="align-middle text-start" style={{ minWidth: "168px" }}>
                                            {item?.date_time || "N/A"}
                                            <br />
                                            {item?.invoice || ""}, {item?.level || ""}
                                        </td>
                                        <td className="align-middle text-end">
                                            ৳{item?.earning || "N/A"}
                                        </td>
                                        <td className="align-middle text-end">
                                            {item?.payout_type || "N/A"}
                                        </td>
                                    </tr>
                                </>
                            );
                        })}

                        <tr>
                            <td colSpan="3" className="align-middle text-end ">
                                {Number(affiliateBonusResult?.total_earning?.replace(/,/g, "") || 0).toFixed(2)}
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
                Showing {affiliateBonusResult?.current_page || 0} to {affiliateBonusResult?.last_page || 0} of {affiliateBonusResult?.total_page_count || 0} entries
            </p>
        </div>
    );
};

export default AffiliateBonusDetail;
