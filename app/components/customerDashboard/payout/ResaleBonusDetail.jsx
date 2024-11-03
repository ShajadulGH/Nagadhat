import { FaSearch } from "react-icons/fa";

const ResaleBonusDetail = ({ resalBonusResult, resalBonusData }) => {
    return (
        <>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">
                                SL
                            </th>
                            <th scope="col" className="text-center">
                                Date/Time
                            </th>
                            <th scope="col" className="text-center">
                                Reference
                            </th>
                            <th scope="col" className="text-end pe-3">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {resalBonusData?.map((item, index) => {
                            return (
                                <tr key={item?.id || index}>
                                    <td className="align-middle text-center">
                                        {index + 1}
                                    </td>

                                    <td className="align-middle text-center">
                                        {item?.date_time || "N/A"}
                                    </td>
                                    <td className="align-middle text-center">
                                        {item?.reference_no || "N/A"}
                                    </td>
                                    <td className="align-middle text-end pe-3">
                                        ৳ {""}
                                        {item?.earning || "N/A"}
                                    </td>
                                </tr>
                            );
                        })}

                        <tr>
                            <td
                                colSpan={4}
                                className="align-middle text-end pe-3"
                            >
                                {resalBonusResult?.total_earning && (
                                    <strong>
                                        Total : ৳{" "}
                                        {resalBonusResult?.total_earning}
                                    </strong>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="pt-5 ">
                <p className="ps-4">
                    Showing{" "}
                    {resalBonusResult?.current_page
                        ? resalBonusResult?.current_page
                        : 0}
                    to{" "}
                    {resalBonusResult?.last_page
                        ? resalBonusResult?.last_page
                        : 0}{" "}
                    of{" "}
                    {resalBonusResult?.total_page_count
                        ? resalBonusResult?.total_page_count
                        : 0}{" "}
                    entries{" "}
                </p>
            </div>
        </>
    );
};

export default ResaleBonusDetail;
