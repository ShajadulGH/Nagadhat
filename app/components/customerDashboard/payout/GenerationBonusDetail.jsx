const GenerationBonusDetail = ({
    generationBonusData,
    generationBonusResult,
}) => {
    return (
        <>
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
                            <th scope="col" className="text-end pe-3">
                                Level
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {generationBonusData?.map((item, index) => (
                            <tr key={item.id}>
                                <td className="align-middle text-center">
                                    {index + 1}
                                </td>
                                <td className="align-middle text-start">
                                    {item?.date_time || "N/A"}
                                </td>
                                <td className="align-middle text-end">
                                    ৳{""} {item?.earning || "N / A"}
                                </td>
                                <td className="align-middle text-end">
                                    {item?.user_name || "Unknown"}
                                </td>
                                <td className="align-middle text-end pe-3">
                                    {item?.level || "N/A"}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={3} className="align-middle text-end">
                                {generationBonusResult?.total_earning > 0 && (
                                    <strong>
                                        Total: ৳{" "}
                                        {generationBonusResult?.total_earning}
                                    </strong>
                                )}
                            </td>
                            <td
                                colSpan={2}
                                className="align-middle text-center"
                            ></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="ps-4">
                Showing{" "}
                {generationBonusResult?.current_page
                    ? generationBonusResult?.current_page
                    : 0}
                to{" "}
                {generationBonusResult?.last_page
                    ? generationBonusResult?.last_page
                    : 0}{" "}
                of{" "}
                {generationBonusResult?.total_page_count
                    ? generationBonusResult?.total_page_count
                    : 0}{" "}
                entries{" "}
            </p>
        </>
    );
};

export default GenerationBonusDetail;
